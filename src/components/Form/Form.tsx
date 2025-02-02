import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler, FieldValues, Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { BriefingErrorTypes, BriefingFormData, ReportTypes } from '../../types/form';
import { Loader } from 'lucide-react';
import clsx from 'clsx';
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";
import { useTranslation } from 'react-i18next';
import InputGroup from '../InputGroup/InputGroup';
import { fetchJSONRPC } from '../../services/api';
import { QueryParams } from '../../types/api';
import { useFormData } from '../../context/FormData';

function Form() {
    const { t } = useTranslation();
    const { updateFormData } = useFormData();
    const [isLoading, setIsLoading] = useState(false);

    const airportsRegex = /^(?:[A-Z]{4})(?: [A-Z]{4})*$/;
    const countriesRegex = /^(?:[A-Z]{2})(?: [A-Z]{2})*$/;
    const [inputGroupErrors, setInputGroupErrors] = useState<FieldErrors<FieldValues>>({});

    const ReportTypesCheckboxOptions = [
        { label: t('METAR'), value: ReportTypes.METAR },
        { label: t('SIGMET'), value: ReportTypes.SIGMET },
        { label: t('TAF'), value: ReportTypes.TAF },
    ];


    const methods: UseFormReturn<BriefingFormData> = useForm<BriefingFormData>({
        defaultValues: {
            reportTypes: [],
            countries: '',
            stations: ''
        },
        resolver: async (values) => {
            const errors: FieldErrors<FieldValues> = {};
            const groupResult = !!values.reportTypes?.length;

            if (!groupResult) {
                errors.reportTypes = {
                    type: BriefingErrorTypes.REPORT_TYPES,
                    message: t('validation.reportTypesRequired')
                };
            }
            else {
                delete errors.reportTypes;
            }
            if ((values.stations === '' || !values.stations.match(airportsRegex))) {
                errors.stations = {
                    type: BriefingErrorTypes.STATIONS,
                    message: t('validation.airportCountryRequired')
                };
            } else {
                delete errors.stations;
            }

            if ((values.countries === '' || !values.countries.match(countriesRegex))) {
                errors.countries = {
                    type: BriefingErrorTypes.COUNTRIES,
                    message: t('validation.airportCountryRequired')
                }
            } else {
                delete errors.countries;
            }
            const updatedErrors = Object.keys(errors).length > 1 ? errors : {}; //cleanup errors if no errors
            setInputGroupErrors(updatedErrors); //set errors to input group as a prop to rerender the whole input group
            return {
                values: values,
                errors: updatedErrors,
            };
        }
    });

    const onSubmit = async (data: BriefingFormData) => {
        setIsLoading(true);

        const stations = () => {
            if (data.stations !== "") {
                return data.stations.split(' ');
            }
            return [];
        }
        const countries = () => {
            if (data.countries !== "") {
                return data.countries.split(' ');
            }
            return [];
        }
        const reportTypes = data.reportTypes;

        const params: QueryParams[] = [
            {
                id: Date.now().toString(),
                reportTypes: reportTypes,
                ...(stations().length) && { stations: stations() },
                ...(countries().length) && { countries: countries() },
            },
        ]
        try {
            const response = await fetchJSONRPC(params);
            updateFormData('response', response);
        } catch (error) {
            console.error(error);
        } finally {
            methods.reset();
            setIsLoading(false);
        }
    };
    return (
        <FormProvider {...methods}>
            <div className="w-3/4 sm:w-full xxs:w-full flex items-center justify-center lg:px-8">
                <div className="md:w-1/2 sm:w-3/4 xxs:w-full bg-gray-300 p-8 rounded-xl shadow-lg">
                    <div>
                        <h2 className="mt-6 text-center text-2xl font-regular text-gray-900">
                            {t('flightBriefing')}
                        </h2>
                    </div>

                    <form className="mt-20 space-y-4" onSubmit={methods.handleSubmit(onSubmit as SubmitHandler<FieldValues>)} >
                        <div className="w-full flex md:flex-row sm:flex-col xxs:flex-col">
                            <div className="flex md:w-1/3 sm:w-1/2 xxs:w-full">
                                {t('messageTypes')}
                            </div>
                            <div className="flex 2xl:w-2/3 md:w-2/3 sm:w-1/2 xxs:w-full">
                                <CheckboxGroup name="reportTypes" options={ReportTypesCheckboxOptions} control={methods.control as unknown as Control<FieldValues>} />
                            </div>
                        </div>
                        <div className="w-full flex flex-row">
                            <InputGroup
                                errors={inputGroupErrors}
                                control={methods.control as unknown as Control<FieldValues>}
                                trigger={methods.trigger}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={clsx(
                                    "w-1/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white",
                                    isLoading
                                        ? "bg-blue-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                )}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader className="animate-spin ml-1 mr-3 h-5 w-5" />
                                        {t('processing')}
                                    </>
                                ) : (
                                    t('createBriefing')
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div >
        </FormProvider >
    );
}

export default Form;