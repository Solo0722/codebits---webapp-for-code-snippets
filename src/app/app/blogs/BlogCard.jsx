import React from "react";
import styled from "styled-components";

const BlogCard = ({ item }) => {
  return <BlogCardWrapper></BlogCardWrapper>;
};

export default BlogCard;

const BlogCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  min-height: 400px;
  background-color: ${({ theme }) => theme.accentColor1};
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
`;
