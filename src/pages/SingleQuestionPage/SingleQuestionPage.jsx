import cls from './SingleQuestionPage.module.css';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useId, useState } from 'react';
import { API_URL } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Loader, SmallLoader } from '../../components/Loader';

const SingleQuestionPage = () => {

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
                    <p>What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since 1966 is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                </div>
            )}
            { isCardLoading && <Loader /> }
        </>
        
    );
};

export default SingleQuestionPage;