import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import axios from "axios";
interface IState {
  username: String;
  password: String;
}

export const LoginContainer = () => {
  useEffect(() => {});
  const [state, setState] = useState<IState>({ username: "", password: "" });
  const LoginSubmit = async (e: any) => {
    e.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/auth/login",
      data: {
        username: state.username,
        password: state.password,
      },
    }).then((res) => {
      setState({ username: "", password: "" });
    });
  };

  const changeLogin = (e: any) => {
    console.log("fds");
    setState({ ...state, [e.currentTarget.id]: e.currentTarget.value });
  };
  return (
    <div>
      <Login LoginSubmit={LoginSubmit} changeLogin={changeLogin} />
    </div>
  );
};
