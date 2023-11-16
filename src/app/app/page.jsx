"use client";
import Searchbar from "@/src/components/Searchbar";
import { Space } from "antd";
import React from "react";
import { styled } from "styled-components";
import BlogCard from "./blogs/BlogCard";
import HeroBanner from "@/src/components/HeroBanner";

const Blogs = () => {
  return (
    <DashboardWrapper>
      <MainViewWrapper>
        <Space direction="vertical" size="large">
          <HeroBanner />
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
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MainViewWrapper = styled.section`
  width: 100%;
  height: 100%;
  /* padding: 1rem; */
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

const SideViewWrapper = styled.aside``;

export default Blogs;
