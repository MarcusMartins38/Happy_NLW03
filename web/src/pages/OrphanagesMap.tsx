import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { useHistory } from "react-router-dom";

import mapMarkerImg from "../images/map-marker.svg";

import "../styles/pages/orphanages-map.css";
import mapIcon from "../utils/mapIcon";
import { FiPower } from "react-icons/fi";
import api from "../services/api";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { SignOut } from "../store/modules/user/actions";

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("/orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  const handleSignOut = () => {
    dispatch(SignOut());
    history.push("/");
  };

  return (
    <div id="page-map">
      <aside>
        <motion.header
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={mapMarkerImg}
            alt="Happy"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.8, rotate: -360, borderRadius: "100%" }}
            transition={{ duration: 0.5 }}
          />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </motion.header>

        <motion.footer
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <strong>Porto Velho</strong>
          <span>Rondônia</span>

          <button type="button" onClick={handleSignOut}>
            <FiPower size={24} color="#FFF" />
          </button>
        </motion.footer>
      </aside>

      <Map
        center={[-8.7360981, -63.8735084]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map((orphanage) => (
          <Marker
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
            key={orphanage.id}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
