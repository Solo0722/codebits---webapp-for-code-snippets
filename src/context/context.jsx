"use client";
import React, { createContext, useState } from "react";
import { DARKTHEME, LIGHTTHEME } from "../constants/constants";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const isDarkTheme = global.window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [appTheme, setAppTheme] = useState(
    isDarkTheme ? DARKTHEME : LIGHTTHEME
  );

  return (
    <GlobalContext.Provider value={{ appTheme, setAppTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
