import React from "react";
import Peer from "simple-peer";
import ChatContainer from "../Chat/ChatContainer";
import { IPeers } from "./CallContainer";
import { VideoContainer } from "./VideoContainer";
import { IStreams } from "./CallContainer";
interface IProps {
  users: IPeers;
  changeCall: () => void;
}
export const Call = (props: IProps) => {
  return (
    <div>
      <p onClick={props.changeCall}>End Call</p>
      <VideoContainer users={props.users} />;
      <ChatContainer />
    </div>
  );
};
