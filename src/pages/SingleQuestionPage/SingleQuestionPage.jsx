import cls from './SingleQuestionPage.module.css';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useId, useState } from 'react';
import { API_URL } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Loader, SmallLoader } from '../../components/Loader';

export const SingleQuestionPage = () => {

    const [card, setQuestionCard] = useState(null);
    const [isChecked, setIsChecked] = useState(true);
    const isCompleted = useId();
    const navigate = useNavigate();
    const {id: questionId} = useParams();

    // якщо card верне "card = null" то ці функції не відпрацюють, тому що не пройдуть перевірку "card !== null"
    const levelVariant = () => (card.level === 1 ? 'primary' : card.level === 2 ? 'warning' :  'alert');
    const completedVariant = () => (card.completed ? "succes" : "");

    const [ fetchCard, isCardLoading ] = useFetch( async () => {
        
        const response = await fetch(`${API_URL}/react/${questionId}`);
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Request failed');
        }
        const data = await response.json();
        
        setQuestionCard(data);
        
    });

    const [ updateCard, isCardUpdating ] = useFetch( async (isChecked) => {
        
        const response = await fetch(`${API_URL}/react/${questionId}`, {
            method: "PATCH",
            body: JSON.stringify({ completed : isChecked })
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Request failed');
        }
        const data = await response.json();
        
        setQuestionCard(data);
        
    });
    
    useEffect(() => {
        card !== null && setIsChecked(card.completed);
    }, [card]);

    useEffect(() => {
        fetchCard();
    }, []);

    const onCheckboxChangeCheckedHandler = () => {
        setIsChecked(!isChecked);
        updateCard(!isChecked);
    }
    
    return (
        <>
            {card !== null && (
                <div className={cls.questionPageWrapper}>
                    <div className={cls.cardLabels}>
                        <Badge variant={levelVariant()}>Level: {card.level}</Badge>
                        <Badge variant={completedVariant()}>{card.completed ? "Completed" : "Not Completed"}</Badge>
                    </div>
                    <div className={cls.metaRow}>
                        {card?.editDate && <span className={cls.metaDate}>edited date: {card.editDate}</span>}
                    </div>
                    <h1 className={cls.cardTitle}>{card.question}</h1>
                    <div className={cls.cardAnswer}>
                        <span className={cls.cardAnswerLabel}>answer:</span>
                        <p className={cls.cardAnswerText}>{card.answer}</p>
                        <span className={cls.cardAnswerLabel}>description:</span>
                        <p className={cls.cardAnswerText}>{card.description}</p>

                        {card?.resources.length && 
                        <>
                            resources:
                            <ul className={cls.resourcesList}>
                                
                                {card.resources.map((link, index) => {
                                    return <li className={cls.linkItem} key={index}>
                                        <a href={link.trim()} target="_blank" rel="noreferrer">{link.trim()}</a>
                                    </li>
                                })}
                            </ul>
                        </>
                        }

                        <label htmlFor={isCompleted} className={cls.isCompletedLabel}>
                            <input 
                                id={isCompleted} 
                                className={cls.isCompletedCheckbox}
                                type="checkbox" 
                                checked={isChecked} 
                                onChange={onCheckboxChangeCheckedHandler} 
                                disabled={isCardUpdating} />
                            <span>mark question as completed</span>
                            { isCardUpdating && <SmallLoader /> }
                        </label>

                        <div className={cls.buttonsRow}>
                            <Button className={cls.button} onClick={() => navigate('/editquestion/')} isDisabled={isCardUpdating}>Edit Question</Button>
                            <Button className={cls.button} onClick={() => navigate('/')} isDisabled={isCardUpdating}>Back</Button>
                        </div>
                    </div>
                </div>
            )}
            { isCardLoading && <Loader /> }
        </>
        
    );
};