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
          placeholder="username"
          onChange={props.changeRegister}
          className="border-2"
        />
        <input
          placeholder="password"
          onChange={props.changeRegister}
          className="border-2"
        />
        <input
          placeholder="email"
          onChange={props.changeRegister}
          className="border-2"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
