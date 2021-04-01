import React from "react";
import ChatContainer from "../Chat/ChatContainer";
interface IProps {
  enterCall: () => void;
}
export const Server = (props: IProps) => {
  return (
    <div>
      <div onClick={props.enterCall}>Start call</div>
      <ChatContainer />
    </div>
  );
};
