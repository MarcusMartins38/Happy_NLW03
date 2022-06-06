import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import mapMarkerAsylumImg from '../images/map-marker-asylum.svg';

export const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export const mapIconAsylum = Leaflet.icon({
  iconUrl: mapMarkerAsylumImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})
