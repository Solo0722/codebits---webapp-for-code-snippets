"use client";
import BackButton from "@/src/components/BackButton";
import MonacoEditor from "@/src/components/MonacoEditor";
import { DARKTHEME } from "@/src/constants/constants";
import { GlobalContext } from "@/src/context/context";
import { Editor } from "@monaco-editor/react";
import { Button, Col, Form, Input, Row, Space } from "antd";
import React from "react";
import { useContext } from "react";
import { styled } from "styled-components";

const OptimizeCode = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    // message.error(`Authentication failed!`);
  };

  return (
    <CreateSnippetWrapper>
      <TitleWrapper>
        <Space size="small">
          <h3>Optimize Code</h3>
        </Space>
        <Space size="small"></Space>
      </TitleWrapper>
      <MainAreaWrapper>
        <Form
          form={form}
          name="create-snippet-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          layout="vertical"
          style={{ width: "100%" }}
        >
          {/* <Space
            direction="horizontal"
            size="small"
            style={{
              width: "100%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            
            <Form.Item label="Tags">
              <Input placeholder="Add related tags" />
            </Form.Item>
            <Form.Item label="Status">
              <Input placeholder="Select snippet status" />
            </Form.Item>
          </Space> */}
          <Form.Item label="Code">
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Form.Item style={{ flexGrow: 1 }}>
                <Input placeholder="Select code language" />
              </Form.Item>
              <MonacoEditor />
              <Button className="btn-save" htmlType="submit">
                Optimize
              </Button>
            </Space>
          </Form.Item>
          <Form.Item label="Output">
            <MonacoEditor />
          </Form.Item>
        </Form>
      </MainAreaWrapper>
    </CreateSnippetWrapper>
  );
};

const CreateSnippetWrapper = styled.section`
  width: 100%;
  padding: 2rem;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const MainAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  & form {
    width: 100%;
  }

  & input,
  & textarea {
    background-color: ${({ theme }) => theme.accentColor1};
    padding: 8px 12px;
    /* background: rgba(255, 255, 255, 0.05); */
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: none;
    outline: none;
    width: 100%;
    /* border-radius: 10px; */
  }

  & .btn-save {
    background: ${({ theme }) => theme.success};
    border: none;
    color: #ffffff;
  }

  & .btn-save:hover {
    color: #ffffff;
  }
  /* & input::placeholder {
    color: ${({ theme }) => theme.textColor2};
  } */
`;

export default OptimizeCode;
