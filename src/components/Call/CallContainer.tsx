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
export const CallContainer = (props: IProps) => {
  const userStreamContext = useContext(StreamContext);
  const peers = useRef<IPeers>({});
  const [users, setUsers] = useState<IPeers>(peers.current);
  const serverId = window.location.pathname.split("/")[2];
  let videoStream: MediaStream;
  useEffect(() => {
    setupSockets();
    socket.emit("join_call", { room: serverId });
    TeardownSockets();
  }, []);

  const setupSockets = async () => {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    socket.on("users_in_call", (userData: any) => {
      userData.users.forEach((user: any) => {
        createPeer(user);
      });
    });

    socket.on("user_signalled", (data: any) => {
      addPeer(data);
    });
  };

  const createPeer = async (data: {
    sid: string;
    user: string;
    user_id: number;
  }) => {
    const stream = userStreamContext?.mediaStream.current;
    console.log(stream?.getTracks());
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        url: "stun:stun.l.google.com:19302",
        urls: "stun:stun.l.google.com:19302",
      },
      stream,
    });
    socket.on("returning_signal", (data: any) => {
      peer.signal(data.signal);
    });
    peer.on("signal", (signal) => {
      socket.emit("signal_user", { signal, user: data.sid });
    });
    const peerData: IPeers = { [data.sid]: { peer, user: data.user, stream } };
    peerListeners(peerData);
    peers.current = { ...peers.current, ...peerData };
    setUsers(peers.current);
  };

  const addPeer = async (data: {
    sid: string;
    signal: string;
    user: string;
  }) => {
    const stream = userStreamContext?.mediaStream.current;
    console.log(stream?.getTracks());
    const peer = new Peer({
      config: {
        url: "stun:stun.l.google.com:19302",
        urls: "stun:stun.l.google.com:19302",
      },
      trickle: false,
      stream,
    });
    peer.on("signal", (signal: any) => {
      socket.emit("return_signal", { signal, user: data.sid });
    });
    const peerData: IPeers = { [data.sid]: { peer, user: data.user, stream } };
    peerListeners(peerData);
    peer.signal(data.signal);
    peers.current = { ...peers.current, ...peerData };
    setUsers(peers.current);
  };

  const peerListeners = async (data: IPeers) => {
    const userObj = Object.values(data)[0];
    userObj.peer.on("stream", (stream) => {
      console.log("stream");
      peers.current[Object.keys(data)[0]].stream = stream;
      setUsers(peers.current);
    });
    userObj.peer.on("err", (err: Error) => {
      socket.emit("left_call", { room: serverId });
    });
    userObj.peer.on("close", (err: Error) => {
      socket.emit("left_call", { room: serverId });
    });
  };

  const TeardownSockets = () => {
    window.addEventListener("unload", () => {
      socket.emit("left_call", { room: serverId });
    });
    socket.on("user_left_call", (sid: string) => {
      if (peers.current[sid]) {
        peers.current[sid].peer.destroy();
        delete peers.current[sid];
        setUsers(peers.current);
      }
    });
  };

  return (
    <div>
      <Call users={users} changeCall={props.changeCall} />
    </div>
  );
};
