import React, { useState } from "react";
import { FiArrowLeft, FiMapPin, FiMap, FiPower, FiPlus } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useHistory } from "react-router-dom";

import mapMarkerImg from "../images/map-marker.svg";

import "../styles/components/Sidebar.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../store/modules/user/actions";
import { IState } from "../store";
import { UserData } from "../store/modules/user/types";

interface SidebarProps {
  signOut?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ signOut = false }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector<IState, UserData>((state) => state.userReducer);

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
          <FiMapPin
              size={24}
              color={path === "/map" ? "#00BBE0" : "#FFF"}
          />
        </NavLink>

        {token && (
          <>
          <NavLink
            to="/registerOrphanages"
            activeStyle={{ background: "#FFD666" }}
            >
              <GiHamburgerMenu
                size={24}
                color={path === "/registerOrphanages" ? "#00BBE0" : "#FFF"}
              />
          </NavLink>
          <NavLink to="/orphanages-create" activeStyle={{ background: "#FFD666" }}>
            <FiPlus size={32} color={path === "/orphanages-create" ? "#00BBE0" : "#FFF"} />
          </NavLink>
          </>
        )}
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
