import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import { gql, useMutation, useQuery } from "@apollo/client";
import { client } from "../../index";
interface IState {
  username: String;
  password: String;
}
export const loginUser = gql`
  mutation TokenAuth {
    tokenAuth(username: $username, password: $password) {
      token
      payload
      refreshExpiresIn
    }
  }
`;
const getDataQuery = gql`
  query {
    AllChatMessages(room_id: 1) {
      user
    }
  }
`;
export const LoginContainer = () => {
  const { loading, error, data } = useQuery(getDataQuery);
  const [login] = useMutation(loginUser);
  useEffect(() => {
    console.log(data);
  });
  const [state, setState] = useState<IState>({ username: "", password: "" });
  const LoginSubmit = async (e: any) => {
    console.log("dsa");
    e.preventDefault();
    login({
      variables: { username: state.username, password: state.password },
    }).then((result) => {
      console.log(result);
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
