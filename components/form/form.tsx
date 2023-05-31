import React, {useRef} from 'react';
import styles from '@/styles/form.module.sass'

type FormProps = React.HTMLProps<HTMLFormElement> & {
    onSubmit: (data: any) => void;
};

const Form: React.FC<FormProps> = ({onSubmit,children,...props }) =>{
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const data: any = Array.from(formRef.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input[id^="form_data_"], select[id^="form_data_"]') ?? [])
            .reduce((acc: any, element: HTMLInputElement | HTMLSelectElement) => {
                const componentname = element.name;
                const componentType = element.type;
            
                if (componentType == 'file') {
                if (element instanceof HTMLInputElement && element.files?.length) {
                    acc[componentname] = element.files[0];
                }
                } else {
                    acc[componentname] = acc[componentname]?acc[componentname] + ' ' + element.value: element.value;
                }
            
                return acc;
            }, {});
      
        onSubmit(data);
    };

    return (
        <form {...props} ref={formRef} onSubmit={handleSubmit} className={`${styles.form} ${props.className}`}>
            {children}
        </form>
    );
};

export default Form;