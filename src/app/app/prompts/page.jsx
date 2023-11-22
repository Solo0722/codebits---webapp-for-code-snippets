"use client";
import { Empty, Space } from "antd";
import React, { useContext, useState } from "react";
import { styled } from "styled-components";
import HeroBanner from "@/src/components/HeroBanner";
import SimpleFilterTabs from "@/src/components/SimpleFilterTabs";
import { routeNames } from "@/src/constants/constants";
import { sanityClient } from "@/src/helpers/sanityClient";
import { GlobalContext } from "@/src/context/context";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import isEmpty from "lodash/isEmpty";
import ResultDisplay from "@/src/components/ResultDisplay";
import PromptCard from "./PromptCard";
import { promptsQuery } from "@/src/helpers/sanityQueries";

const Prompts = () => {
  const [selectedTopTab, setSelectedTopTab] = useState("all");
  const [selectedBottomTab, setSelectedBottomTab] = useState();
  const { currentUser } = useContext(GlobalContext);

  const fetchPrompts = async (userId) => {
    const query = promptsQuery(userId);
    try {
      const results = await sanityClient.fetch(query);
      console.log(results);
      return results;
    } catch (error) {
      throw Error(error);
    }
  };

  const fetchFavPrompts = () => {
    return currentUser?.fav_prompts;
  };

  const getSelectedTabDetails = (tab) => {
    switch (tab) {
      case "my-favorites":
        return {
          queryKey: "my-favorite-prompts",
          queryFn: () => fetchFavPrompts(),
        };
      case "all":
        return {
          queryKey: "prompts",
          queryFn: () => fetchPrompts(currentUser._id),
        };
      default:
        return {
          queryKey: "prompts",
          queryFn: () => fetchPrompts(currentUser._id),
        };
    }
  };

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [getSelectedTabDetails(selectedTopTab).queryKey],
    queryFn: getSelectedTabDetails(selectedTopTab).queryFn,
  });

  const renderContent = () => {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "200",
          display: "grid",
          placeItems: "center",
        }}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <ResultDisplay
            title={"Error fetching Prompts!"}
            status={"error"}
            subTitle={"Try refreshing the page!"}
          />
        ) : isEmpty(data) ? (
          <Empty />
        ) : (
          <Space
            direction="horizontal"
            size={"middle"}
            style={{
              width: "100%",
            }}
            wrap
          >
            {data.map((item) => (
              <PromptCard item={item} key={item._id} />
            ))}
          </Space>
        )}
      </div>
    );
  };

  return (
    <PromptsView>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <HeroBanner />
        <ContentWrapper>
          <SimpleFilterTabs
            topTabList={[
              { name: "All", id: "all" },
              { name: "My favorites", id: "my-favorites" },
            ]}
            bottomTabList={[]}
            title="Prompt"
            selectedTopTab={selectedTopTab}
            selectedBottomTab={selectedBottomTab}
            setSelectedBottomTab={setSelectedBottomTab}
            setSelectedTopTab={setSelectedTopTab}
            createItemUrl={`${routeNames.PROMPTS}/create-prompt`}
          />
          <PromptsWrapper>{renderContent()}</PromptsWrapper>
        </ContentWrapper>
      </Space>
    </PromptsView>
  );
};

const PromptsView = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & h4 {
    margin-bottom: 10px;
  }
`;

const PromptsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export default Prompts;
