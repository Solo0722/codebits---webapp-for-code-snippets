"use client";
import { Space } from "antd";
import React, { useState } from "react";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import HeroBanner from "@/src/components/HeroBanner";
import SimpleFilterTabs from "@/src/components/SimpleFilterTabs";
import PromptCard from "./PromptCard";

const Prompts = () => {
  const [prompts, setPrompts] = useState([]);
  const [selectedTopTab, setSelectedTopTab] = useState("all");
  const [selectedBottomTab, setSelectedBottomTab] = useState();

  const router = useRouter();

  return (
    <SnippetsView>
      <Space direction="vertical" size="large">
        <HeroBanner />
        <ContentWrapper>
          {/* <h4>Featured blogs</h4> */}
          <SimpleFilterTabs
            topTabList={[
              { name: "All", id: "all" },
              { name: "My prompts", id: "my-prompts" },
              { name: "My favorites", id: "my-favorites" },
            ]}
            bottomTabList={[]}
            title="Prompt"
            selectedTopTab={selectedTopTab}
            selectedBottomTab={selectedBottomTab}
            setSelectedBottomTab={setSelectedBottomTab}
            setSelectedTopTab={setSelectedTopTab}
            createItemUrl={"/app/snippets/create-snippet"}
          />
          <SnippetsWrapper>
            <Space
              direction="horizontal"
              size={"middle"}
              style={{
                width: "100%",
              }}
              wrap
            >
              {[...new Array(14)].map((item) => (
                <PromptCard {...item} key={item} />
              ))}
            </Space>
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

export default Prompts;
