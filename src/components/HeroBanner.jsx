import React from "react";
import styled from "styled-components";
import Searchbar from "./Searchbar";

const HeroBanner = ({ title, subtitle, searchbarPlaceholder }) => {
  return (
    <HeroBannerView>
      <h3>Find blogs about tech here</h3>
      <p>
        From web dev, to backend, to cybersecurity, there's a place for you.
      </p>
      <Searchbar />
    </HeroBannerView>
  );
};

const HeroBannerView = styled.div`
  width: 100%;
  min-height: 300px;
  background-image: url("https://assets-global.website-files.com/623b578041aa1f5fc6e3adc2/623cd842bbbae02365201f3e_Identifying%20%26%20Assigning%20moderators.svg");
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h3 {
    text-align: center;
    color: #ffffff;
  }
  & p {
    font-size: 14px;
    margin: 10px 0;
    text-align: center;
    color: #ffffff;
  }
`;

export default HeroBanner;
