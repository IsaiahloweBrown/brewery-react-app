import React, { useMemo, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "670px",
  height: "500px",
};

function MyComponent({ lat, lng }) {
  const center = useMemo(() => ({ lat, lng }), []);
  const [isMounted, setIsMounted] = useState(false);
  const zoom = 15;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAnVpl-vOOfNs7hEqvhMFbnqoU9WPgZqP8",
  });
  useEffect(() => {
    if (isLoaded) {
      setIsMounted(true);
    }
  }, [isLoaded]);

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    map.setZoom(zoom);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  console.log(lat, lng);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
