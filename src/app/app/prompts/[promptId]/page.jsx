"use client";
import BackButton from "@/src/components/BackButton";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import ResultDisplay from "@/src/components/ResultDisplay";
import { GlobalContext } from "@/src/context/context";
import { sanityClient } from "@/src/helpers/sanityClient";
import { promptQuery } from "@/src/helpers/sanityQueries";
import { showMessage } from "@/src/services/uiServices";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Col,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import lowerCase from "lodash/lowerCase";
import isEmpty from "lodash/isEmpty";
import React, { useState, useContext, useEffect } from "react";
import { styled } from "styled-components";
import capitalize from "lodash/capitalize";

const CreateOrViewOrEditPrompt = ({ params }) => {
  const [form] = Form.useForm();
  const { promptId } = params;
  const { currentUser } = useContext(GlobalContext);
  const [editorLanguages, setEditorLanguages] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`prompt-${promptId}`],
    queryFn: () => fetchPromptData(promptId),
    enabled: promptId !== "create-prompt",
  });

  const isNew = promptId === "create-prompt";
  const isEdit = currentUser._id === data?.creator._id;
  const isNewOrisEdit = isNew || isEdit;

  const fetchPromptData = async (promptId) => {
    const query = promptQuery(promptId);
    try {
      const res = await sanityClient.fetch(query);
      console.log(res);
      return res[0];
    } catch (error) {
      throw Error(error);
    }
  };

  const createPrompt = async (promptDoc) => {
    await sanityClient
      .create(promptDoc)
      .then((result) => {
        console.log(result);
        showMessage({
          messageType: "success",
          content: "Prompt created successfully",
        });
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
        showMessage({
          messageType: "error",
          content: "Prompt could not be created! Try again",
        });
      });
  };
  const updatePrompt = async (promptDoc) => {
    await sanityClient
      .createOrReplace(promptDoc)
      .then((result) => {
        console.log(result);
        showMessage({
          messageType: "success",
          content: "Prompt created successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        showMessage({
          messageType: "error",
          content: "Prompt could not be created! Try again",
        });
      });
  };

  const onFinish = (values) => {
    const doc = {
      _type: "prompt",
      ...values,
      creator: {
        _type: "user",
        _ref: currentUser._id,
      },
    };

    if (isEdit) {
      doc["_id"] = promptId;
    }

    console.log(doc);

    isNew ? createPrompt(doc) : isEdit ? updatePrompt(doc) : null;
  };

  const onFinishFailed = (errorInfo) => {
    // message.error(`Authentication failed!`);
    showMessage({
      messageType: "error",
      content: "Prompt could not be created! Try again",
    });
  };

  const [selectedLanguage, setSelectedLanguage] = useState(
    !isEmpty(data) && !isNew ? data.language : ""
  );

  useEffect(() => {
    if (!isEmpty(data) && !isNew) setSelectedLanguage(data.language);
  }, [data]);

  return (
    <CreatePromptWrapper>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <ResultDisplay
          title={"Error fetching prompt data!"}
          status={"error"}
          subTitle={"Try refreshing the page!"}
        />
      ) : isEmpty(data) && !isNew ? (
        <Empty />
      ) : (
        <>
          <MainAreaWrapper>
            <Form
              form={form}
              name="create-prompt-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
              layout="vertical"
              style={{ width: "100%" }}
            >
              <TitleWrapper>
                <Space size="small">
                  <BackButton />
                  <h3>{isNew ? "Create Prompt" : data.promptName}</h3>
                  {!isNew && (
                    <span>
                      <small>by </small>
                      <Avatar
                        size={"small"}
                        src={data.creator.userImg}
                        alt={data.creator.username}
                      />{" "}
                      <small>{data.creator.username}</small>
                    </span>
                  )}
                </Space>
                <Space size="small">
                  {isNewOrisEdit && (
                    <Button className="btn-save" htmlType="submit">
                      Save prompt
                    </Button>
                  )}
                </Space>
              </TitleWrapper>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Prompt name"
                    name="promptName"
                    initialValue={!isNew ? data.promptName : ""}
                    rules={[
                      {
                        required: true,
                        message: "Invalid prompt name",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input
                      // value={!isNew ? data.promptName : ""}
                      placeholder="What does your prompt do?"
                      readOnly={!isNewOrisEdit}
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Tag"
                    name="tag"
                    initialValue={!isNew ? data.tag : ""}
                  >
                    <Input
                      placeholder="Add related tags"
                      readOnly={!isNewOrisEdit}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Status"
                    name="status"
                    initialValue={!isNew ? data.status : "public"}
                    rules={[
                      {
                        required: true,
                        message: "Invalid status",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select prompt status"
                      disabled={!isNewOrisEdit}
                      options={[
                        {
                          label: "Public",
                          value: "public",
                        },
                        {
                          label: "Private",
                          value: "private",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Description"
                name="notes"
                initialValue={!isNew ? data.notes : ""}
                rules={[
                  {
                    required: true,
                    message: "Invalid description",
                    whitespace: true,
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Add any notes related to the code"
                  rows={10}
                  readOnly={!isNewOrisEdit}
                />
              </Form.Item>
            </Form>
            <Button className="run-prompt-btn">Run prompt</Button>
          </MainAreaWrapper>
        </>
      )}
    </CreatePromptWrapper>
  );
};

const CreatePromptWrapper = styled.section`
  width: 100%;
  padding: 2rem;

  & .run-prompt-btn {
    background: ${({ theme }) => theme.primaryColor};
    border: none;
    color: #ffffff;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  & .btn-save {
    background: ${({ theme }) => theme.success};
    border: none;
    color: #ffffff;
  }

  & .btn-save:hover {
    color: #ffffff;
  }

  & h3 {
    font-size: 20px;
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
  & select,
  & textarea,
  & .select {
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

  /* & input::placeholder {
    color: ${({ theme }) => theme.textColor2};
  } */
`;

export default CreateOrViewOrEditPrompt;
