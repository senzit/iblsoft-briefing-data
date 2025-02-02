import { Controller, UseControllerProps, UseFormTrigger, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BriefingErrorTypes, LocalizationType } from "../../types/form";
import { ReactElement } from "react";


interface Props {
    control: UseControllerProps['control']
    trigger?: UseFormTrigger<any>
    errors: FieldErrors<any>
}

const InputGroup: React.FC<Props> = ({ errors, control, trigger }) => {
    const { t } = useTranslation();
    const fields = [{
        label: t("stations"),
        name: LocalizationType.STATIONS
    },
    {
        label: t("countries"),
        name: LocalizationType.COUNTRIES
    }]

    const renderOneError = (errors: FieldErrors<any> | undefined): ReactElement | null => {
        if (errors && Object.keys(errors).length > 0) {
            let relevantErrorsCount = Object.values(errors).filter((error) => {
                return error?.type === BriefingErrorTypes.STATIONS ||
                    error?.type === BriefingErrorTypes.COUNTRIES;
            }).length;
            if (relevantErrorsCount === 2) {
                const foundError = Object.values(errors).find((error) => {
                    return error?.type === BriefingErrorTypes.STATIONS ||
                        error?.type === BriefingErrorTypes.COUNTRIES;
                });
                return (foundError ? <div className="text-red-500 text-sm pt-1">{foundError?.message?.toString()}</div> : null)
            }
        }
        return null;
    }

    return (
        <div className="w-full">
            {fields.map((field, index) => (
                <Controller
                    key={`${field.name}.${index}`}
                    name={field.name}
                    control={control}
                    rules={{
                        validate: () => {
                            trigger?.([LocalizationType.STATIONS, LocalizationType.COUNTRIES]);
                            return true;
                        }
                    }}
                    render={({ field: formField }) => {
                        return (
                            <div className="flex md:flex-row xxs:flex-col  w-full p-1">
                                <label className="lg:w-1/3 md:w-1/3 xs:w-full xxs:w-full">{field.label}</label>
                                <input
                                    {...formField}
                                    className="md:w-2/3 xs:w-full xxs:w-full border p-1 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )
                    }}
                />
            ))}
            {renderOneError(errors)}
        </div>
    );
};

export default InputGroup;