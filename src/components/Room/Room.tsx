import React from "react";
import ChatContainer from "../Chat/ChatContainer";
interface IProps {
  enterCall: () => void;
}
export const Room = (props: IProps) => {
  return (
    <div>
      <div onClick={props.enterCall}>Start call</div>
      <ChatContainer />
    </div>
  );
};
