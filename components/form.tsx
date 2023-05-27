import React from 'react';
import { Button, Input, Select } from './assests';
import styles from '@/styles/form.module.sass'

interface FormProps {
  formComponents: FormComponent[];
}

export interface FormComponent {
    type: 'button' | 'input' | 'select';
    label: string;
    text?: string;
    options?: string[];
    primary?: boolean
    onClick?: () => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

const Form: React.FC<FormProps> = ({ formComponents }) => {
  return (
    <form>
    {formComponents.map((component, index) => (
        <div key={index}>
            <label className={styles.label}>{component.label} </label><br/>

            {component.type === 'button' && (
            <Button className={styles.margin} $primary={component.primary} onClick={component.onClick}>{component.text}</Button>
            )}
            {component.type === 'input' && (
            <Input className={`${styles.input} ${styles.margin}`} onChange={component.onChange} placeholder={component.text} />
            )}
            {component.type === 'select' && (
            <Select className={`${styles.input} ${styles.margin}`} onChange={component.onChange}>
                {component.options?.map(option => 
                    <option key={option}>{option}</option>  
                )}
            </Select>
            )}
            <br/><br/>
        </div>
    ))}
  </form>
  );
};

export default Form;