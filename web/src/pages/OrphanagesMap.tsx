import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { useHistory } from "react-router-dom";

import mapMarkerImg from "../images/map-marker.svg";

import "../styles/pages/orphanages-map.css";
import { mapIcon, mapIconAsylum } from "../utils/mapIcon";
import { FiPower } from "react-icons/fi";
import api from "../services/api";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../store/modules/user/actions";
import Sidebar from "../components/Sidebar";
import { IState } from "../store";
import { UserData } from "../store/modules/user/types";

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  institute_type: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [instructionClose, setInstructionsClose] = useState(false);
  const { token } = useSelector<IState, UserData>((state) => state.userReducer);

  useEffect(() => {
    api.get("/orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map" style={{ overflow: "hidden" }}>
      <div id="side-bar-fix">
        <Sidebar signOut={true} />
      </div>

      <Map
        center={[-8.7360981, -63.8735084]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map((orphanage) => (
          <Marker
            icon={orphanage.institute_type === 'orphanage' ? mapIcon : mapIconAsylum}
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

      {token ?? (
        <Link to="/orphanages-create" className="create-orphanage">
          <FiPlus size={32} color="#FFF" />
        </Link>
      )}

      <motion.aside
        initial={
          instructionClose === false ? { x: 800, opacity: 0.2 } : { x: 0 }
        }
        animate={
          instructionClose === false
            ? { x: 0, opacity: 1 }
            : { x: 500, opacity: 0 }
        }
        transition={{ duration: 1 }}
        className="aside-apresentation"
      >
        <motion.header
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.2 }}
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

        <motion.button
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.2 }}
          onClick={() => setInstructionsClose(true)}
          className="confirm-button"
        >
          Okay!
        </motion.button>

        <motion.footer
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.2 }}
        >
          <strong>Porto Velho</strong>
          <span>Rondônia</span>
        </motion.footer>
      </motion.aside>
    </div>
  );
};

export default OrphanagesMap;
