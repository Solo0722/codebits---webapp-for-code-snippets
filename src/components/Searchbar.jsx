import { Button, Input } from "antd";
import React from "react";
import { styled } from "styled-components";
import IconifyIcon from "./IconifyIcon";

const Searchbar = () => {
  return (
    <SearchbarWrapper>
      <Input
        className="search-input"
        rootClassName="search-input"
        placeholder="Search code snippets"
        styles={{
          input: {
            backgroundColor: "transparent",
          },
        }}
        suffix={
          <IconifyIcon
            name="solar:minimalistic-magnifer-outline"
            size={"12px"}
          />
        }
        // suffix={
        //   <Button type="text" size="small" style={{ margin: 0, padding: 0 }}>
        //     Search
        //   </Button>
        // }
      />
    </SearchbarWrapper>
  );
};

const SearchbarWrapper = styled.div`
  width: 30%;
  & .search-input {
    background-color: ${({ theme }) => theme.accentColor1};
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: none;
    outline: none;
    padding: 8px 12px;
    border-radius: 10px;
  }

  & .search-input::placeholder {
    color: ${({ theme }) => theme.textColor2};
  }
`;

export default Searchbar;
