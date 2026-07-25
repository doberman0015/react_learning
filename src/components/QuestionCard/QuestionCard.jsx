import { Button } from '../Button';
import cls from './QuestionCard.module.css';

export const QuestionCard = () => {
    return (
        <div className={cls.card}>
            <div className={cls.cardLabels}>
                <div>Level: 1</div>
                <div>Not Completed</div>
            </div>
            <h5 className={cls.cardTitle}>Question Card</h5>
            <div className={cls.cardAnswer}>
                <span className={cls.cardAnswerLabel}>short answer:</span>
                <p className={cls.cardAnswerText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966</p>
            </div>
            <Button className={cls.viewButton} onClick={() => {}} >View</Button>
        </div>
    );
};