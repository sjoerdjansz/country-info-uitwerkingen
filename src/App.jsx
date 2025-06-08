import "./App.css";

import axios from "axios";
import { useEffect, useState } from "react";
import worldMap from "./assets/world_map.png";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  async function fetchCountries() {
    try {
      const result = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,population,flags\n",
      );
      setCountries(result.data);
      console.log(typeof countries.data);
    } catch (error) {
      console.log("Failed to fetch countries: " + error);
    }
  }

  function formatPopulation(population) {
    return new Intl.NumberFormat("nl-NL").format(population);
  }

  return (
    <>
      <header>
        <div className="header-image-container">
          <img src={worldMap} alt="world map" />
        </div>
        <h1>Country Information</h1>
      </header>

      <section className="countries-list-container">
        {countries.map((country) => {
          return (
            <div key={country.name.common} className="country-card">
              <div>
                <span className="flag-wrapper">
                  <img
                    src={country.flags.png}
                    alt={`flag of ${country.name.common}`}
                  />
                </span>
                <p>{country.name.common}</p>
                <p></p>
              </div>
              <p>
                Has a population of {formatPopulation(country.population)}{" "}
                people
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
