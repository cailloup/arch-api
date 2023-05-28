import React, { useMemo, useRef, useState } from 'react';
import { Button, Input, Select } from './assets';
import styles from '@/styles/form.module.sass'
import { ButtonComponent, Component, InputFileComponent } from './FormComponents';
interface FormProps {
    submitText:string;
    formComponents: Component[];
    onSubmit: (data:any)=> void;
}

function Form({ submitText, formComponents, onSubmit }: FormProps){

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const data: any = formComponents.reduce((acc:any, component) => {
          if (!(component instanceof ButtonComponent)) {
            if(!(component instanceof InputFileComponent)){
                const elements = event.currentTarget.querySelectorAll<HTMLInputElement>(`[id^="${component.props.id}"]`);
                acc[component.props.id] = Array.from(elements).map((element) => element.value).join(' ');
            }else{
                const element = event.currentTarget.querySelector<HTMLInputElement>(`#${component.props.id}`);
                if(element?.files?.length){
                    acc[component.props.id] =element.files[0];
                } 
            }
          }
          return acc;
        }, {});
      
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {formComponents.map((component, index) => (
                <div key={index} >
                    {component.render()}
                </div>
            ))}
            <Button $primary className={styles.sendButton}>{submitText}</Button>
        </form>
    );
};

export default Form;