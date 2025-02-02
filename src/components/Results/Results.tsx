import React, { ReactNode } from 'react';
import { useFormData } from '../../context/FormData';
import { t } from 'i18next';

interface FormInputProps {
}
export type GroupedDataByStationId = {
  [stationId: string]: StationData[];
}

export type StationData = {
  placeId: string;
  queryType: string;
  receptionTime: string;
  refs: string[];
  reportTime: string;
  reportType: string;
  revision: string;
  stationId: string;
  text: string;
  textHTML: string;
}

export const Results: React.FC<FormInputProps> = () => {
  const { formData } = useFormData();

  const groupDataByStationId = (data: any) => {
    if (!data) return {};
    return data.reduce((acc: any, item: any) => {
      acc[item.stationId] = acc[item.stationId] || [];
      acc[item.stationId].push(item);
      return acc;
    }, {});
  }

  const groupedData: GroupedDataByStationId = groupDataByStationId(formData?.response);

  if (Object.keys(groupedData).length === 0) {
    return null;
  }


  const renderTableRows = (data: GroupedDataByStationId): ReactNode[] => {
    return Object.entries(data).map(([stationId, stationItems]: [string, StationData[]], index: number) => {
      return (
        <tbody key={`${stationId}-${index}`}>
          <tr className="flex flex-row w-full border border-gray-500 bg-gray-300">
            <td className="p-2 text-sm text-gray-900">{stationId}</td>
          </tr>
          {stationItems.map((item: StationData, index: number) => (
            <tr key={`${item.placeId}-${index}`} className="flex flex-row w-full border border-gray-500" >
              <td className="w-1/6 p-2 text-sm text-gray-900 border-r border-gray-500 break-words">
                {item.queryType}
              </td>
              <td className="w-1/6 p-2 text-sm text-gray-900 border-r border-gray-500 break-words">
                {item.receptionTime}
              </td>
              <td className="w-4/6 p-2 text-sm text-gray-900 break-words">
                {item.text}
              </td>
            </tr>
          ))}
        </tbody>
      )
    })
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      <table>
        <thead >
          <tr >
            <th className="p-4 text-2xl font-regular text-gray-900">{t('briefingData.results')}</th>
          </tr >
        </thead >
        {renderTableRows(groupedData)}
      </table >
    </div >
  );
}
