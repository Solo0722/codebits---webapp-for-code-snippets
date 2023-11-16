"use client";
import { Button, Empty, Result, Space } from "antd";
import React, { useState } from "react";
// import Lottie from "lottie-react";
// import emptyAnimation from "@/public/empty.json";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import { CREATESNIPPET, SIGNUP } from "@/src/constants/constants";
import BlogCard from "../blogs/BlogCard";
import HeroBanner from "@/src/components/HeroBanner";
import SimpleFilterTabs from "@/src/components/SimpleFilterTabs";

const MySnippets = () => {
  const [snippets, setSnippets] = useState([1]);
  const [selectedTopTab, setSelectedTopTab] = useState("all");
  const [selectedBottomTab, setSelectedBottomTab] = useState();

  const router = useRouter();

  const EmptySnippets = () => (
    <Result
      // status="404"
      title="No snippets!"
      subTitle="Sorry, you have not created any snippet yet."
      icon={
        <></>
        // <Lottie
        //   animationData={emptyAnimation}
        //   style={{ width: "200px", height: "200px", padding: 0, margin: 0 }}
        // />
      }
      extra={
        <Button type="primary" onClick={() => router.push(CREATESNIPPET)}>
          Create snippet
        </Button>
      }
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    />
  );

  const NotLoggedIn = () => (
    <Result
      // status="404"
      title="Not logged in!"
      subTitle="Sorry, you cannot create snippets as you have not created an account."
      // icon={
      // <Lottie
      //   animationData={emptyAnimation}
      //   style={{ width: "200px", height: "200px", padding: 0, margin: 0 }}
      // />
      // }
      extra={
        <Button type="primary" onClick={() => router.push(SIGNUP)}>
          Sign up
        </Button>
      }
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    />
  );

  return (
    <SnippetsView>
      <Space direction="vertical" size="large">
        <HeroBanner />
        <ContentWrapper>
          {/* <h4>Featured blogs</h4> */}
          <SimpleFilterTabs
            topTabList={[
              { name: "All", id: "all" },
              { name: "My snippets", id: "my-snippets" },
              { name: "Trending", id: "trending" },
              { name: "Popular", id: "popular" },
            ]}
            bottomTabList={[]}
            title="Snippet"
            selectedTopTab={selectedTopTab}
            selectedBottomTab={selectedBottomTab}
            setSelectedBottomTab={setSelectedBottomTab}
            setSelectedTopTab={setSelectedTopTab}
            createItemUrl={"/app/snippets/create-snippet"}
          />
          <SnippetsWrapper>
            {[...new Array(14)].map((item) => (
              <BlogCard {...item} key={item} />
            ))}
          </SnippetsWrapper>
        </ContentWrapper>
      </Space>
    </SnippetsView>
  );
};

const SnippetsView = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & h4 {
    margin-bottom: 10px;
  }
`;

const SnippetsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
`;

export default MySnippets;
