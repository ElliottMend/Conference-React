import React from "react";
interface IProps {
  changeRegister: (event: React.ChangeEvent<HTMLInputElement>) => void;
  registerSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export const Register = (props: IProps) => {
  return (
    <div>
      <form className="bg-gray-100" onSubmit={props.registerSubmit}>
        <input
          id="username"
          placeholder="username"
          onChange={props.changeRegister}
          className="border-2"
        />
        <input
          id="password"
          placeholder="password"
          onChange={props.changeRegister}
          className="border-2"
        />
        <input
          id="email"
          placeholder="email"
          onChange={props.changeRegister}
          className="border-2"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
