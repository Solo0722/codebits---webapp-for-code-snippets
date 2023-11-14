"use client";
import React, { useContext, useState } from "react";
import AntStyledComponentsRegistry from "./AntRegistry";
import StyledComponentsRegistry from "./StyledComponentsRegistry";
import { ConfigProvider, theme } from "antd";
import { dm_sans } from "../theme/fontConfig";
import { darkTheme, defaultTheme, lightTheme } from "../theme/colors";
import { DARKTHEME, LIGHTTHEME } from "../constants/constants";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../theme/globalStyles";
import { GlobalContext } from "../context/context";

const RootLayoutProvider = ({ children }) => {
  const { appTheme } = useContext(GlobalContext);

  return (
    <AntStyledComponentsRegistry>
      <StyledComponentsRegistry>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: dm_sans.style.fontFamily,
              fontSize: 12,
              colorPrimary: defaultTheme.primaryColor,
              borderRadius: 7,
              boxShadow: 0,
            },
            components: {
              Button: {
                colorBgBase: defaultTheme.primaryColor,
                borderRadius: 7,
              },
            },
            algorithm:
              appTheme === LIGHTTHEME
                ? theme.defaultAlgorithm
                : theme.darkAlgorithm,
          }}
        >
          <ThemeProvider
            theme={appTheme === LIGHTTHEME ? lightTheme : darkTheme}
          >
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </ConfigProvider>
      </StyledComponentsRegistry>
    </AntStyledComponentsRegistry>
  );
};

export default RootLayoutProvider;
