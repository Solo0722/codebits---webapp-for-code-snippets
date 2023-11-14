"use client";
import Navbar from "@/src/components/Navbar";
import Sidebar from "@/src/components/Sidebar";
import React from "react";
import { styled } from "styled-components";

const MainLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <MainWrapper>
        <Navbar />
        <div className="content-wrapper">{children}</div>
      </MainWrapper>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const MainWrapper = styled.section`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  border-left: 0.5px solid ${({ theme }) => theme.accentColor1};
  background-color: ${({ theme }) => theme.bodyBackgroundColor};
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;

  & .content-wrapper {
    padding: 1rem;
  }
`;

export default MainLayout;
