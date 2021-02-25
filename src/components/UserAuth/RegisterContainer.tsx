import axios from "axios";
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
    axios({
      method: "POST",
      url: "http://localhost:5000/auth/register",
      data: {
        username: state.username,
        password: state.password,
        email: state.email,
      },
    }).then((res) => {
      console.log(res);
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
