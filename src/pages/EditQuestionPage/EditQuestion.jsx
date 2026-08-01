import cls from './EditQuestionPage.module.css';
import { Loader } from '../../components/Loader';
import { QestionForm } from '../../components/QestionForm';
import { useActionState } from 'react';
import { delayFn } from '../../helpers/delayFn';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';
import { dateFormat } from '../../helpers/dateFormat';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const editCardAction = async ( _prevState, formData ) => {

    try {
        await delayFn(1500); // штучна затримка (імітує роботу сервера)

        const newQuestion = Object.fromEntries(formData);
        const questionId = newQuestion.questionId.trim();
        const resources   = newQuestion.resources.trim();
        const isClearForm = newQuestion.clearForm;
        // console.log('formData',Object.fromEntries(formData));
        // console.log('formFieldValue',formData.get('question'));

        const response = await fetch(`${API_URL}/react/${questionId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                id: questionId,
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(',') : [],
                level: Number(newQuestion.level),
                completed: false,
                editDate: dateFormat( new Date() ),
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Request failed');
        }

        const question = response.json();
        toast.success('The question is edited successfully!');

        return isClearForm ? {} : question;
    } catch (error) {
        console.error('error',error);
        toast.error(error.message);
        return {};
    }
}

export const EditQuestion = ({ initialState = {} }) => {

    const navigate = useNavigate();
    const [formState, formAction, isPending] = useActionState( editCardAction, { ...initialState, clearForm : false });

    const [removeQuestion, isQuestionRemoving] = useFetch( async () => {

        const response = await fetch(`${API_URL}/react/${initialState.id}`, {
            method: "DELETE",
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Request failed');
        }
        toast.success('The question has been successfully removed!');
        navigate('/');
    });

    const onRemoveQuestionHandler = () => {
        const isRemove = confirm('Are you sure?');

        isRemove && removeQuestion();
    }
    
    return (
        <>
        {(isPending || isQuestionRemoving) && <Loader />}
        <div className={cls.addQuestionFormWrpp}>
            <h1 className={cls.formTitle}>Add new question</h1>
            <button className={cls.removeBtn} disabled={isPending || isQuestionRemoving} onClick={onRemoveQuestionHandler}>
                remove question
            </button>
            <QestionForm
                formState={formState} 
                formAction={formAction} 
                isPending={isPending || isQuestionRemoving}
                textButton="Edit question" />
        </div>
        </>
    );
};