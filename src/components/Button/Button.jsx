import {} from 'react';
import cls from "./Button.module.css";

export const Button = (props) => {
    const { onClick, children, className = '', isActive, isDisabled } = props;
    console.log('cls',cls);
    
    return (
        <button 
            type="button"
            className={`${className} ${cls.btn} ${isActive ? cls.active : ""}`}
            disabled={isDisabled}
            onClick={onClick}
        > {children} </button>
    );
}