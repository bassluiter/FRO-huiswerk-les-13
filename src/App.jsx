import './App.css';
import axios from 'axios';
import { useState } from "react";
import worldMap from './assets/world_map.png';
import Button from "./components/Button.jsx";
import Card from "./components/Card.jsx";
import Card2 from "./components/Card2.jsx";
import gifje from "./assets/gifje.gif"

function App() {

    const [region, setRegion] = useState("");
    const [loading, toggleLoading] = useState(false)
    const [error, toggleError] = useState(false)
    const [allCountry, setAllCountries] = useState([])
    const [search, setSearch] = useState({})
    const [inputValue, setInputValue] = useState("");
    const [errorValue, setErrorValue] = useState("")

    async function fetchAllCountries() {
        try {
            toggleError(false)
            toggleLoading(true)
            const result = await axios.get(`https://restcountries.com/v3.1/all`, {
             params: {
                 fields: "name,flags,flag,region,population,ccn3"
             }
            });

            result.data.sort((a, b) => {
                return a.population - b.population;
            })

            // console.log(result.data);
            if (allCountry.length === 0) {
                setAllCountries(result.data);
            } else {
                setAllCountries([]);
            }

        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        finally {
            toggleLoading(false);
        }
    }

    async function searchCountry(name) {
        try {
            toggleError(false);
            toggleLoading(true);
            const result = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
            // console.log(result.data[0]);
            setSearch(result.data[0]);
            setRegion(result.data[0].region);
        } catch (e) {
            console.error(e);
            toggleError(true)
            setRegion("");
        }
        finally {
            toggleLoading(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        searchCountry(inputValue);
        setErrorValue(inputValue)
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
                    <Button
                        type="button"
                        disabled={loading}
                        onClick={fetchAllCountries}
                        className="first-button"
                        textInput={"AlleLanden"}
                    />
                </div>
                {allCountry && (
                    allCountry.map((country) => (
                        <Card
                            key={country.ccn3}
                            classNameDiv="card"
                            classNameSpan="flag-and-name"
                            classNameP={country.region}
                            imgSrc={country.flags.png}
                            alt={country.flags.alt}
                            paragraphText={country.name.common}
                            liText={`Has a population of ${country.population} people`}
                        />
                    ))
                )}

            </section>
            <section className="first-section">
                <div className="error-msg-wrapper">
                    {loading &&
                        <div className="gif-wrapper">
                            <img className="gif" src={gifje} alt="loading-gif"/>
                        </div>
                    }
                    {error &&
                        <p className="error-msg">{errorValue ? errorValue : `" "`} bestaat niet. Probeer het opnieuw</p>
                    }
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button
                        type="submit"
                        className="second-button"
                        textInput="ZOEK"
                    />
                </form>
                {region && (
                    <Card2
                        key={search.ccn3}
                        imgSrc={`${search.flags.png}`}
                        alt={search.flags.alt}
                        classNameH3={search.region}
                        h3Text={search.name.common}
                        id="country-info"
                        name={search.name.common}
                        subRegion={search.subregion}
                        capital={search.capital[0]}
                        population={search.population}
                        borderingCountries={search?.borders?.length}
                        tld={search.tld[0]}
                    />
                )}
            </section>
        </>
    );
}

export default App;