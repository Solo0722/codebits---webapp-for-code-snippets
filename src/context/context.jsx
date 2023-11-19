"use client";
import React, { createContext, useState } from "react";
import { DARKTHEME, LIGHTTHEME, storageKeys } from "../constants/constants";
import useLocalStorage from "beautiful-react-hooks/useLocalStorage";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const isDarkTheme = global.window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [appTheme, setAppTheme] = useLocalStorage(
    storageKeys.APP_THEME,
    isDarkTheme ? DARKTHEME : LIGHTTHEME
  );

  const [currentUser, setCurrentUser] = useLocalStorage(storageKeys.USER, null);

  return (
    <GlobalContext.Provider
      value={{ appTheme, setAppTheme, currentUser, setCurrentUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
