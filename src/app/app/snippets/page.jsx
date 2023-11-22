"use client";
import { Empty, Space } from "antd";
import React, { useContext, useState } from "react";
import { styled } from "styled-components";
import HeroBanner from "@/src/components/HeroBanner";
import SimpleFilterTabs from "@/src/components/SimpleFilterTabs";
import SnippetCard from "./SnippetCard";
import { routeNames } from "@/src/constants/constants";
import { sanityClient } from "@/src/helpers/sanityClient";
import { snippetsQuery } from "@/src/helpers/sanityQueries";
import { GlobalContext } from "@/src/context/context";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import isEmpty from "lodash/isEmpty";
import ResultDisplay from "@/src/components/ResultDisplay";

const Snippets = () => {
  const [selectedTopTab, setSelectedTopTab] = useState("all");
  const [selectedBottomTab, setSelectedBottomTab] = useState();
  const { currentUser } = useContext(GlobalContext);

  const fetchSnippets = async (userId) => {
    const query = snippetsQuery(userId);
    try {
      const results = await sanityClient.fetch(query);
      return results;
    } catch (error) {
      throw Error(error);
    }
  };

  const fetchFavSnippets = () => {
    return currentUser?.fav_snippets;
  };

  const getSelectedTabDetails = (tab) => {
    switch (tab) {
      case "my-favorites":
        return {
          queryKey: "my-favorites",
          queryFn: () => fetchFavSnippets(),
        };
      case "all":
        return {
          queryKey: "snippets",
          queryFn: () => fetchSnippets(currentUser._id),
        };
      default:
        return {
          queryKey: "snippets",
          queryFn: () => fetchSnippets(currentUser._id),
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
            title={"Error fetching snippets!"}
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
              <SnippetCard item={item} key={item._id} />
            ))}
          </Space>
        )}
      </div>
    );
  };

  return (
    <SnippetsView>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <HeroBanner />
        <ContentWrapper>
          <SimpleFilterTabs
            topTabList={[
              { name: "All", id: "all" },
              { name: "My favorites", id: "my-favorites" },
            ]}
            bottomTabList={[]}
            title="Snippet"
            selectedTopTab={selectedTopTab}
            selectedBottomTab={selectedBottomTab}
            setSelectedBottomTab={setSelectedBottomTab}
            setSelectedTopTab={setSelectedTopTab}
            createItemUrl={`${routeNames.SNIPPETS}/create-snippet`}
          />
          <SnippetsWrapper>{renderContent()}</SnippetsWrapper>
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

const SnippetsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export default Snippets;
