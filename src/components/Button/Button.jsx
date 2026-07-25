import {} from 'react';
import cls from "./Button.module.css";

const inlineStyles = {
    color : "lightsalmon",
    backgroundColor : "#ccc",
}

const isPrimary = false;

export const Button = (props) => {
    const { onClick, children, className } = props;
    return (
        // <button className={isPrimary ? cls.primary : cls.btn}> Button </button>
        <button 
            type="button"
            className={`${className} ${isPrimary ? cls.primary : ""}`}
            onClick={onClick}
        > {children} </button>
    );
}