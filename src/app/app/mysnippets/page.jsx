"use client";
import { Button, Empty, Result, Space } from "antd";
import React, { useState } from "react";
// import Lottie from "lottie-react";
// import emptyAnimation from "@/public/empty.json";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import { CREATESNIPPET, SIGNUP } from "@/src/constants/constants";

const MySnippets = () => {
  const [snippets, setSnippets] = useState([1]);

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
      icon={
        <Lottie
          animationData={emptyAnimation}
          style={{ width: "200px", height: "200px", padding: 0, margin: 0 }}
        />
      }
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

  return snippets.length === 0 ? (
    <EmptySnippets />
  ) : (
    <MySnippetsWrapper>
      <TitleWrapper>
        <h3>Snippets</h3>
        <Space size="small">
          <Button className="btn-save">New snippet</Button>
        </Space>
      </TitleWrapper>
    </MySnippetsWrapper>
  );
};

const MySnippetsWrapper = styled.section`
  width: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  & .btn-save {
    background: ${({ theme }) => theme.gradientColor};
    border: none;
    color: #ffffff;
  }

  & .btn-save:hover {
    color: #ffffff;
  }
`;

export default MySnippets;
