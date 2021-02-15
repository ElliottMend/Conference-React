import React, { useState } from "react";
import { Login } from "./Login";
import axios from "axios";
import { ApolloClient, InMemoryCache } from "@apollo/client";
interface IState {
  username: String;
  password: String;
}
export const LoginContainer = () => {
  const [state, setState] = useState<IState>({ username: "", password: "" });
  const LoginSubmit = (e: any) => {
    e.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      url: "http://localhost:8000/user/signin/",
      data: {
        username: "hfhfg",
        password: "hhfhfghgfh",
      },
    }).then((res) => {});
  };
  const changeLogin = (e: any) => {
    setState({ ...state, [e.currentTarget.id]: e.currentTarget.value });
  };
  return (
    <div>
      <Login LoginSubmit={LoginSubmit} changeLogin={changeLogin} />
    </div>
  );
};
