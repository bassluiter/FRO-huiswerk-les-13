import './Card.css'
import setRegionColor from "../helpers/setRegionColor.js";

function Card({key,classNameDiv, classNameSpan,classNameP, imgSrc, alt, paragraphText, liText}) {
    return(
        <div key={key} className={classNameDiv}>
            <span className={classNameSpan}>
                <img src={imgSrc} alt={alt} />
                <p className={setRegionColor(classNameP)}>{paragraphText}</p>
            </span>
            <li>{liText}</li>
        </div>
    )
}

export default Card