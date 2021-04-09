import React from "react";
import { IState } from "./UserAuthContainer";
interface IProps {
  changeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
  state: IState;
}
export const Register = (props: IProps) => {
  return (
    <div>
      <form className="bg-gray-100" onSubmit={props.submit}>
        <input
          data-testid="register-username"
          id="username"
          value={props.state.username}
          placeholder="username"
          onChange={props.changeInput}
          className="border-2"
        />
        <input
          data-testid="register-password"
          id="password"
          value={props.state.password}
          placeholder="password"
          onChange={props.changeInput}
          className="border-2"
        />
        <input
          data-testid="register-email"
          id="email"
          value={props.state.email}
          placeholder="email"
          onChange={props.changeInput}
          className="border-2"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
