import cls from './AddQuestionPage.module.css';
import { API_URL } from '../../constants';
import { useActionState } from 'react';
import { Button } from '../../components/Button';
import { toast } from 'react-toastify';
import { delayFn } from '../../helpers/delayFn';

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

        const question = response.json();
        toast.success('New question is successfully created!');

        return isClearForm ? {} : question;
    } catch (error) {
        console.error('error',error);
        toast.error(error.message);
    }
}

export const AddQuestionPage = () => {

    const [formState, formAction, isPending] = useActionState( createCardAction, { clearForm : true });

    return (
        <div className={cls.addQuestionFormWrpp}>
            <h1 className={cls.formTitle}>Add new question</h1>
            <form action={formAction} className={cls.form}>

                <div className={cls.fieldWrapper}>
                    <label htmlFor="questionField">Question:</label>
                    <textarea 
                        defaultValue={formState.question}
                        name="question" 
                        id="questionField" 
                        className={cls.textarea}
                        cols="30" 
                        rows="2" 
                        required 
                        placeholder="please enter a question">
                    </textarea>
                </div>
                <div className={cls.fieldWrapper}>
                    <label htmlFor="shortAnsverField">Short ansver:</label>
                    <textarea 
                        defaultValue={formState.answer}
                        name="answer" 
                        id="shortAnsverField" 
                        className={cls.textarea}
                        cols="30" 
                        rows="2" 
                        required 
                        placeholder="please enter a Short ansver">
                    </textarea>
                </div>
                <div className={cls.fieldWrapper}>
                    <label htmlFor="descriptionField">Description:</label>
                    <textarea 
                        defaultValue={formState.description}
                        name="description" 
                        id="descriptionField" 
                        className={cls.textarea}
                        cols="30" 
                        rows="5" 
                        required 
                        placeholder="please enter a description">
                    </textarea>
                </div>
                <div className={cls.fieldWrapper}>
                    <label htmlFor="resourcesField">Resources:</label>
                    <textarea 
                        defaultValue={formState.resources}
                        name="resources" 
                        id="resourcesField" 
                        className={cls.textarea}
                        cols="30" 
                        rows="5" 
                        required 
                        placeholder="please enter a resources separated by commas">
                    </textarea>
                </div>
                <div className={cls.fieldWrapper}>
                    <label htmlFor="levelField">Level:</label>
                    <select 
                        defaultValue={formState.level}
                        id="levelField"
                        name="level" 
                        className={cls.select}
                        >
                        <option value="">Question level</option>
                        <hr />
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className={cls.fieldWrapper}>
                    <label htmlFor="clearFormField" className={cls.checkboxLabel}>
                        <input 
                        defaultChecked={formState.clearForm}
                        id="clearFormField" 
                        className={cls.checkbox}
                        type="checkbox"
                        name="clearForm" />
                        <span>clear form after submitting?</span>
                    </label>
                </div>
                <div className={cls.fieldWrapper}>
                    <Button type="submit" isDisabled={isPending}>Add question</Button>
                </div>
            </form>
        </div>
    );
};