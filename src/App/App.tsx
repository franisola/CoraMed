import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "@redux/store"; // usando alias @ si tenés configurado

import { ToastProvider } from "react-native-toast-notifications";

import { I18nextProvider } from "react-i18next";
import i18n from "@config/i18n/index"; // tu configuración i18n
import { ThemeProvider } from "@themes/ThemeContext";
import "@/global.css";
import Main from "./Main";

export default function App() {
  const [language, setLanguage] = useState("es");

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const changeLanguage = (lang: string) => setLanguage(lang);

  return (
    <Provider store={store}>
      <ToastProvider
        placement="top"
        duration={3000}
        offset={50} // <- esto lo empuja debajo del notch/header
        animationType="slide-in"
        swipeEnabled={true}
        avoidKeyboard={true}
      >
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <Main changeLanguage={changeLanguage} currentLanguage={language} />
          </ThemeProvider>
        </I18nextProvider>
      </ToastProvider>
    </Provider>
  );
}
