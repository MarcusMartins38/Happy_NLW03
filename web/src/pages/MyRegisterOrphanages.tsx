import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import "../styles/pages/my-register-orphanages.css";
import api from "../services/api";
import OrphanageCard from "../components/OrphanageCard";

interface OprhanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  open_on_weekends: boolean;
  institute_type: string;
}

const MyRegisterOrphanages: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OprhanageProps[]>([]);

  useEffect(() => {
    api.get("/user/orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div>
      <Sidebar />
      <h2 className="myregisterorphanages-title">Instituições que Registrei</h2>
    <div className="myregisterorphanages-page">
      <div className="card-container">
        {orphanages.map((orphanage) => (
          <OrphanageCard key={orphanage.id} orphanage={orphanage} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default MyRegisterOrphanages;
