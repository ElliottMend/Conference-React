import React from "react";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <div className="flex justify-center">
      <Link className="px-4" to={"/register"}>
        <div>Register</div>
      </Link>
      <Link className="px-4" to={"/login"}>
        <div>Login</div>
      </Link>
      <Link className="px-4" to={"/chat"}>
        <div>Chat</div>
      </Link>
    </div>
  );
};
