import React, { useState, useEffect, useRef, useContext } from "react";
import { socket } from "../WebSockets";
import Peer from "simple-peer";
import { StreamContext } from "../Context/StreamContext";
import { Call } from "./Call";

interface IProps {
  changeCall: () => void;
}
export interface IPeers {
  [sid: string]: { peer: Peer.Instance; user: string; stream: MediaStream };
}
export interface IStreams {
  username: string;
  stream: MediaStream;
}
export const CallContainer = (props: IProps) => {
  const UserStream = useContext(StreamContext);
  const peers = useRef<IPeers[]>([]);
  const [streams, setStreams] = useState<IStreams[]>([]);
  const serverId = window.location.pathname.split("/")[2];
  const [users, setUsers] = useState<IPeers[]>([]);
  const handleUnload = () => {
    socket.emit("left_call", { room: serverId });
  };
  useEffect(() => {
    setupSockets();
    socket.on("error", (err: Error) => {
      console.log(err);
    });

    window.addEventListener("beforeunload", handleUnload);
  }, []);

  useEffect(() => {
    socket.on("user_left_call", (data: any) => {
      const user = users.filter((user) => Object.keys(user)[0] !== data.user);
      setUsers(user);
    });
    socket.on("added_track", () => {
      // const track = UserStream!.mediaStream.getTracks()[
      //   UserStream!.mediaStream.getTracks().length - 1
      // ];
      // if (
      //   track.kind === "video"
      //     ? peer.stream.getVideoTracks().length > 0 &&
      //       peer.peer.addTrack(track, peer.stream)
      //     : peer.stream.getAudioTracks().length > 0 &&
      //       peer.peer.addTrack(track, peer.stream)
      // ) {
      // }
    });
    users.forEach((user) => {
      console.log(user);
    });
    console.log(users);
  }, [users]);

  const setupSockets = () => {
    socket.emit("join_call", { room: serverId });
    socket.on("users_in_call", (usersData: any) => {
      let peerData: IPeers = {};
      const stream = UserStream!.mediaStream;
      usersData.forEach((user: any) => {
        let peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
        });
        peer.on("signal", (signal) => {
          socket.emit("send_signal", { user: user.sid, signal });
        });
        peerData[user.sid] = { peer, user: user.username, stream };
      });
      if (Object.keys(peerData).length > 0) {
        peers.current.push(peerData);
      }
    });

    socket.on(
      "user_joined",
      (data: { user: string; sending_user: string; signal: any }) => {
        const stream = UserStream!.mediaStream;
        const user = peers.current.find(
          (p) => Object.keys(p)[0] === data.sending_user
        );
        if (!user) {
          let peer = new Peer({ trickle: false, stream });
          peer.on("signal", (signal) => {
            socket.emit("return_signal", {
              user: data.sending_user,
              signal: signal,
            });
          });
          peer.signal(data.signal);
          const peerData: IPeers = {};
          peerData[data.sending_user] = { peer, user: data.user, stream };
          peers.current.push(peerData);
          setUsers([...peers.current]);
        }
      }
    );

    socket.on("returning_signal", (data: any) => {
      const user = peers.current.find((p) => Object.keys(p)[0] === data.user);
      if (user) {
        Object.values(user!)[0].peer.signal(data.signal);
        setUsers([...peers.current]);
      }
    });
  };

  return (
    <div>
      <Call users={users} changeCall={props.changeCall} streams={streams} />
    </div>
  );
};
