import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import cls from './QuestionCard.module.css';
import { Badge } from '../Badge';

export const QuestionCard = ( props ) => {

    const { card } = props;
    const navigate = useNavigate();
    const levelVariant = card.level === 1 ? 'primary' : card.level === 2 ? 'warning' :  'alert';
    const completedVariant = card.completed ? "succes" : "";
    
    return (
        <div className={cls.card}>
            <div className={cls.cardLabels}>
                <Badge variant={levelVariant}>Level: {card.level}</Badge>
                <Badge variant={completedVariant}>{card.completed ? "Completed" : "Not Completed"}</Badge>
            </div>
            <h5 className={cls.cardTitle}>{card.question}</h5>
            <div className={cls.cardAnswer}>
                <span className={cls.cardAnswerLabel}>short answer:</span>
                <p className={cls.cardAnswerText}>{card.answer}</p>
            </div>
            <Button className={cls.viewButton} onClick={() => navigate(`/question/${card.id}`)} >View</Button>
        </div>
    );
};