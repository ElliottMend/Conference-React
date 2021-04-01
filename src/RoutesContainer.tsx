import React, { useState, useEffect } from "react";
import { axiosInstance } from "./App";
import { Routes } from "./Routes";

export const RoutesContainer = () => {
  useEffect(() => {
    checkAuth();
  }, []);
  const [state, setState] = useState<boolean>(false);
  const checkAuth = async () => {
    // const res = await axiosInstance.get("/verify");
    // setState(res.status === 200 ? true : false);
  };
  return (
    <div>
      <Routes state={state} />
    </div>
  );
};
