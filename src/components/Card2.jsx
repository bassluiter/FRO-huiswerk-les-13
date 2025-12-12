import './Card2.css'
import convertToMillions from "../helpers/convertToMillions.js";
import setRegionColor from "../helpers/setRegionColor.js";

function Card2 ({ key, classNameH3, imgSrc, alt, id, h3Text, name, subRegion, capital, population, borderingCountries, tld }) {
    return (
        <div className="card-2" key={key}>
            <span className="flag-and-name">
                <img src={imgSrc} alt={alt}/>
                <h3 className={setRegionColor(classNameH3)}>{h3Text}</h3>
            </span>
            <hr/>
            <p id={id}>{name} is situated in {subRegion} and the capital is {capital} It has a population of {convertToMillions(population)} million people and it borders with {borderingCountries} neighboring countries Websites can be found on <span className="bold">{tld}</span> domain's</p>
        </div>
    )
}

export default Card2