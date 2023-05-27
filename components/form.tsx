import React from 'react';
import { Button, Input, Select } from './assests';
import styles from '@/styles/form.module.sass'

interface FormProps {
    submitText:string;
    formComponents: FormComponent[];
}

export interface FormComponent {
    type: 'button' | 'input' | 'select';
    label: string;
    text?: string;
    readonly?: boolean;
    buttonFeed?: string
    options?: string[];
    primary?: boolean
    onClick?: () => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

function Form({ submitText, formComponents }: FormProps){
  return (
    <form>
        {formComponents.map((component, index) => (
            <div key={index} >
                <label className={styles.label}>{component.label} </label><br/>
                <div className={styles.component}>
                    {renderComponent(component)}
                </div>
                
            </div>
        ))}
        <Button $primary className='right'>{submitText}</Button>
    </form>
  );
};

const renderComponent = (component: FormComponent) => {
    switch (component.type) {
        case 'button':
          return renderButton(component);
        case 'input':
          return renderInput(component);
        case 'select':
          return renderSelect(component);
        default:
          return null;
      }
}

const renderButton = ({primary,onClick,text,buttonFeed}:FormComponent) =>{
    return(
        <>
            <Button className={styles.margin} $primary={primary} onClick={onClick}>{text} </Button>
            {buttonFeed && (
                <> <br/> {buttonFeed} </>
            )}
        </>
    )
}

const renderSelect = ({options,onChange}:FormComponent) =>{
    return(
        <>
            <Select className={`${styles.input} ${styles.margin}`} onChange={onChange}>
                {options?.map(option => 
                    <option key={option}>{option}</option>  
                )}
            </Select>
        </>
    )
}

const renderInput = ({readonly,onChange,text}:FormComponent) =>{
    return(
        <Input readOnly={readonly} className={`${styles.input} ${styles.margin}`} onChange={onChange} placeholder={text} />
    )
}
export default Form;