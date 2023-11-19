"use client";
import { Button, Row, Space } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import IconifyIcon from "./IconifyIcon";
import { useRouter } from "next/navigation";

const SimpleFilterTabs = (props) => {
  const {
    topTabList,
    bottomTabList,
    title,
    selectedTopTab,
    selectedBottomTab,
    setSelectedTopTab,
    setSelectedBottomTab,
    createItemUrl,
  } = props;

  const router = useRouter();

  return (
    <TabsView>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <TopTabsView>
          <Space direction="horizontal" size="middle">
            {topTabList.map((item) => (
              <ModifiedButton
                key={item.id}
                onClick={() => setSelectedTopTab(item.id)}
                className={selectedTopTab === item.id ? "active" : ""}
              >
                {item.name}
              </ModifiedButton>
            ))}
          </Space>
          <Row>
            <ModifiedButton
              onClick={() => router.push(createItemUrl)}
              icon={<IconifyIcon name="solar:add-circle-bold" />}
            >
              New {title}
            </ModifiedButton>
          </Row>
        </TopTabsView>
        {selectedTopTab === "my-snippets" && (
          <BottomTabsView>
            <Space direction="horizontal" size="middle">
              {bottomTabList.map((item) => (
                <ModifiedButton key={item.id}>{item.name}</ModifiedButton>
              ))}
            </Space>
          </BottomTabsView>
        )}
      </Space>
    </TabsView>
  );
};

const TabsView = styled.div`
  width: 100%;
  margin-bottom: 20px;

  .active {
    background-color: ${({ theme }) => theme.primaryColor};
    color: #fff;
  }
`;
const TopTabsView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

const ModifiedButton = styled(Button)`
  display: flex;
  align-items: center;
  margin-bottom: 0;
`;

const BottomTabsView = styled.div`
  width: 100%;
`;
export default SimpleFilterTabs;
