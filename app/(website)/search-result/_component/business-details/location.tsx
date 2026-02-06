import { Button } from "@/components/ui/button";
import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { DivIcon } from "leaflet";

interface LocationProps {
  singleBusiness: {
    businessInfo: {
      name: string;
      address: string;
    };
  };
  coords: { lat: number; lng: number } | null;
  customMarker: DivIcon;
  SetMapView: React.ComponentType<{
    coords: { lat: number; lng: number };
    zoom: number;
  }>;
}

const Location: React.FC<LocationProps> = ({
  singleBusiness,
  coords,
  customMarker,
  SetMapView,
}) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Location</h1>

      <h1 className="text-primary font-medium mb-5">
        {singleBusiness?.businessInfo?.address}
      </h1>

      {/* Location */}
      <div className="h-[300px] w-full">
        <style jsx global>{`
          .leaflet-control-container {
            display: none !important;
          }
        `}</style>

        {coords && (
          <MapContainer
            center={[coords.lat, coords.lng]}
            zoom={15} // adjust zoom here
            scrollWheelZoom={true}
            className="h-full w-full rounded-xl shadow-lg"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution=""
            />
            <Marker position={[coords.lat, coords.lng]} icon={customMarker}>
              <Popup>{singleBusiness.businessInfo.name}</Popup>
            </Marker>

            {/* Optional: reset view */}
            <SetMapView coords={coords} zoom={15} />
          </MapContainer>
        )}
      </div>

      <div className="mt-8">
        <Button
          onClick={() => {
            // Encode the business address for Google Maps
            const encodedAddress = encodeURIComponent(
              singleBusiness.businessInfo.address
            );
            const googleMapsUrl = `https://www.google.com/maps/dir//${encodedAddress}`;

            // Open Google Maps in a new tab
            window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
          }}
          className="w-full bg-primary/20 hover:bg-primary/15 text-primary"
        >
          Get Directions
        </Button>
      </div>
    </div>
  );
};

export default Location;
