import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, AppTheme } from './themes';

type ThemeContextType = {
  theme: AppTheme;
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);


  useEffect(() => {
    AsyncStorage.getItem('themeMode')
      .then((stored) => {
        if (stored !== null) setIsDark(stored === 'dark');
      })
      .catch(() => {});
  }, []);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const toggleTheme = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    AsyncStorage.setItem('themeMode', newValue ? 'dark' : 'light').catch(() => {});
  };

  const contextValue = useMemo(() => ({ theme, toggleTheme, isDark }), [theme, isDark]);
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
