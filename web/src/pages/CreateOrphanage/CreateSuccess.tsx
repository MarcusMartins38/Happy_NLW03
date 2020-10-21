import React from "react";

import "../../styles/pages/CreateOrphanage/create-success.css";

import CreateSuccessImg from "../../images/CreateSuccess.svg";
import { useHistory } from "react-router-dom";

const CreateSuccess: React.FC = () => {
  const history = useHistory();

  return (
    <div className="page-create-success">
      <div className="container">
        <div className="information-button">
          <h1>Ebaaa!</h1>
          <p>
            O cadastro deu certo e foi enviado ao administrador para ser
            aprovado. Agora é só esperar :)
          </p>

          <button
            onClick={() => history.push("/app")}
            className="back-map-button"
          >
            Voltar para o mapa
          </button>
        </div>

        <img src={CreateSuccessImg} alt="Create Success Img" />
      </div>
    </div>
  );
};

export default CreateSuccess;
