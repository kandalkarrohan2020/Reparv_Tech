import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix marker icon issue in React
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const smallIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [20, 30],   // 👈 smaller size (default is [25, 41])
  iconAnchor: [10, 30], // 👈 adjust so it points correctly
  popupAnchor: [0, -25] // 👈 position popup above marker
});


// Dummy city + properties data
const cities = [
  {
    name: "Nagpur",
    lat: 21.1458,
    lng: 79.0882,
    properties: [
      { id: 1, title: "2 BHK Flat", price: "₹50L", lat: 21.149, lng: 79.09 },
      {
        id: 2,
        title: "3 BHK Villa",
        price: "₹1.2Cr",
        lat: 21.142,
        lng: 79.095,
      },
    ],
  },
  {
    name: "Pune",
    lat: 18.5204,
    lng: 73.8567,
    properties: [
      { id: 3, title: "1 BHK Studio", price: "₹30L", lat: 18.52, lng: 73.85 },
    ],
  },
];

export default function LeafletCityMap() {
  return (
    <div className="h-[100%] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[21.1458, 79.0882]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* City + Property markers */}
        {cities.map((city) =>
          city.properties.map((property) => (
            <Marker key={property.id} position={[property.lat, property.lng]} icon={smallIcon}>
              <Popup>
                <div>
                  <h2 className="font-semibold">{property.title}</h2>
                  <p>{property.price}</p>
                  <p>
                    <b>City:</b> {city.name}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
}
