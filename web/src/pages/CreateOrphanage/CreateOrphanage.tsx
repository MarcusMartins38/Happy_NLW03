import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import { FiPlus } from "react-icons/fi";

import "../../styles/pages/CreateOrphanage/create-orphanage.css";
import Sidebar from "../../components/Sidebar";
import { mapIcon } from "../../utils/mapIcon";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import { motion, useViewportScroll, useTransform } from "framer-motion";
import { donationItems } from "./CreateOrphanage.constants";

export default function CreateOrphanage() {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [1, 1], [0.2, 4]);

  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");

  const [hoursOpen, setHoursOpen] = useState("");
  const [hoursClose, setHoursClose] = useState("");
  const [minutesOpen, setMinutesOpen] = useState("");
  const [minutesClose, setMinutesClose] = useState("");

  const [open_on_weekends, setOpen_on_weekends] = useState(true);
  const [institute_type, setInstitute_type] = useState("orphanage");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [items, setItemsToDonation] = useState<string[]>([]);
  const [phone_number, setPhone_number] = useState("");

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const { latitude, longitude } = position;

      const data = new FormData();
      const formatHours = hoursOpen+":"+minutesOpen+"h ás "+hoursClose+":"+minutesClose+"h";

      data.append("name", name);
      data.append("about", about);
      data.append("latitude", String(latitude));
      data.append("longitude", String(longitude));
      data.append("instructions", instructions);
      data.append("opening_hours", formatHours);
      data.append("open_on_weekends", String(open_on_weekends));
      data.append("institute_type", institute_type);
      data.append("phone_number", phone_number);

      items.forEach((item) => data.append("items", item));
      images.forEach((image) => data.append("images", image));

      await api.post("/user/orphanages", data);

      history.push("/orphanages-create-success");
    } catch (err) {
      alert("Erro no Cadastro");
    }
  }

  const clickItemsToDonation = (itemName: string) => {
    const isSelectedItem = items.find((item) => item === itemName);
    if (isSelectedItem) {
      const selectedItems = items.filter((item) => item !== itemName);
      setItemsToDonation(selectedItems);
    } else {
      setItemsToDonation([...items, itemName]);
    }
  };

  const isActive = (itemName: string) => {
    const isSelectedItem = items.find((item) => item === itemName);
    if (isSelectedItem) return "active-donation";
    else return "";
  };

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-8.7360981, -63.8735084]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => {
                  return <img src={image} alt={name} />;
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </div>

            <div className="input-block">
              <label htmlFor="institute_type">Qual o tipo de instituição</label>

              <div className="button-select">
                <button
                  type="button"
                  className={institute_type === "orphanage" ? "active" : ""}
                  onClick={() => setInstitute_type("orphanage")}
                >
                  Orfanato
                </button>
                <button
                  type="button"
                  className={institute_type === "asylum" ? "activeClose" : ""}
                  onClick={() => setInstitute_type("asylum")}
                >
                  Asilo
                </button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="institute_type">Items necessitados</label>

              <div className="donation-items">
                {donationItems.map((item) => (
                  <div
                    key={item.name}
                    className="item-to-donation"
                    onClick={() => clickItemsToDonation(item.name)}
                    id={isActive(item.name)}
                  >
                    <img src={item.icon} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de Abertura</label>

            </div>
            <div style={{ margin: '8px 0px 16px 0px'}}>
            <input
                id="opening_hours"
                value={hoursOpen}
                onChange={(e) => setHoursOpen(e.target.value)}
                type="number"
                max={23}
                min={0}
              />
              <input
                id="opening_hours"
                value={minutesOpen}
                onChange={(e) => setMinutesOpen(e.target.value)}
                type="number"
                max={60}
                min={0}
                step={5}
              />
          </div>
          <span style={{ color: "black"}}>ás</span>
          <div style={{ margin: '8px 0px 16px 0px'}}>
            <input
                id="opening_hours"
                value={hoursClose}
                onChange={(e) => setHoursClose(e.target.value)}
                type="number"
                max={23}
                min={0}
              />
              <input
                id="opening_hours"
                value={minutesClose}
                onChange={(e) => setMinutesClose(e.target.value)}
                type="number"
                max={60}
                min={0}
                step={5}
              />
          </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpen_on_weekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? "activeClose" : ""}
                  onClick={() => setOpen_on_weekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <div className="input-block" id="phone_number">
            <label htmlFor="phone_number">
              Numero de Contato
              <span>
                <strong>Correto:</strong> 556996312XXXX <br />{" "}
                <strong>Incorreto:</strong> +55-(069)96312XXXX
              </span>
            </label>
            <input
              id="phone_number"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
            />
          </div>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "100%",
          zIndex: -1,
        }}
      >
        <motion.div
          style={{
            scale,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "30px",
          }}
        >
          <motion.div
            style={{
              scaleY: scrollYProgress,
              width: "inherit",
              height: "inherit",
              background:
                "linear-gradient(#DAF6FB 0%, #15b6d6 60%, #073F4A 80%)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
