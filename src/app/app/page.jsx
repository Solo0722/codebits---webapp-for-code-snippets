"use client";
import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import BlogCard from "./blogs/BlogCard";
import HeroBanner from "@/src/components/HeroBanner";
import SimpleFilterTabs from "@/src/components/SimpleFilterTabs";
import { gql, useQuery } from "@apollo/client";

const Blogs = () => {
  const [selectedTopTab, setSelectedTopTab] = useState("all");
  const [selectedBottomTab, setSelectedBottomTab] = useState();

  const query = gql`
    query Feed($first: Int!, $after: String, $filter: FeedFilter) {
      feed(first: $first, after: $after, filter: $filter) {
        edges {
          node {
            title
            url
            url
            author {
              id
              name
              profilePicture
            }
            subtitle
            tags {
              name
            }
            coverImage {
              url
              isPortrait
            }
            id
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const API_KEY = "b020e8c0-9fb8-4070-bdd8-f3578e4f2765";

  // const fetchBlogs = async () => {
  //   try {
  //     const response = await fetch("https://gql.hashnode.com", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${API_KEY}`,
  //       },
  //       body: JSON.stringify({ feed: query, variables }),
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //     return data;
  //   } catch (error) {
  //     throw Error(error);
  //   }
  // };

  const { data, loading, error, fetchMore } = useQuery(query, {
    variables: {
      first: 20,
      filter: { type: "RECENT" },
    },
  });

  console.log("Data from query = ", data);

  return (
    <DashboardWrapper>
      <MainViewWrapper>
        <Space direction="vertical" size="large">
          <HeroBanner />
          <ContentWrapper>
            <SimpleFilterTabs
              topTabList={[
                { name: "All", id: "all" },
                { name: "My favorites", id: "my-favorites" },
              ]}
              bottomTabList={[]}
              title="Blog"
              selectedTopTab={selectedTopTab}
              selectedBottomTab={selectedBottomTab}
              setSelectedBottomTab={setSelectedBottomTab}
              setSelectedTopTab={setSelectedTopTab}
              createItemUrl={"/app/snippets/create-snippet"}
            />
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
