import IconifyIcon from "@/src/components/IconifyIcon";
import { routeNames } from "@/src/constants/constants";
import { defaultTheme } from "@/src/theme/colors";
import { Avatar, Button, Col, Space } from "antd";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const SnippetCard = ({ item }) => {
  const router = useRouter();

  return (
    <SnippetCardWrapper
      onClick={() => router.push(`${routeNames.SNIPPETS}/${item._id}`)}
    >
      <Space size={5} direction="vertical" style={{ width: "100%" }}>
        <div className="titlebar">
          <h4>{item.snippetName}</h4>
        </div>
        {item?.notes && <small>{item.notes.substring(0, 100)}</small>}
        <small>#{item.tag}</small>
        <div className="footerbar">
          <Space size={5} direction="horizontal">
            <Button
              icon={<IconifyIcon name={"solar:heart-outline"} />}
              shape="circle"
              type="text"
              // onClick={() => router.back()}
            />
            <Button
              icon={<IconifyIcon name={"solar:trash-bin-trash-bold"} />}
              shape="circle"
              type="text"
              styles={{
                icon: {
                  color: defaultTheme.danger,
                },
              }}
              // onClick={() => router.back()}
            />
          </Space>
          <small>{moment(item._createdAt).format("Do MMMM YYYY")}</small>
        </div>
      </Space>
    </SnippetCardWrapper>
  );
};

const SnippetCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 200px;
  background-color: ${({ theme }) => theme.accentColor1};
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  /* margin: 10px 0; */
  padding: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.001);
    box-shadow: rgba(100, 100, 111, 0.1) 0px 4px 4px 0px;
  }

  & .titlebar,
  & .footerbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  & small {
    color: ${({ theme }) => theme.textColor2};
  }

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default SnippetCard;
