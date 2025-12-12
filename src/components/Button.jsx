import './Button.css';

function Button({type, disabled, onClick, className, textInput}) {

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={className}
        >
            {textInput}
        </button>
        )
}

export default Button