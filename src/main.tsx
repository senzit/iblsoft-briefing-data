import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Form from "./components/Form/Form";
import { Results } from "./components/Results/Results";
import './main.css';
import './i18n/config';
import { FormDataProvider } from './context/FormData';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormDataProvider>
      <div className="w-full h-full flex">
        <main className="flex justify-center items-center flex-wrap w-full m-10">
          <Form />
          <Results />
        </main>
      </div>

    </FormDataProvider>
  </StrictMode>
);
