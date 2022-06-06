import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import "../styles/pages/orphanage.css";
import Sidebar from "../components/Sidebar";
import {mapIcon, mapIconAsylum} from "../utils/mapIcon";
import api from "../services/api";
import { useParams } from "react-router-dom";
import { IState } from "../store";
import { UserData } from "../store/modules/user/types";
import { useSelector } from "react-redux";
import { donationItems } from "./CreateOrphanage/CreateOrphanage.constants";

interface ItemsProps {
  id: number;
  name: string;
}
interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instruction: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    id: number;
    url: string;
  }[];
  institute_type: string;
  items: ItemsProps[];
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const userData = useSelector<IState, UserData>((state) => state.userReducer);

  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then((response) => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  const isActive = (itemName: string) => {
    const isSelectedItem = orphanage.items.find(item => item.name === itemName);
    if (isSelectedItem) return 'active-donation';
    else return '';
  }

  console.log(orphanage);

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img
            src={
              orphanage.images[activeImageIndex]?.url
                ? orphanage.images[activeImageIndex].url
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
            }
            style={{
              height: orphanage.images[activeImageIndex]?.url ? "" : "200px",
              margin: orphanage.images[activeImageIndex]?.url
                ? ""
                : "16px auto 0 auto",
            }}
            alt={orphanage.name}
          />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  className={activeImageIndex === index ? "active" : ""}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker
                  interactive={false}
                  icon={orphanage.institute_type === 'orphanage' ? mapIcon : mapIconAsylum}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <div className="input-block">
              <label htmlFor="institute_type">Qual o tipo de instituição</label>

              <div className="button-select">
                <button
                  type="button"
                  className={orphanage.institute_type === 'orphanage' ? "active" : ""}
                >
                  Orfanato
                </button>
                <button
                  type="button"
                  className={orphanage.institute_type === 'asylum' ? "activeClose" : ""}
                >
                  Asilo
                </button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="institute_type">Items necessitados</label>

              <div className="donation-items">
                {donationItems.map(item => (
                  <div
                    key={item.name}
                    className="item-to-donation"
                    id={isActive(item.name)}
                  >
                    <img src={item.icon} alt={item.name} />
                    <span>{item.name}</span>
                </div>
                ))}
              </div>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instruction}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends === true ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF6690" />
                  Não Atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
