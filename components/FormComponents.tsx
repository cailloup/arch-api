import { useRef, useState } from "react";
import { Button, Input, Select } from "./assets";
import styles from '@/styles/form.module.sass'

type ComponentProps = {
    id:string;
}
type InputComponentProps = {
    label:string;
    placeHolder: string[];
    defaultValue?: string;
    onChange?: () => void;
    required?: boolean;
    readOnly?: boolean;
}& ComponentProps;

type ButtonComponentProps = {
    onClick: () => void;
    id:string;
    primary?:boolean;
    text:string;
}& ComponentProps;

type InputFileComponentProps ={
    label:string;
    textButton: string;
    primary?: boolean;
    defaultValue?: string;
}& ComponentProps;

type SelectComponentProps ={
    label:string;
    options: string[];
    defaultValue?: string;
}& ComponentProps;

type InputDateComponentProps ={
    label:string;
    defaultValue?:string;
    min:string;
    max:string;
    
}& ComponentProps;

export interface Component{
    props:ComponentProps;
    render: () =>  React.JSX.Element;
}

export class ButtonComponent implements Component{
    props:ButtonComponentProps;

    constructor(props:ButtonComponentProps) {
        this.props = props
    }

    render = (): React.ReactElement => {
        return (
            <div className={styles.componentPadding}>
                <Button className={styles.margin} $primary={this.props.primary} onClick={this.props.onClick}>{this.props.text} </Button>
                <br/>
            </div>
        )
    };
}

export class InputComponent implements Component {
    props:InputComponentProps;
  
    constructor(props: InputComponentProps) {
      this.props = props;
    }
  
    render = (): React.ReactElement => {
      return (
        <ComponentWrapper label={this.props.label}>

        <div className={styles.grid} style={{gridTemplateColumns:`repeat(${this.props.placeHolder?.length},1fr)` }} >
            {this.props.placeHolder?.map( (placeHolder,index) =>
                <Input
                key={`${this.props.id} ${index}`}
                id={`${this.props.id} ${index}`}
                required={this.props.required}
                readOnly={this.props.readOnly}
                disabled={this.props.readOnly}
                className={`${styles.input}`}
                onChange={this.props.onChange}
                placeholder={placeHolder}
                defaultValue={this.props.defaultValue ? this.props.defaultValue : ''}
            />
            )}
        </div>
            
        </ComponentWrapper>
      );
    };
}

export class InputFileComponent implements Component {
    props:InputFileComponentProps;
  
    constructor(props: InputFileComponentProps) {
      this.props = props;
    }
  
    render = (): React.ReactElement => {
        const inputFileRef = useRef<HTMLInputElement>(null);
        const [fileName,setFileName] = useState<string>(this.props.defaultValue?'building.jpg':'(Imagen sin seleccionar)');
        const [imageURL, setImageURL] = useState<string | null | undefined>(this.props.defaultValue);
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



      return (
        <ComponentWrapper  label={this.props.label}>
            <Input ref={inputFileRef} type='file' accept='image/*' id={this.props.id} $notDisplay className={`${styles.input}`} onChange={handleFileChange}/>
            <Button $primary={this.props.primary} onClick={handleOnButtonClick}>{this.props.textButton}</Button>
            <span onClick={() => setShowImage(!showImage) } style={{ userSelect:'none',cursor: imageURL?'pointer':'default'  }} >{` ${fileName}`}</span>
            {imageURL && <><br/><img className={`${showImage?styles.imgShow:styles.img} `} src={imageURL} alt="Imagen seleccionada" /></>}   
        </ComponentWrapper>
      );
    };
}

export class SelectComponent implements Component {
    props:SelectComponentProps;
  
    constructor(props: SelectComponentProps) {
      this.props = props;
    }
  
    render = (): React.ReactElement => {
      return (
        <ComponentWrapper label={this.props.label}>
            <Select id={this.props.id} className={`${styles.input}`} defaultValue={this.props.defaultValue ? this.props.defaultValue : ''}>
                {this.props.options.map(option =>
                    <option key={option}>{option}</option>    
                )}
            </Select>
        </ComponentWrapper>
      );
    };
}

export class InputDateComponent implements Component{
    props:InputDateComponentProps;

    constructor(props:InputDateComponentProps) {
        this.props = props
    }

    render = (): React.ReactElement => {
        return (
            <ComponentWrapper label={this.props.label}>
                <Input id={this.props.id} type="date" className={styles.input} min={this.props.min} max={this.props.max} defaultValue={this.props.defaultValue ? this.props.defaultValue : ''}/>
            </ComponentWrapper>
        )
    };
}

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

