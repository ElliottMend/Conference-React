import React from "react";
import { Sidebar } from "../Views/Sidebar";
import { UsersContainer } from "../Users/UsersContainer";
import ChatContainer from "../Chat/ChatContainer";
interface IProps {
  enterCall: () => void;
}
export const Server = (props: IProps) => {
  return (
    <div className="flex">
      <div className="flex-none">
        <Sidebar />
      </div>
      <div className="flex flex-grow flex-col">
        <div onClick={props.enterCall}>Start call</div>
        <ChatContainer />
      </div>
      <div className="flex-none">
        <UsersContainer />
      </div>
    </div>
  );
};
