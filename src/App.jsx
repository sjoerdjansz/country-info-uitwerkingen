import "./App.css";

import axios from "axios";
import { useState } from "react";
import worldMap from "./assets/world_map.png";
import { formatPopulation } from "./helpers/formatPopulation.js";
import { colorPicker } from "./helpers/colorPicker.js";

function App() {
  const [countries, setCountries] = useState([]);

  async function fetchCountries() {
    try {
      const result = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,population,flags,region\n",
      );
      result.data.sort((a, b) => {
        return b.population - a.population;
      });

      setCountries(result.data);
    } catch (error) {
      console.log("Failed to fetch countries: " + error);
    }
  }

  return (
    <div className="container">
      <header>
        <div className="header-image-container">
          <img src={worldMap} alt="world map" />
        </div>
        <h1>Country Information</h1>
      </header>

      <section className="countries-list-container">
        {countries.length > 0 ? (
          countries.map((country) => {
            return (
              <div key={country.name.common} className="country-card">
                <div>
                  <span className="flag-wrapper">
                    <img
                      src={country.flags.png}
                      alt={`flag of ${country.name.common}`}
                    />
                  </span>
                  <p className={colorPicker(country.region)}>
                    {country.name.common}
                  </p>
                </div>
                <p>
                  Has a population of {formatPopulation(country.population)}{" "}
                  people
                </p>
              </div>
            );
          })
        ) : (
          <button onClick={fetchCountries} type="button">
            Get countries
          </button>
        )}
      </section>
    </div>
  );
}

export default App;
