import "./App.css";

import axios from "axios";
import { useState } from "react";
import worldMap from "./assets/world_map.png";
import { formatPopulation } from "./helpers/formatPopulation.js";
import { colorPicker } from "./helpers/colorPicker.js";
import { formatMillion } from "./helpers/formatMillion.js";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [countryInformation, setCountryInformation] = useState({});
  const [error, setError] = useState("");

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

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const result = await axios.get(
        `https://restcountries.com/v3.1/name/${searchString}`,
      );
      const country = result.data[0];

      console.log(country);

      setCountryInformation(country);

      setSearchString("");
    } catch (error) {
      setError(`${searchString} niet gevonden. Probeer opnieuw.`);
      console.log("Error while fetching country after from submit " + error);
      setSearchString("");
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
            Get all countries
          </button>
        )}
      </section>
      <section className="specific-country-container">
        <h2>Search Country</h2>
        {error && <span className="error">{error}</span>}
        <form onSubmit={handleSubmit} className="form-wrapper">
          <input
            type="text"
            id="search-country"
            name="search-country"
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
          <button type="submit">Search country</button>
        </form>

        {Object.keys(countryInformation).length > 0 && (
          <div className="country-card big-card">
            <div>
              <h2>{countryInformation.name.common}</h2>
              <span className="flag-wrapper">
                <img
                  src={countryInformation.flags.png}
                  alt={`flag of ${countryInformation.name.common}`}
                />
              </span>
            </div>
            <p>
              {countryInformation.name.common} is situated in{" "}
              {countryInformation.subregion} and the capital is{" "}
              {countryInformation.capital[0]}. It has a population of{" "}
              {formatMillion(countryInformation.population)} million people and
              it borders with {countryInformation.borders.length} neighboring
              countries. Websites can be found on {countryInformation.tld[0]}{" "}
              domains.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
