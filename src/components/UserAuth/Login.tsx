import React from "react";
import { IState } from "./LoginContainer";
interface IProps {
  changeLogin: (event: React.ChangeEvent<HTMLInputElement>) => void;
  LoginSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  state: IState;
}
export const Login = (props: IProps) => {
  return (
    <div>
      <form className="border-2 flex flex-col" onSubmit={props.LoginSubmit}>
        <label htmlFor="username">
          Username
          <input
            className="border"
            value={props.state.username}
            onChange={props.changeLogin}
            id="username"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            className="border"
            value={props.state.password}
            onChange={props.changeLogin}
            id="password"
          />
        </label>
        <button type="submit" className="bg-gray-100 border">
          Submit
        </button>
      </form>
    </div>
  );
};
