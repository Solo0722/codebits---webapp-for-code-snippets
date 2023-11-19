"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner";
import { routeNames, storageKeys } from "../constants/constants";
import { readFromLocalStorage } from "../services/storageService";
import { GlobalContext } from "../context/context";

const Landing = () => {
  const router = useRouter();
  const { currentUser } = useContext(GlobalContext);

  const redirectUser = () => {
    if (currentUser) {
      router.push(routeNames.BLOGS);
    } else {
      router.push(routeNames.AUTH);
    }
  };

  useEffect(() => redirectUser, []);

  return (
    <center
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <LoadingSpinner />
    </center>
  );
};

export default Landing;
