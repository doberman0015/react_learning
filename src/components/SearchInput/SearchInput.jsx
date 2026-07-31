import { useId } from 'react';
import cls from './SearchInput.module.css';
import { SearchIcon } from "../icons"

export const SearchInput = ( props ) => {

    const { searchValue, onChange } = props;
    const inputId = useId();

    return (
        <div className={cls.inputContainer}>
            <label htmlFor={inputId} className={cls.searchIcon}>
                <SearchIcon />
            </label>
            <input id={inputId} type="text" className={cls.searchInput} value={searchValue} placeholder="Search..." onChange={onChange} />
        </div>
    );
};