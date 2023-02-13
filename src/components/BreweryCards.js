import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal } from "./Modal";

// some style for containers, card
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  height: 701px;
  margin-top: 50px;
`;

const Card = styled.div`
  background: rgb(255, 8, 171, 0.75);
  cursor: pointer;
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
  border-radius: 10px;
`;

const InputContainer = styled.div`
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 25px;


  & input {
    border-radius: 10px;
    padding: 10px;
    width: 300px;
    
  }
`;

export const BreweryCards = () => {
  //renders null and selects the state of clicked brewery
  const [selectedBrewery, setSelectedBrewery] = useState(null);
  const [breweries, setBreweries] = useState([]);
  const [searchingFor, setSearchingFor] = useState("");
  const handleSearch = (e) => setSearchingFor(e.target.value);

  const filiteredBreweries = breweries.filter((brewery) =>
    brewery.name.toLowerCase().includes(searchingFor.toLowerCase())
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/breweries`);
        const data = await response.json();

        setBreweries(
          data.map((brewery) => ({
            id: brewery.id,
            name: brewery.name,
            type: brewery.brewery_type,
            address: {
              street: brewery.street,
              city: brewery.city,
              state: brewery.state,
              zip: brewery.postal_code,
            },
            url: brewery.website_url,
            lat: +brewery.latitude,
            lng: +brewery.longitude,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <InputContainer>
        <input
          type="text"
          placeholder="Search brewery by name..."
          value={searchingFor}
          onChange={handleSearch}
          className="searchbar border-solid input input-secondary w-full max-w-xs bg-white text-pink-900"
          id="searchArea"
        />
      </InputContainer>
      <Container>
        {filiteredBreweries.map((brewery) => (
          //unique id
          <Card
            className="card w-96 bg-primary text-primary-content hover:outline outline-white outline-4"
            key={brewery.id}
            onClick={() => setSelectedBrewery(brewery)}
          >
            <div className="card-body">
              <h2 className="card-title text-xl">{brewery.name}</h2>
              <p className="text-m">
                {brewery.address.street}, {brewery.address.city},{" "}
                {brewery.address.state}, {brewery.address.zip}
              </p>
              {brewery.url ? (
                <div className="card-actions justify-end">
                  <button className="btn text-pink-400 hover:text-white">
                    <a href={brewery.url} target="_blank">view website</a>
                  </button>
                </div>
              ) : (
                <div className="card-actions justify-end">
                <p class="text-red-400 bg-white text-lg">no website listed</p>
                <button className="btn text-pink-400 hover:text-white">
                  <a href={brewery.url}>details</a>
                </button>
              </div>
              )}
            </div>
          </Card>
        ))}
        {selectedBrewery && (
          <Modal
            setSelectedBrewery={setSelectedBrewery}
            selectedBrewery={selectedBrewery}
          />
        )}
      </Container>
    </>
  );
};
