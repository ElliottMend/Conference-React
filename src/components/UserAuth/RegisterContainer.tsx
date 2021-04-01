import { axiosInstance } from "../../App";
import React, { useState } from "react";
import { Register } from "./Register";
export interface IState {
  username: string;
  password: string;
  email: string;
}
export const RegisterContainer = () => {
  const [state, setState] = useState<IState>({
    username: "",
    password: "",
    email: "",
  });
  const RegisterSubmit = (e: any) => {
    e.preventDefault();
    axiosInstance
      .post("/auth/register", {
        username: state.username,
        password: state.password,
        email: state.email,
      })
      .then(() => {
        setState({
          username: "",
          password: "",
          email: "",
        });
      });
  };
  const changeRegister = (e: any) => {
    setState({ ...state, [e.currentTarget.id]: e.currentTarget.value });
  };
  return (
    <div>
      <Register
        state={state}
        registerSubmit={RegisterSubmit}
        changeRegister={changeRegister}
      />
    </div>
  );
};
