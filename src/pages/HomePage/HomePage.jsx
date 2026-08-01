import cls from "./HomePage.module.css";
import { useState, useEffect, useRef, useMemo } from "react";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";

const DEFAULT_PER_PAGE = 15;

export const HomePage = () => {

    const [ questions, setQuestions ] = useState([]);
    const [ searchParams, setSearchParams ] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
    const [ searchValue, setSearchValue ] = useState('');
    const [ sortSelectValue, setSortSelectValue ] = useState('');
    const [ countSelectValue, setCountSelectValue ] = useState( DEFAULT_PER_PAGE );

    const controlsContainerRef = useRef();

    const [ getQuestions, isLoading, error ] = useFetch( async (url) => {

        const response = await fetch(`${API_URL}/${url}`);
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Request failed');
        }
        const questions = await response.json();

        setQuestions(questions);
        return questions;
    });

    const getActivePageNumber = () => ( questions.next === null ? questions.last : questions.next -1 );

    // Старий спосіб отримання данних
    // const [ isLoading, setIsLoading ] = useState(false);
    // const getQuestions = async () => {
    //     try {
    //         setIsLoading(true);
    //         await delayFn(1500);
    //         const response = await fetch(`${API_URL}/react`);
    //         const questions = await response.json();
    //         setQuestions(questions);
    //         console.log('questions',questions);
    //     } catch ( error ) {
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }
    // console.log('questions',questions);
    
    const cards = useMemo(() => {
        if( questions?.data ){
            if( questions.data.length && searchValue.trim() ){
                return questions.data.filter( (d) => d.question.toLowerCase().includes( searchValue.trim().toLowerCase() ) );
            } else {
                return questions.data;
            }
        } else {
            return [];
        }
        
        
    }, [questions, searchValue]); 

    const pagination  = useMemo(() => {
        
        const totalCardsCount = questions?.pages || 0;

        return Array(totalCardsCount).fill(0).map((_,i) => i + 1);

    }, [questions]);

    useEffect(() => {

        getQuestions(`react${searchParams}`);
    }, [searchParams]);

    const searchValueHandler = (e) => {
        setSearchValue(e.target.value);
    }

    const onSortSelectChangeHandler = (e) => {

        setSortSelectValue( e.target.value );
        createUlrParamsStr( { sortSelectVal : e.target.value } );
    }

    const onCountSelectChangeHandler = (e) => {

        setCountSelectValue( e.target.value );
        createUlrParamsStr( { per_page : e.target.value } );
    }

    const createUlrParamsStr = ( data = {} ) => {

        const { sortSelectVal = sortSelectValue, page = 1, per_page = countSelectValue } = data;

        let urlParams = [
            {'_page' : page },
            {'_per_page' : per_page }
        ];

        switch ( sortSelectVal ) {
            case 'level_asc':
                urlParams.push({'_sort' : 'level'});
                break;

            case 'level_desc':
                urlParams.push({'_sort' : '-level'});
                break;
            
            case 'completed_asc':
                urlParams.push({'_sort' : 'completed'});
                break;

            case 'completed_desc':
                urlParams.push({'_sort' : '-completed'});
                break;

            default:
                
                break;
        }

        const urlParamsStr = urlParams.length
            ? "?" + urlParams
                .flatMap(param => Object.entries(param))
                .map(([key, value]) => `${key}=${value}`)
                .join("&")
            : "";
        
        setSearchParams( urlParamsStr );
    }

    const paginationHandler = (e) => {
        if( e.target.tagName === "BUTTON" ){
            createUlrParamsStr( { page : e.target.textContent } );
            controlsContainerRef.current.scrollIntoView({ behavior : 'smooth' });
        }
    }

    return (
        <>
            HomePage
            <div className={cls.controlsContainer} ref={controlsContainerRef}>
                <SearchInput value={searchValue} onChange={searchValueHandler} />

                <select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={cls.select}>
                    <option value="">sort by</option>
                    <hr />
                    <option value="level_asc">level ASC</option>
                    <option value="level_desc">level DESC</option>
                    <option value="completed_asc">completed ASC</option>
                    <option value="completed_desc">completed DESC</option>
                </select>

                <select value={countSelectValue} onChange={onCountSelectChangeHandler} className={cls.select}>
                    <option value="">count</option>
                    <hr />
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            { isLoading && <Loader /> }
            { error && <p>{error}</p> }
            { cards.length === 0 && <p className={cls.noCards}>Cards not found.</p> } 
            <QuestionCardList questions={cards} />
            {pagination.length > 1 &&  (
                <div className={cls.paginationContainer} onClick={paginationHandler}>
                    {
                        pagination.map((value) => {
                            return <Button key={value} isActive={value === getActivePageNumber() }>{value}</Button>
                        })
                    }
                </div>
            )}
        </>
    );
};