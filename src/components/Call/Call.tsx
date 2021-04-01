import React from "react";
import Peer from "simple-peer";
import { AudioContainer } from "./AudioContainer";
import { VideoContainer } from "./VideoContainer";

interface IProps {
  user: Peer.Instance;
  videos: MediaStream[];
}
export const Call = (props: IProps) => {
  return (
    <div>
      <VideoContainer videos={props.videos} user={props.user} />
      <AudioContainer user={props.user} />
    </div>
  );
};
