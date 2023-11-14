"use client";
import Searchbar from "@/src/components/Searchbar";
import { Space } from "antd";
import React from "react";
import { styled } from "styled-components";

const Dashboard = () => {
  const BlogCard = () => <BlogCardWrapper></BlogCardWrapper>;

  return (
    <DashboardWrapper>
      <MainViewWrapper>
        <Space direction="vertical" size="large">
          <HeroBanner>
            <h3>Find blogs about tech here</h3>
            <p>
              From web dev, to backend, to cybersecurity, there's a place for
              you.
            </p>
            <Searchbar />
          </HeroBanner>
          <ContentWrapper>
            <h4>Featured blogs</h4>
            <BlogsWrapper>
              {[...new Array(14)].map((item) => (
                <BlogCard {...item} key={item} />
              ))}
            </BlogsWrapper>
          </ContentWrapper>
        </Space>
      </MainViewWrapper>
      <SideViewWrapper></SideViewWrapper>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.main`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MainViewWrapper = styled.section`
  width: 100%;
  height: 100%;
  /* padding: 1rem; */
`;

const HeroBanner = styled.div`
  width: 100%;
  min-height: 300px;
  background-image: url("https://assets-global.website-files.com/623b578041aa1f5fc6e3adc2/623cd842bbbae02365201f3e_Identifying%20%26%20Assigning%20moderators.svg");
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h3 {
    text-align: center;
    color:#ffffff;
  }
  & p {
    font-size: 14px;
    margin: 10px 0;
    text-align: center;
        color:#ffffff;

  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & h4 {
    margin-bottom: 10px;
  }
`;

const BlogsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
`;

const BlogCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  min-height: 400px;
  background-color: ${({ theme }) => theme.accentColor1};
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
`;

const SideViewWrapper = styled.aside``;

export default Dashboard;
