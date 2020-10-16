import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import mapMarkerImg from "../images/map-marker.svg";

import "../styles/components/Sidebar.css";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <motion.aside className="app-sidebar" whileHover={{ width: 150 }}>
      <motion.img
        src={mapMarkerImg}
        alt="Happy"
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 0.8, rotate: -360, borderRadius: "100%" }}
        transition={{ duration: 0.5 }}
      />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </motion.aside>
  );
};

export default Sidebar;
