"use client";
import IconifyIcon from "@/src/components/IconifyIcon";
import {
  DEFAULT_IMAGE_URI,
  routeNames,
  storageKeys,
} from "@/src/constants/constants";
import { GlobalContext } from "@/src/context/context";
import { sanityClient } from "@/src/helpers/sanityClient";
import { userQuery } from "@/src/helpers/sanityQueries";
import { saveToLocalStorage } from "@/src/services/storageService";
import { showMessage } from "@/src/services/uiServices";
import { dm_serif } from "@/src/theme/fontConfig";
import { Button, Divider, Form, Input, Space } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { styled } from "styled-components";
import { v4 } from "uuid";

const Signin = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  const { setCurrentUser } = useContext(GlobalContext);

  const signUserUp = async (formData) => {
    setLoading(true);
    const doc = {
      _id: v4(),
      _type: "user",
      ...formData,
      fav_snippets: [],
      fav_prompts: [],
      fav_blogs: [],
      userImg: DEFAULT_IMAGE_URI,
    };

    await sanityClient
      .createIfNotExists(doc)
      .then((result) => {
        setLoading(false);
        setCurrentUser(result);
        showMessage({
          messageType: "success",
          content: "Sign up successful",
        });
        router.push(routeNames.BLOGS);
      })
      .catch((err) => {
        setLoading(false);
        showMessage({
          messageType: "error",
          content: "Sign up failed. Try again",
        });
      });
  };

  const signUserIn = async (formData) => {
    setLoading(true);
    const query = userQuery(formData.email, formData.password);
    await sanityClient
      .fetch(query)
      .then((result) => {
        setLoading(false);
        setCurrentUser(result[0]);
        showMessage({
          messageType: "success",
          content: "Sign in successful",
        });
        router.push(routeNames.BLOGS);
      })
      .catch((err) => {
        setLoading(false);
        showMessage({
          messageType: "error",
          content: "Sign in failed. Try again",
        });
      });
  };

  const onFinish = async (values) => {
    console.log(values);
    isSignup ? signUserUp(values) : signUserIn(values);
  };

  const onFinishFailed = (errorInfo) => {
    showMessage({
      content: `Authentication failed! ${errorInfo}`,
      messageType: "error",
    });
  };

  const AuthDetailsSection = () => (
    <>
      {isSignup && (
        <Form.Item
          name={"username"}
          rules={[
            {
              required: true,
              message: "Invalid name",
              whitespace: true,
            },
          ]}
        >
          <Input className="input" placeholder={"Username"} />
        </Form.Item>
      )}

      <Form.Item
        name={"email"}
        rules={[
          {
            required: true,
            type: "email",
            message: "Invalid email",
            whitespace: true,
          },
        ]}
      >
        <Input className="input" placeholder={"Email"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Invalid password!",
            whitespace: true,
          },
        ]}
      >
        <Input.Password
          className="input"
          placeholder="Password"
          styles={{
            input: {
              backgroundColor: "transparent",
              fontSize: "12px",
            },
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          className="sign-in-button"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          {isSignup ? "Sign up" : "Sign in"}
        </Button>
      </Form.Item>
      <Form.Item>
        <small>
          {isSignup ? "Already have an account? " : "New to codebits?"}{" "}
          <span className="form-footer" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Sign in" : "Sign up"}
          </span>
        </small>
      </Form.Item>
    </>
  );

  return (
    <SigninWrapper>
      <LogoWrapper>
        <Space
          direction="horizontal"
          size="small"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Image src="/clickup.png" alt="clickup logo" width={20} height={20} />
          <h5>
            codebits<span className="logo-last">.dev</span>
          </h5>
        </Space>
      </LogoWrapper>
      {/* <BackButton
        buttonStyle={{ position: "absolute", top: "10px", left: "10px" }}
      /> */}
      <ContentWrapper>
        <HeroView></HeroView>
        <FormView>
          <FormWrapper>
            <Wrapper pageIndex={pageIndex}>
              <h3>
                {isSignup ? "Let's help you get started" : "Welcome back"}
              </h3>
              <Form
                form={form}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                layout="vertical"
              >
                {/* {pageIndex === 1 ? <AuthDetailsSection /> : <SignupComplete />} */}
                <Form.Item>
                  <ButtonsWrapper>
                    <Button className="google-btn">
                      <Image
                        width={15}
                        height={15}
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        loading="lazy"
                        alt="google logo"
                        style={{ marginRight: "0.5rem" }}
                      />
                      Login with Google
                    </Button>
                    <Button icon={<IconifyIcon name="icomoon-free:github" />}>
                      Login with Github
                    </Button>
                    <Button
                      icon={<IconifyIcon name="solar:user-circle-outline" />}
                      onClick={() => router.push(routeNames.BLOGS)}
                    >
                      Login as Guest
                    </Button>
                  </ButtonsWrapper>
                </Form.Item>
                <Divider plain orientation="center">
                  or
                </Divider>

                <AuthDetailsSection />
              </Form>
            </Wrapper>
          </FormWrapper>
        </FormView>
      </ContentWrapper>
    </SigninWrapper>
  );
};

const SigninWrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  width: 100%;
  /* height: 60px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 10px;
  left: 20px;

  & .logo-last {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const HeroView = styled.div`
  width: 60%;
  height: 100%;
  background-color: blue;
`;

const FormView = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
`;

const FormWrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  position: relative;
  /* background-color: ${({ theme }) => theme.accentColor2}; */

  & .input {
    background-color: transparent;
    border-radius: 7px;
    background-color: ${({ theme }) => theme.accentColor1};
    /* font-size: 12px; */
    padding: 8px 12px;
    border: none;
  }

  & .input::placeholder {
    font-size: 12px;
  }

  & .sign-in-button {
    font-size: 12px;
    border-radius: 7px;
    box-shadow: none;
    min-width: 100px;
  }

  & hr {
    background-color: ${({ theme }) => theme.textColor2};
    height: 0.1px;
    margin: 2rem 0;
    border: 0px solid ${({ theme }) => theme.textColor2};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;

  h3 {
    font-family: ${dm_serif.style.fontFamily};
    margin-bottom: 2rem;
    font-size: 1.5rem;
    /* font-size: 16px; */
    display: ${(props) => (props.pageIndex > 1 ? "none" : "block")};
  }

  form {
    width: 100%;
  }

  & .sign-up-btn-wrapper p {
    color: ${({ theme }) => theme.primaryColor};
    cursor: pointer;
  }

  & .sign-in-toggle-wrapper {
    position: absolute;
    bottom: 10px;
    padding: 1rem 0;
    font-size: 11px;
    cursor: pointer;
  }

  & .form-footer {
    color: ${({ theme }) => theme.primaryColor};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ButtonsWrapper = styled.div`
  /* margin-bottom: 1rem; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  & button {
    min-height: 40px;
    font-size: 12px;
    border-radius: 7px;
    box-shadow: none;
    min-width: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    margin-right: 1rem;
  }
`;

export default Signin;
