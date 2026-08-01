import { Button } from '../Button';
import cls from './QestionForm.module.css';

export const QestionForm = ({formAction, formState, isPending, textButton}) => {
    return (
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
                <Button type="submit" isDisabled={isPending}>{textButton}</Button>
            </div>
        </form>
    );
};