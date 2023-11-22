"use client";
import BackButton from "@/src/components/BackButton";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import MonacoEditor from "@/src/components/MonacoEditor";
import ResultDisplay from "@/src/components/ResultDisplay";
import { GlobalContext } from "@/src/context/context";
import { sanityClient } from "@/src/helpers/sanityClient";
import { snippetQuery } from "@/src/helpers/sanityQueries";
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

const CreateOrViewOrEditSnippet = ({ params }) => {
  const [form] = Form.useForm();
  const { snippetId } = params;
  const { currentUser } = useContext(GlobalContext);
  const [editorLanguages, setEditorLanguages] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`snippet-${snippetId}`],
    queryFn: () => fetchSnippetData(snippetId),
    enabled: snippetId !== "create-snippet",
  });

  const isNew = snippetId === "create-snippet";
  const isEdit = currentUser._id === data?.creator._id;
  const isNewOrisEdit = isNew || isEdit;
  const fetchSnippetData = async (snippetId) => {
    const query = snippetQuery(snippetId);
    try {
      const res = await sanityClient.fetch(query);
      console.log(res);
      return res[0];
    } catch (error) {
      throw Error(error);
    }
  };

  const createSnippet = async (snippetDoc) => {
    await sanityClient
      .create(snippetDoc)
      .then((result) => {
        console.log(result);
        showMessage({
          messageType: "success",
          content: "Snippet created successfully",
        });
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
        showMessage({
          messageType: "error",
          content: "Snippet could not be created! Try again",
        });
      });
  };
  const updateSnippet = async (snippetDoc) => {
    await sanityClient
      .createOrReplace(snippetDoc)
      .then((result) => {
        console.log(result);
        showMessage({
          messageType: "success",
          content: "Snippet updated successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        showMessage({
          messageType: "error",
          content: "Snippet could not be updated! Try again",
        });
      });
  };

  const onFinish = (values) => {
    const doc = {
      _type: "snippet",
      ...values,
      creator: {
        _type: "user",
        _ref: currentUser._id,
      },
    };

    if (isEdit) {
      doc["_id"] = snippetId;
    }

    console.log(doc);

    isNew ? createSnippet(doc) : isEdit ? updateSnippet(doc) : null;
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
    <CreateSnippetWrapper>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <ResultDisplay
          title={"Error fetching snippet data!"}
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
              <TitleWrapper>
                <Space size="small">
                  <BackButton />
                  <h3>{isNew ? "Create Snippet" : data.snippetName}</h3>
                </Space>
                <Space size="small">
                  {isNewOrisEdit && (
                    <Button className="btn-save" htmlType="submit">
                      Save snippet
                    </Button>
                  )}
                </Space>
              </TitleWrapper>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label="Snippet name"
                    name="snippetName"
                    initialValue={!isNew ? data.snippetName : ""}
                    rules={[
                      {
                        required: true,
                        message: "Invalid snippet name",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input
                      // value={!isNew ? data.snippetName : ""}
                      placeholder="What does your snippet do?"
                      readOnly={!isNewOrisEdit}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Language"
                    name="language"
                    initialValue={
                      !isNew ? lowerCase(data.language) : "javascript"
                    }
                    rules={[
                      {
                        required: true,
                        message: "Invalid language",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select your language"
                      showSearch
                      disabled={!isNewOrisEdit}
                      options={editorLanguages?.map((lang) => ({
                        label: capitalize(lang.id),
                        value: lang.id,
                      }))}
                      onChange={(e) => setSelectedLanguage(e)}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
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
                <Col span={6}>
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
                      placeholder="Select snippet status"
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
                label="Code"
                name="code"
                initialValue={!isNew ? data.code : ""}
                rules={[
                  {
                    required: true,
                    message: "Invalid code",
                    whitespace: true,
                  },
                ]}
              >
                <MonacoEditor
                  value={form.getFieldValue("code")}
                  handleEditorChange={(e) => form.setFieldValue("code", e)}
                  language={selectedLanguage}
                  canEdit={isNewOrisEdit}
                  setEditorLanguages={setEditorLanguages}
                />
              </Form.Item>
              <Form.Item
                label="Notes"
                name="notes"
                initialValue={!isNew ? data.notes : ""}
              >
                <Input.TextArea
                  placeholder="Add any notes related to the code"
                  rows={10}
                  readOnly={!isNewOrisEdit}
                />
              </Form.Item>
            </Form>
          </MainAreaWrapper>
        </>
      )}
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

export default CreateOrViewOrEditSnippet;
