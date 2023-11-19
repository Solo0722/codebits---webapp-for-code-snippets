import React, { useContext } from "react";
import { styled } from "styled-components";
import Searchbar from "./Searchbar";
import { Avatar, Button, Space } from "antd";
import IconifyIcon from "./IconifyIcon";
import { GlobalContext } from "../context/context";
import { DARKTHEME, LIGHTTHEME } from "../constants/constants";
import { dm_serif } from "@/src/theme/fontConfig";
import DropDownContainer from "./DropDownContainer";

const Navbar = () => {
  const { appTheme, setAppTheme, currentUser } = useContext(GlobalContext);

  const toggleTheme = () => {
    setAppTheme(appTheme === LIGHTTHEME ? DARKTHEME : LIGHTTHEME);
  };

  return (
    <NavbarWrapper>
      {/* <Searchbar /> */}
      <h3>Welcome back, {currentUser?.username.split(" ")[0]}</h3>
      <ToolsWrapper>
        {/* <DropDownContainer
          menu={[
            {
              label: "My profile",
              key: 0,
            },
            {
              label: "Log out",
              key: 1,
            },
          ]}
          showArrow={false}
        > */}
        <AvatarWrapper>
          <Space direction="horizontal" size={"small"}>
            <Avatar shape="square" src={currentUser?.userImg} />
            <Space size="0px" direction="vertical">
              <p>{currentUser?.username}</p>
              <small>{currentUser?.email}</small>
            </Space>
          </Space>
        </AvatarWrapper>
        {/* </DropDownContainer> */}
        <Button
          type="text"
          icon={
            <IconifyIcon
              name={
                appTheme === LIGHTTHEME
                  ? "line-md:sunny-filled-loop-to-moon-filled-loop-transition"
                  : "line-md:moon-filled-to-sunny-filled-loop-transition"
              }
            />
          }
          onClick={toggleTheme}
        />
      </ToolsWrapper>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.nav`
  width: 100%;
  height: 60px;
  padding: 1rem;
  border-bottom: 0.5px solid ${({ theme }) => theme.accentColor1};
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 10px; */
  /* box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05); */

  position: sticky;
  top: 0;
  z-index: 10;
  /* background-color: ${({ theme }) => theme.bodyBackgroundColor}; */
  -webkit-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
  /* background: rgba(255, 255, 255, 0.1); */
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & h3 {
    font-family: ${dm_serif.style.fontFamily};
  }
`;

const ToolsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  & button {
    /* background-color: ${({ theme }) => theme.accentColor1}; */
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-right: 3rem;
  cursor: pointer;

  & p {
    padding: 0rem;
    margin-bottom: -5px;
  }

  & small {
    padding: 0rem;
    margin: 0rem;
    color: ${({ theme }) => theme.textColor2};
  }
`;

export default Navbar;
