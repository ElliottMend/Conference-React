import React, { useState } from "react";
import { axiosInstance } from "../../App";
import { Register } from "./Register";
import { Login } from "./Login";
export interface IState {
  username: string;
  password: string;
  email?: string;
}
export const UserAuthContainer = () => {
  const [state, setState] = useState<IState>({
    username: "",
    password: "",
    email: "",
  });
  const componentPath = window.location.pathname.split("/")[2];

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance
      .post(`/auth/${componentPath}`, {
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
  const changeInput = (e: any) => {
    setState({ ...state, [e.currentTarget.id]: e.currentTarget.value });
  };
  return (
    <div>
      {componentPath === "Register" ? (
        <Register changeInput={changeInput} state={state} submit={submit} />
      ) : (
        <Login changeInput={changeInput} state={state} submit={submit} />
      )}
    </div>
  );
};
