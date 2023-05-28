import React, { useMemo, useRef, useState } from 'react';
import { Button, Input, Select } from './assets';
import styles from '@/styles/form.module.sass'

interface FormProps {
    submitText:string;
    formComponents: FormComponent[];
    onSubmit: (data:any)=> void;
}

export interface FormComponent {
    type: 'button' | 'input' | 'select' | 'input&Button' | 'inputDate' | 'inputFile';
    label: string;
    id: string;
    text?: string[];
    value?: string;
    readonly?: boolean;
    buttonFeed?: string
    options?: string[];
    primary?: boolean
    textButton?: string;
    optional?: boolean;
    onClick?: () => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

function Form({ submitText, formComponents, onSubmit }: FormProps){

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const data: any = formComponents.reduce((acc:any, component) => {
          if (component.type !== 'button') {
            if(component.type !== 'inputFile'){
                const elements = event.currentTarget.querySelectorAll<HTMLInputElement>(`[id^="${component.id}"]`);
                acc[component.id] = Array.from(elements).map((element) => element.value).join(' ');
            }else{
                const element = event.currentTarget.querySelector<HTMLInputElement>(`#${component.id}`);
                if(element?.files?.length){
                    acc[component.id] =element.files[0];
                } 
            }
          }
          return acc;
        }, {});
      
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            {formComponents.map((component, index) => (
                <div key={index} >
                    <span className={styles.label}>{component.label} </span><br/>
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
        case 'input&Button':
            return renderInputNButton(component);
        case 'inputFile':
            return renderInputFile(component);
        case 'select':
            return renderSelect(component);
        case 'inputDate':
            return renderInputDate(component);
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

const renderSelect = ({options,onChange,id}:FormComponent) =>{
    return(
        <>
            <Select name={id} id={id}  className={`${styles.input} ${styles.margin}`} onChange={onChange}>
                {options?.map(option => 
                    <option key={option}>{option}</option>  
                )}
            </Select>
        </>
    )
}

const renderInput = ({readonly,onChange,text,value,optional,id}:FormComponent) =>{
    
    return(
        <div className={styles.grid} style={{ gap:'15px', display:'grid', gridTemplateColumns:`repeat(${text?.length},1fr)` }} >
            {text?.map( (text,index) =>
                <Input name={id} id={`${id}${index}`} key={index} required={!optional} readOnly={readonly} disabled={readonly} className={`${styles.input} ${styles.margin}`} onChange={onChange} placeholder={text} defaultValue={value?value:''}/>
            )}
        </div>
    )
}
const renderInputFile = ({textButton,primary,id}:FormComponent) =>{
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [fileName,setFileName] = useState<string>('(Imagen sin seleccionar)');
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [showImage, setShowImage] = useState<Boolean>(false);

    const handleOnButtonClick = (event:React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLElement, MouseEvent>) =>{
        event.preventDefault();
        if(inputFileRef.current){
            inputFileRef.current.click() 
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (imageURL) {
            URL.revokeObjectURL(imageURL);
        }
        
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const url = URL.createObjectURL(file);
            setImageURL(url);
        } else {
            setFileName('(Imagen sin seleccionar)');
            setImageURL(null);
        }
    };
    
    return(
        <>
            <Input ref={inputFileRef} type='file' accept='image/*' id={id} $notDisplay className={`${styles.input} ${styles.margin}`} onChange={handleFileChange}/>
            <Button className={styles.margin} $primary={primary} onClick={handleOnButtonClick}>{textButton}</Button>
            <span onClick={() => setShowImage(!showImage) } style={{ userSelect:'none',cursor: imageURL?'pointer':'default'  }} >{` ${fileName}`}</span>
            {imageURL && <><br/><img className={`${showImage?styles.imgShow:styles.img} `} src={imageURL} alt="Imagen seleccionada" /></>}
            
        </>
    )
}

const renderInputNButton = ({readonly,onChange,text,value,textButton,primary,onClick,id}:FormComponent) =>{
    return(
        <>
            <Input id={id} readOnly={readonly} disabled={readonly} className={`${styles.input} ${styles.margin}`} onChange={onChange} placeholder={text?text[0]:''} defaultValue={value?value:''}/>
            <Button className={styles.margin} $primary={primary} onClick={onClick}>{textButton}</Button>
        </>
    )
}

const renderInputDate = ({readonly,onChange,value,id}:FormComponent) =>{
    
    return(
        <Input name={id} id={id} type='date' readOnly={readonly} min={"1800-01-01"} max={new Date().toISOString().split("T")[0]} disabled={readonly} className={`${styles.input} ${styles.margin}`} onChange={onChange}  defaultValue={new Date().toISOString().split("T")[0]}/>
    )
}
export default Form;