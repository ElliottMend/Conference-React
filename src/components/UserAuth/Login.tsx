import React from "react";
interface IProps {
  changeLogin: (event: React.ChangeEvent<HTMLInputElement>) => void;
  LoginSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export const Login = (props: IProps) => {
  return (
    <div>
      <form className="border-2 flex flex-col" onSubmit={props.LoginSubmit}>
        <label htmlFor="username">
          Username
          <input
            className="border"
            onChange={props.changeLogin}
            id="username"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            className="border"
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
