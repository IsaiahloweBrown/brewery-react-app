import styled from "styled-components";
import { useCallback, useEffect } from "react";
import GoogleMaps from "./GoogleMaps";
const Root = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  display: flex;
  height: 100vh;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 3;
  align-items: center;
`;

const Card = styled.div`
  cursor: pointer;
  width: 700px;
  height: 500px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 10px;
  background: black;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 10px;
  gap: 10px;
`;

export const Modal = ({ setSelectedBrewery, selectedBrewery }) => {
  
  const toggleVisibility = useCallback(
    (event) => {
      const { target } = event;
      //using closest to apply to element and feed attribute from HTML element
      const shouldClosedCard = target.closest("div[data-close-card]");
      if (shouldClosedCard) setSelectedBrewery(null);
      //dependary array changes
    },
    [setSelectedBrewery]
  );

  useEffect(() => {
    document.getElementById("card-area").addEventListener("mouseleave", toggleVisibility);
  }, []);
  return (
    <Root id="root-area"data-close-card={true}>
      <Card id="card-area"key={selectedBrewery.id}>
        <h2>{selectedBrewery.name}</h2>
        <p>
          {selectedBrewery.address.street}, {selectedBrewery.address.city},{" "}
          {selectedBrewery.address.state}, {selectedBrewery.address.zip}
        </p>
        {selectedBrewery.url ? (
          <a href={selectedBrewery.url}>{selectedBrewery.url}</a>
        ) : (
          <p>url not found</p>
        )}
        <GoogleMaps lat={selectedBrewery.lat} lng={selectedBrewery.lng}/>
      </Card>
    </Root>
  );
};
