
import { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";


export const HomePage = () => {

    const [ questions, setQuestions ] = useState([]);
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

    useEffect(() => {
        getQuestions('react');
    }, []);


    return (
        <>
            HomePage
            { isLoading && <Loader /> }
            { error && <p>{error}</p> }
            <QuestionCardList questions={questions} />

        </>
    );
};