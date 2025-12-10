import './App.css';
import axios from 'axios';
import { useState } from "react";
import worldMap from './assets/world_map.png';
import setRegionColor from "./helpers/setRegionColor.js";
import convertToMillions from "./helpers/convertToMillions.js";

function App() {


    const [region, setRegion] = useState("");
    const [loading, toggleLoading] = useState(false)
    const [error, toggleError] = useState(false)
    const [allCountry, setAllCountrys] = useState([])
    const [search, setSearch] = useState({})
    const [inputValue, setInputValue] = useState("");


    async function fetchAllCountrys() {
        try {
            toggleError(false)
            toggleLoading(true)
            const result = await axios.get(`https://restcountries.com/v3.1/all`, {
             params: {
                 fields: "name,flags,flag,region,population,ccn3"
             }
            });

            result.data.sort((a, b) => {
                return a.population - b.population
            })

            // console.log(result.data);
            setAllCountrys(result.data)
        } catch (e) {
            console.error(e);
            toggleError(true)
        }
        finally {
            toggleLoading(false)
        }
    }


    async function searchCountry(name) {
        try {
            toggleError(false)
            toggleLoading(true)
            const result = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
            // console.log(result.data[0]);

            setSearch(result.data[0])
            setRegion(result.data[0].region)
            setInputValue("")
        } catch (e) {
            console.error(e);
            toggleError(true)
        }
        finally {
            toggleLoading(false)
        }
    }


    function handleSubmit(e) {
        e.preventDefault(); // voorkomt dat de pagina refresh
        console.log("Input waarde:", inputValue);
        searchCountry(inputValue);

    }

    return (
        <>
            <section className="first-section">
                <img src={worldMap} alt="world map"  className="map-img"/>
                <h1>World Regions</h1>
            </section>


            {/*alle landen*/}
            <section className="second-section">
                <div className="button-wrapper">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={fetchAllCountrys}
                        className="first-button"
                    >
                         AlleLanden
                    </button>
                </div>

                {allCountry && (
                    allCountry.map((country) => (

                        <div key={country.ccn3} className="card">
                            <span className="flag-and-name">
                                <img src={country.flags.png} alt={country.flags.alt} />
                                <p className={setRegionColor(country.region)}>{country.name.common}</p>
                            </span>
                            <li>Has a population of {country.population} people</li>
                        </div>
                    ))
                )}

            </section>
                <section className="first-section">
                    {/*search*/}
                    {error && <p className="asia">Land niet gevonden, voer juiste gegevens in!</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={inputValue}               // value komt uit state
                            onChange={(e) => setInputValue(e.target.value)} // update state bij typen
                        />
                        <button type="submit" className="second-button">Zoek</button>
                    </form>

                    {region && (
                        <div className="card-2">
                        <span className="flag-and-name">
                            <img src={`${search.flags.png}`} alt="country-flag-image"/>
                            <h3 className={setRegionColor(search.region)}>{search.name.common}</h3>
                        </span>
                            <hr/>
                            <p id="country-info">{search.name.common} is situated in {search.subregion} and the capital is {search.capital[0]} Hit has a population of {convertToMillions(search.population)} million people and it borders with {search?.borders?.length} neighboring countries Websites can be found on <span className="bold">{search.tld[0]}</span> domain's</p>
                            <li>{console.log(search)}</li>
                        </div>

                    )}
                </section>
        </>
    );
}

export default App;