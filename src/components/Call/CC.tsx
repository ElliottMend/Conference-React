import React, { useState, useEffect, useRef, useContext } from "react";
import { socket } from "../WebSockets";
import Peer from "simple-peer";
import { StreamContext } from "../Context/StreamContext";
import { Call } from "./Call";
import adapter from "webrtc-adapter";
interface IProps {
  changeCall: () => void;
}
export interface IPeers {
  [sid: string]: { peer: Peer.Instance; user: string; stream?: MediaStream };
}
export interface IStreams {
  username: string;
  stream: MediaStream;
}

export const CC = () => {
  const UserStream = useContext(StreamContext);
  const peers = useRef<IPeers>({});
  const [users, setUsers] = useState<IPeers>(peers.current);
  const media = useRef<MediaStream | undefined>();

  const serverId = window.location.pathname.split("/")[2];
  useEffect(() => {
    setupSockets();
    socket.emit("join_call", { room: serverId });
  }, []);

  const setupSockets = async () => {
    media.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const player = document.getElementById("userVideo") as HTMLVideoElement;
    player.srcObject = media.current;
    player.autoplay = true;
    player.muted = true;
    socket.on("users_in_call", (userData: any) => {
      userData.users.forEach((user: any) => {
        createPeer(user);
      });
    });

    socket.on("user_signalled", (data: any) => {
      addPeer(data);
    });
  };

  const createPeer = (data: any) => {
    const peer = new Peer({ initiator: true, trickle: false });
    socket.on("returning_signal", (data: any) => {
      peer.signal(data.signal);
    });
    peer.on("signal", (signal) => {
      socket.emit("signal_user", { signal, user: data.sid });
    });
    const peerData = { [data.sid]: { peer, user: data.peer } };
    peerListeners(peerData);
    peers.current = { ...peers.current, ...peerData };
  };

  const addPeer = (data: any) => {
    const peer = new Peer({ trickle: false });
    peer.on("signal", (signal: any) => {
      socket.emit("return_signal", { signal, user: data.sid });
    });
    const peerData = { [data.sid]: { peer, user: data.peer } };
    peerListeners(peerData);
    peer.signal(data.signal);
    peers.current = { ...peers.current, ...peerData };
  };

  const peerListeners = (data: IPeers) => {
    const userObj = Object.values(data)[0];
    userObj.peer.on("stream", (stream: any) => {
      userObj.stream = stream;
    });
    userObj.peer.on("data", (data) => {
      console.log(new TextDecoder().decode(data));
    });
    userObj.peer.on("connect", () => {
      userObj.peer.send("dasas " + Object.keys(data)[0]);
    });
    userObj.peer.addStream(media.current!);
  };
  return (
    <div>
      <video id="userVideo" />
      <video id="peerVideo" />
    </div>
  );
};
