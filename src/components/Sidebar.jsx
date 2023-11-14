"use client";
import { sidebarMenu } from "@/src/constants/constants";
import { Button, Space } from "antd";
import Image from "next/image";
import { styled } from "styled-components";
import IconifyIcon from "./IconifyIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();

  const [showFullSidebar, setShowFullSidebar] = useState(false);

  return (
    <SidebarWrapper showFullSidebar={showFullSidebar}>
      <LogoWrapper>
        <Image src="/clickup.png" alt="clickup logo" width={30} height={30} />

        {showFullSidebar && (
          <h4>
            codebits<span className="logo-last">.dev</span>
          </h4>
        )}
      </LogoWrapper>
      <LinksWrapper>
        {sidebarMenu.map((sidebarLink) => (
          <LinkWrapper
            key={sidebarLink.iconName}
            className={pathname == sidebarLink.route && "active"}
          >
            <Link href={sidebarLink.route} legacyBehavior>
              <Space direction="horizontal" size="large" className="spacer">
                <div className="icon-wrapper">
                  <IconifyIcon name={sidebarLink.iconName} />
                </div>
                {showFullSidebar && (
                  <p style={{ margin: 0, padding: 0 }}>{sidebarLink.name}</p>
                )}
              </Space>
            </Link>
          </LinkWrapper>
        ))}
      </LinksWrapper>
      <CollapseSidebarWrapper>
        <LinkWrapper onClick={() => setShowFullSidebar(!showFullSidebar)}>
          <Space direction="horizontal" size="large" className="spacer">
            <IconifyIcon name="solar:sidebar-minimalistic-outline" />
            {showFullSidebar && (
              <p style={{ margin: 0, padding: 0 }}>Collapse sidebar</p>
            )}
          </Space>
        </LinkWrapper>
      </CollapseSidebarWrapper>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  width: ${(props) => (props.showFullSidebar ? "240px" : "60px")};
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  transition: all 0.3s ease-in-out 0s;
  background-color: ${({ theme }) => theme.accentColor1};
  position: relative;
  transition: all 1s ease 0s;
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  & .logo-last {
    color: ${({ theme }) => theme.primaryColor};
  }

  & h4 {
    margin-left: 1rem;
  }
`;

const LinksWrapper = styled.div`
  width: 100%;

  & .active {
    background-color: ${({ theme }) => theme.primaryColor};
    color: #ffffff;
  }
`;

const LinkWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor2};

  & .spacer {
    padding: 10px;
    width: 100%;
  }

  & .icon-wrapper {
    /* padding: 0 1rem; */
  }
`;

const CollapseSidebarWrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
  position: absolute;
  bottom: 0px;

  & div {
    background: transparent !important;
  }
`;
export default Sidebar;
