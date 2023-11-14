"use client";
import { Editor } from "@monaco-editor/react";
import { Button, Col, Form, Input, Row, Space } from "antd";
import React from "react";
import { styled } from "styled-components";

const CreateSnippet = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    // message.error(`Authentication failed!`);
  };

  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
  }

  return (
    <CreateSnippetWrapper>
      <TitleWrapper>
        <h3>Create snippet</h3>
        <Space size="small">
          <Button type="text">Go back</Button>
          <Button className="btn-save">Save snippet</Button>
        </Space>
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
          <Space direction="horizontal" size="middle" style={{ width: "100%" }}>
            <Form.Item label="Snippet name" style={{ width: "800px" }}>
              <Input placeholder="What does your snippet do?" />
            </Form.Item>

            <Form.Item label="Language">
              <Input placeholder="Select your language" />
            </Form.Item>
            <Form.Item label="Tags">
              <Input placeholder="Add related tags" />
            </Form.Item>
          </Space>
          <Form.Item label="Code">
            <Editor
              height="400px"
              defaultLanguage="javascript"
              defaultValue="//Add your code here"
              theme="vs-dark"
              onChange={handleEditorChange}
            />
          </Form.Item>
          <Form.Item label="Notes">
            <Input.TextArea
              placeholder="Add any notes related to the code"
              rows={10}
            />
          </Form.Item>
        </Form>
      </MainAreaWrapper>
    </CreateSnippetWrapper>
  );
};

const CreateSnippetWrapper = styled.section`
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
    background-color: ${({ theme }) => theme.accentColor2};
    /* background: rgba(255, 255, 255, 0.05); */
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: none;
    outline: none;
    /* border-radius: 10px; */
  }

  /* & input::placeholder {
    color: ${({ theme }) => theme.textColor2};
  } */
`;

export default CreateSnippet;
