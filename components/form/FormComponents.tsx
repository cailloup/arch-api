import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { Button, Input, Select } from "../assets";
import styles from '@/styles/form.module.sass'

type ButtonComponentProps = React.HTMLProps<HTMLDivElement> &{
    onClick: () => void;
    primary?:boolean;
    text:string;
    type: "button" | "submit" | "reset" | undefined;
    right?: boolean;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({onClick,primary,text,type,className,right,...props}) => {
    
    return(
        <div {...props} className={`${styles.componentPadding} ${className}`}>
            <Button type={type} className={` ${type==='submit'?styles.componentMargin:styles.margin}  ${right?styles.right:''}`} $primary={primary} onClick={onClick}>{text}</Button>
            <br/>
        </div>
    );
}

type InputComponentProps = {
    id:string;
    label:string;
    placeHolder: string[];
    defaultValue?: string[] | string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    readOnly?: boolean;
    value?: string;
    invisible?: boolean
}

export const InputComponent: React.FC<InputComponentProps> = ({id,label,placeHolder,defaultValue,onChange,required,readOnly,value,invisible,...props}) => {
    //TODO: revisar bien asunto value y defaultvalue
    return (
        <>
        {invisible?(
        <Input
            key={`${id}`}
            id={`form_data_${id}`}
            name={id}
            required={required}
            readOnly={readOnly}
            disabled={readOnly}
            className={`${styles.input}`}
            defaultValue={value}
            $notDisplay
         />):
        <ComponentWrapper label={label}>
            {value?
            <div className={styles.grid} style={{gridTemplateColumns:`repeat(${placeHolder?.length},1fr)` }} >
                {placeHolder?.map( (placeHolder,index) =>
                    <Input
                        key={`${id} ${index}`}
                        id={`form_data_${id} ${index}`}
                        name={id}
                        required={required}
                        readOnly={readOnly}
                        disabled={readOnly}
                        className={`${styles.input}`}
                        placeholder={placeHolder}
                        value = {value}
                        onChange={onChange}
                    />
                )}
             </div>
             :
            <div className={styles.grid} style={{gridTemplateColumns:`repeat(${placeHolder?.length},1fr)` }} >
                {placeHolder?.map( (placeHolder,index) =>
                    <Input
                        key={`${id} ${index}`}
                        id={`form_data_${id} ${index}`}
                        name={id}
                        required={required}
                        readOnly={readOnly}
                        disabled={readOnly}
                        className={`${styles.input}`}
                        placeholder={placeHolder}
                        defaultValue = {defaultValue instanceof Array? defaultValue[index]: defaultValue}
                    />
                )}
            </div>}
        </ComponentWrapper>}
        </>
    );
};

type InputFileComponentProps ={
    id:string;
    label:string;
    textButton: string;
    primary?: boolean;
    defaultValue?: string;
    required?: boolean;
}

export const InputFileComponent: React.FC<InputFileComponentProps> = ({id,label,defaultValue,textButton,primary,required,...props}) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [fileName,setFileName] = useState<string>(defaultValue?'building.jpg':'(Imagen sin seleccionar)');
    const [imageURL, setImageURL] = useState<string | null | undefined>(defaultValue);
    const [showImage, setShowImage] = useState<Boolean>(false);
    
    useEffect(()=>{
        setFileName(defaultValue?'building.jpg':'(Imagen sin seleccionar)')
        setImageURL(defaultValue)
    },[defaultValue])

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

  return (
    <ComponentWrapper  label={label}>
        <Input name={id} ref={inputFileRef} type='file' accept='image/*' id={`form_data_${id}`} $notDisplay className={`${styles.input}`} onChange={handleFileChange}/>
        <Button $primary={primary} onClick={handleOnButtonClick}>{textButton}</Button>
        <span onClick={() => setShowImage(!showImage) } style={{ userSelect:'none',cursor: imageURL?'pointer':'default'  }} >{` ${fileName}`}</span>
        {imageURL && <><br/><img className={`${showImage?styles.imgShow:styles.img} `} src={imageURL} alt="Imagen seleccionada" /></>}   
    </ComponentWrapper>
  );
};

type InputDateComponentProps ={
    id:string;
    label:string;
    defaultValue?:string;
    min:string;
    max:string;
}

export const InputDateComponent: React.FC<InputDateComponentProps> = ({id,label,defaultValue,min,max,...props}) => {
    
    return (
        <ComponentWrapper label={label}>
            <Input name={id} id={`form_data_${id}`} type="date" className={styles.input} min={min} max={max} defaultValue={defaultValue ? defaultValue : ''}/>
        </ComponentWrapper>
    );
};

type SelectComponentProps ={
    id:string;
    label:string;
    options: string[];
    defaultValue?: string;
}

export const SelectComponent: React.FC<SelectComponentProps> = ({id,label,options,defaultValue,...props}) => {
  
    return (
        <ComponentWrapper label={label}>
            <Select name={id} id={`form_data_${id}`} className={`${styles.input}`} defaultValue={defaultValue ? defaultValue : ''}>
                {options.map((option :string ) =>
                    <option key={option}>{option}</option>    
                )}
            </Select>
        </ComponentWrapper>
    );
};

type ComponentWrapperProps = React.PropsWithChildren<{
    label: string;
}>;
  
const ComponentWrapper: React.FC<ComponentWrapperProps> = ({ children, label}) => {
    
    return (
        <div className={styles.component}>
            <span  className={styles.label} >{label} </span> <br/>
            <div className={styles.margin }>   
                {children}
            </div>
        </div>
    );
};

