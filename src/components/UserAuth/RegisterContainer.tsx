import React, { useState } from "react";
import { Register } from "./Register";
interface IState {
  username: String;
  password: String;
  email: String;
}
export const RegisterContainer = () => {
  const [state, setState] = useState<IState>({
    username: "",
    password: "",
    email: "",
  });
  const RegisterSubmit = (e: any) => {
    e.preventDefault();
  };
  const changeRegister = (e: any) => {
    setState({ ...state, [e.currentTarget.id]: e.currentTarget.value });
  };
  return (
    <div>
      <Register
        registerSubmit={RegisterSubmit}
        changeRegister={changeRegister}
      />
    </div>
  );
};
