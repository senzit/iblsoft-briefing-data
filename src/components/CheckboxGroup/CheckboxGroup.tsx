import { Controller, UseControllerProps } from "react-hook-form";
import { BriefingErrorTypes } from "../../types/form";

interface CheckboxOption {
    label: string;
    value: string;
}

interface CheckboxGroupProps {
    name: string;
    options: CheckboxOption[];
    control: UseControllerProps['control']
}

const CheckboxGroup = ({ name, options, control }: CheckboxGroupProps) => {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value = [], onChange }, fieldState: { error } }) => {
                const handleCheckboxChange = (checkedValue: string) => {
                    const newValues = value.includes(checkedValue)
                        ? value.filter((v: string) => v !== checkedValue)
                        : [...value, checkedValue];
                    onChange(newValues);
                };
                return (
                    <>
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-left lg:gap-8 md:gap-4 sm:gap-4 xxs:gap-2">
                                {options.map((option) => (
                                    <label key={option.value} className="flex items-center lg:space-x-3 md:space-x-1 sm:space-x-1 xs:space-x-1">
                                        <input
                                            type="checkbox"
                                            checked={value.includes(option.value)}
                                            onChange={() => handleCheckboxChange(option.value)}
                                            className="w-5 h-5"
                                        />
                                        <span>{option.label}</span>
                                    </label>
                                ))}

                            </div>
                            {(error && error.type === BriefingErrorTypes.REPORT_TYPES) && <div className="text-red-500 text-sm pt-1">{error.message}</div>}
                        </div>
                    </>
                );
            }}
        />
    );
};

export default CheckboxGroup;