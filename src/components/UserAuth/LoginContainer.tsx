import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import { axiosInstance } from "../../App";
export interface IState {
  username: string;
  password: string;
}

export const LoginContainer = () => {
  useEffect(() => {});
  const [state, setState] = useState<IState>({ username: "", password: "" });
  const LoginSubmit = async (e: any) => {
    e.preventDefault();
    axiosInstance
      .post("/auth/login", {
        data: {
          username: state.username,
          password: state.password,
        },
      })
      .then(() => {
        setState({ username: "", password: "" });
      });
  };

  const changeLogin = (e: any) => {
    setState({ ...state, [e.currentTarget.id]: e.currentTarget.value });
  };
  return (
    <div>
      <Login
        state={state}
        LoginSubmit={LoginSubmit}
        changeLogin={changeLogin}
      />
    </div>
  );
};
