import { memo } from 'react';
import { QuestionCard } from '../QuestionCard';
import cls from './QuestionCardList.module.css';

export const QuestionCardList = memo( (props) => {
    const { questions } = props;
    return (
        <div className={cls.cardList}>
            {questions.map(( card, index ) => {
                return <QuestionCard card={card} key={index} /> 
            })}
        </div>
    );
});