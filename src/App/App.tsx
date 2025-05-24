import React, { useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@config/i18n/index'; // tu configuración i18n
import { ThemeProvider } from '@themes/ThemeContext';
import "@/global.css"
import Main from './Main';


export default function App() {
  const [language, setLanguage] = useState('es'); 

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const changeLanguage = (lang: string) => setLanguage(lang);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Main changeLanguage={changeLanguage} currentLanguage={language} />
      </ThemeProvider>
    </I18nextProvider>
  );
}
