import React from "react";
import { FiArrowRight } from "react-icons/fi";

import "../styles/pages/landing.css";

import logoImg from "../images/logo.svg";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

function Landing() {
  return (
    <div id="page-landing">
      <motion.div
        className="content-wrapper"
        transition={{ duration: 1.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.img
          transition={{ delay: 1 }}
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          src={logoImg}
          alt="Happy"
        />

        <motion.main
          transition={{ duration: 1 }}
          initial={{ x: -600, opacity: 0.3 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </motion.main>

        <div className="location">
          <strong>Porto Velho</strong>
          <span>Rôndonia</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </motion.div>
    </div>
  );
}

export default Landing;
