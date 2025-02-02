import { createContext, useState, useContext } from "react";

interface FormDataContextType {
    formData: Record<string, any>;
    updateFormData: (key: string, value: any) => void;
}

const FormDataContext = createContext<FormDataContextType>({} as FormDataContextType);

export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    const updateFormData = (key: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <FormDataContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};

export const useFormData = () => {
    return useContext(FormDataContext);
};