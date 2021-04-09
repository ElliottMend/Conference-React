import React from "react";
import { IState } from "./UserAuthContainer";
interface IProps {
  changeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
  state: IState;
}
export const Login = (props: IProps) => {
  return (
    <div>
      <form className="border-2 flex flex-col" onSubmit={props.submit}>
        <label htmlFor="username">
          Username
          <input
            data-testid="login-username"
            className="border"
            value={props.state.username}
            onChange={props.changeInput}
            id="username"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            data-testid="login-password"
            className="border"
            value={props.state.password}
            onChange={props.changeInput}
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
