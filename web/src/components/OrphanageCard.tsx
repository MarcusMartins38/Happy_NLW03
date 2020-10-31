import React from "react";

import { Map, Marker, TileLayer } from "react-leaflet";
import { FiEdit3, FiTrash } from "react-icons/fi";
import mapIcon from "../utils/mapIcon";

import "../styles/components/OrphanageCard.css";
import { Link } from "react-router-dom";

interface OprhanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  open_on_weekends: boolean;
}

interface DataProps {
  orphanage: OprhanageProps;
}

const OrphanageCard: React.FC<DataProps> = ({ orphanage }) => {
  return (
    <div className="card">
      <div className="map-container">
        <Map
          center={[orphanage.latitude, orphanage.longitude]}
          zoom={16}
          style={{ minWidth: "100%", height: 227 }}
          dragging={false}
          touchZoom={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
        >
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker
            interactive={false}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          />
        </Map>

        <footer>
          <span>{orphanage.name}</span>
          <div className="footer-icons">
            <button>
              <FiEdit3 size={20} color="#15C3D6" />
            </button>
            <Link to={`/registerOrphanages/remove/${orphanage.id}`}>
              <FiTrash size={20} color="#15C3D6" />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OrphanageCard;
