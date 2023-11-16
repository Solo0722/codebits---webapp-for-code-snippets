"use client";

import { createGlobalStyle } from "styled-components";
import { dm_sans, urbanist } from "./fontConfig";

const GlobalStyles = createGlobalStyle`


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior:smooth;
}

body {
  width: 100%;
  height: 100%;
  background-color:${({ theme }) => theme.bodyBackgroundColor};
  color:${({ theme }) => theme.textColor};
  font-family:${dm_sans.style.fontFamily};
  font-weight:400;
  font-style:normal;
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
  transition:all 0.50s linear;
  scroll-behavior:smooth;
  overflow-x:hidden;
}


ion-icon {
    --ionicon-stroke-width: 10px;
    font-size: 16px;
  }

  button{
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:none;
  }


p,button{
  font-size:12px;
}

p{
  line-height:1.4rem;
}

small{
  font-size:10px;
}


::-webkit-scrollbar {
  width: 5px;
  height:5px;
}

::-webkit-scrollbar-track {

}

::-webkit-scrollbar-thumb {
  background-image: linear-gradient(to bottom,rgba(0,0,0,0.5),rgba(255,255,255,0.5));  border-radius:20px;
}

::-webkit-scrollbar-thumb:hover {

}
`;

export default GlobalStyles;
