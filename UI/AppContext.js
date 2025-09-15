import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { useTranslation } from "react-i18next";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { i18n } = useTranslation();

  // ✅ Dark/Light mode state
  const [isDarkMode, setIsDarkMode] = useState(
    Appearance.getColorScheme() === "dark"
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === "dark");
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // ✅ Language state
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ceb" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        language: i18n.language,
        toggleLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
