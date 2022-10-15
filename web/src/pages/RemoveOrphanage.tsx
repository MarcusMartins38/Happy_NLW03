import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import RemoveOrphanageImg from "../images/RemoveOrphanage.svg";
import api from "../services/api";

import "../styles/pages/RemoveOrphanage.css";

interface DataParams {
  id: string;
}

interface orphanageData {
  name: string;
}

const RemoveOrphanage: React.FC = () => {
  const history = useHistory();
  const params = useParams<DataParams>();

  const [orphanageName, setOrphanageName] = useState('');

  useEffect(() => {
    api.get<orphanageData>(`/orphanages/${params.id}`).then(response => {
      setOrphanageName(response.data.name);
    })

  }, [orphanageName, params.id])

  async function handleRemoveButton() {
    await api.delete(`/user/orphanages/${Number(params.id)}`);
    alert("Orfanato Excluido");
    history.goBack();
  }

  return (
    <div className="removeorphanage-page">
      <div className="container">
        <div className="information-container">
          <h1>Excluir!</h1>
          <p>Você tem certeza que quer excluir {orphanageName}?</p>
          <div className="button-container">
            <button onClick={() => history.goBack()}>Cancelar</button>
            <button onClick={() => handleRemoveButton()}>Excluir!</button>
          </div>
        </div>

        <img src={RemoveOrphanageImg} alt="RemoveOrphanageImg" />
      </div>
    </div>
  );
};

export default RemoveOrphanage;
