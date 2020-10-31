import React from "react";

import "../../styles/pages/CreateOrphanage/create-success.css";

import CreateSuccessImg from "../../images/CreateSuccess.svg";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const CreateSuccess: React.FC = () => {
  const history = useHistory();

  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="page-create-success"
    >
      <div className="container">
        <div className="information">
          <h1>Ebaaa!</h1>
          <p>
            O cadastro deu certo e foi marcado sua localização no mapa . Agora é
            só divulgar e comemorar :)
          </p>

          <button
            onClick={() => history.push("/map")}
            className="back-map-button"
          >
            Voltar para o mapa
          </button>
        </div>

        <motion.img
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
          src={CreateSuccessImg}
          alt="Create Success Img"
        />
      </div>
    </motion.div>
  );
};

export default CreateSuccess;
