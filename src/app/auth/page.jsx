"use client";
import IconifyIcon from "@/components/IconifyIcon";
import { DASHBOARD } from "@/constants/routeNames";
import { dm_serif } from "@/theme/fontConfig";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { styled } from "styled-components";

const Signin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(
    searchParams.get("type") === "signup"
  );

  const onFinish = async (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    // message.error(`Authentication failed!`);
  };

  const AuthDetailsSection = () => (
    <>
      {isSignup && (
        <Form.Item
          name={"full_name"}
          rules={[
            {
              required: true,
              message: "Invalid name",
              whitespace: true,
            },
          ]}
        >
          <Input className="input" placeholder={"Full Name"} />
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
      <Button
        type="ghost"
        shape="circle"
        icon={<IconifyIcon name={"solar:arrow-left-outline"} />}
        style={{ position: "absolute", top: "10px", left: "10px" }}
        onClick={() => router.back()}
      />
      <FormWrapper>
        <Wrapper pageIndex={pageIndex}>
          <h3>{isSignup ? "Let's help you get started" : "Welcome back"}</h3>
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
                  onClick={() => router.push(DASHBOARD)}
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

const FormWrapper = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  position: relative;
  background-color: ${({ theme }) => theme.accentColor2};

  & .input {
    background-color: transparent;
    border-radius: 7px;
    background-color: ${({ theme }) => theme.bodyBackgroundColor};
    /* font-size: 12px; */
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
