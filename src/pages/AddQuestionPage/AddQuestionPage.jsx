import cls from './AddQuestionPage.module.css';
import { API_URL } from '../../constants';
import { useActionState } from 'react';
import { toast } from 'react-toastify';
import { delayFn } from '../../helpers/delayFn';
import { Loader } from '../../components/Loader';
import { QestionForm } from '../../components/QestionForm';

const createCardAction = async ( _prevState, formData ) => {

    try {
        await delayFn(1500); // штучна затримка (імітує роботу сервера)

        const newQuestion = Object.fromEntries(formData);
        const resources   = newQuestion.resources.trim();
        const isClearForm = newQuestion.clearForm;
        // console.log('formData',Object.fromEntries(formData));
        // console.log('formFieldValue',formData.get('question'));

        const response = await fetch(`${API_URL}/react`, {
            method: 'POST',
            body: JSON.stringify({
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(',') : [],
                level: Number(newQuestion.level),
                completed: false,
                editDate: undefined,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Request failed');
        }

        const question = response.json();
        toast.success('New question is successfully created!');

        return isClearForm ? {} : question;
    } catch (error) {
        console.error('error',error);
        toast.error(error.message);
        return {};
    }
}

const AddQuestionPage = () => {

    const [formState, formAction, isPending] = useActionState( createCardAction, { clearForm : true });

    return (
        <>
        {isPending && <Loader />}
        <div className={cls.addQuestionFormWrpp}>
            <h1 className={cls.formTitle}>Add new question</h1>
            <QestionForm 
                formState={formState} 
                formAction={formAction} 
                isPending={isPending}
                textButton="Add question" />
        </div>
        </>
    );
};

export default AddQuestionPage;