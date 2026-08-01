import cls from './EditQuestionPage.module.css';
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { EditQuestion } from './EditQuestion';

export const EditQuestionPage = () => {

    const {id: questionId} = useParams();
    const [questionData, setQuestionData] = useState(null);

    const [ fetchQuestion, isQuestionLoading ] = useFetch( async () => {
            
        const response = await fetch(`${API_URL}/react/${questionId}`);
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Request failed');
        }
        const data = await response.json();
        
        setQuestionData(data);
        
    });

    useEffect(() => {
        fetchQuestion();
    }, []);

    return (
        <>
        {isQuestionLoading && <Loader />}
        {questionData && <EditQuestion initialState={questionData} />}
        </>
    );
};