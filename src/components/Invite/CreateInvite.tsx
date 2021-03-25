import React from "react";
import { axiosInstance } from "../../App";

export const CreateInvite = () => {
  const sendInvite = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={sendInvite}>
        <input />
        <button>Send Invite</button>
      </form>
    </div>
  );
};
