import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";

// Custom Marker Icon with HTML
// Custom Marker Icon with HTML
const markerIcon = new L.DivIcon({
  className: "custom-marker", // optional for styling
  html: `
    <div style="
      position: relative;
      width: 30px;
      height: 30px;
      background: #2563eb;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    ">
      <div style="
        width: 14px;
        height: 14px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 30], // bottom center
  popupAnchor: [0, -30],
});

// Helper: Fly map to new location
function FlyToLocation({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12); // zoom level 12 for city
    }
  }, [coords, map]);
  return null;
}

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      try {
        // Reverse geocoding for pincode
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await res.json();
        const pincode = data?.address?.postcode || "";

        onLocationSelect({
          latitude: lat,
          longitude: lng,
          pincode,
        });
      } catch (err) {
        console.error("Reverse geocoding error:", err);
        onLocationSelect({
          latitude: lat,
          longitude: lng,
          pincode: "",
        });
      }
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={markerIcon} />
  );
}

export default function LocationPicker({ onChange, state, city, pincode }) {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!city && !state && !pincode) return;

    const query = `${city ? city + "," : ""} ${state ? state + "," : ""} ${
      pincode ? pincode + "," : ""
    } India`;

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      })
      .catch((err) => console.error("Geocoding error:", err));
  }, [city, state, pincode]);

  return (
    <div className="w-full">
      <div className="w-full h-[300px] rounded-lg overflow-hidden border">
        <MapContainer
          center={[20.5937, 78.9629]} // Default India
          zoom={2}
          style={{ height: "100%", width: "100%" }}
        >
          <LayersControl position="topright">
            {/* Normal OSM Map */}
            <LayersControl.BaseLayer checked name="Street Map">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            {/* Satellite View (from ESRI) */}
            <LayersControl.BaseLayer name="Satellite View">
              <TileLayer
                attribution="Tiles &copy; Esri"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          {/* Fly to new state/city/pincode when coords update */}
          <FlyToLocation coords={coords} />

          <LocationMarker onLocationSelect={onChange} />
        </MapContainer>
      </div>
    </div>
  );
}
