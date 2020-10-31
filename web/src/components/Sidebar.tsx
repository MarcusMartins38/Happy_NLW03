import React, { useState } from "react";
import { FiArrowLeft, FiMapPin, FiMap, FiPower } from "react-icons/fi";
import { NavLink, useHistory } from "react-router-dom";

import mapMarkerImg from "../images/map-marker.svg";

import "../styles/components/Sidebar.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { SignOut } from "../store/modules/user/actions";

interface SidebarProps {
  signOut?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ signOut = false }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [path, setPath] = useState(window.location.pathname);

  const { goBack } = useHistory();

  const handleSignOut = () => {
    dispatch(SignOut());
    history.push("/");
  };

  return (
    <motion.aside className="app-sidebar" whileHover={{ width: 150 }}>
      <motion.img
        src={mapMarkerImg}
        alt="Happy"
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 0.8, rotate: -360, borderRadius: "100%" }}
        transition={{ duration: 0.5 }}
      />

      <div className="menu-nav">
        <NavLink to="/map" activeStyle={{ background: "#FFD666" }}>
          <FiMap size={24} color={path === "/map" ? "#00BBE0" : "#FFF"} />
        </NavLink>

        <NavLink
          to="/registerOrphanages"
          activeStyle={{ background: "#FFD666" }}
        >
          <FiMapPin
            size={24}
            color={path === "/registerOrphanages" ? "#00BBE0" : "#FFF"}
          />
        </NavLink>
      </div>

      <footer>
        {signOut === false ? (
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        ) : (
          <button type="button" onClick={handleSignOut}>
            <FiPower size={24} color="#FFF" />
          </button>
        )}
      </footer>
    </motion.aside>
  );
};

export default Sidebar;
