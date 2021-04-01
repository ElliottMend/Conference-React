import React, { useState, useEffect, useRef } from "react";
import { socket } from "../WebSockets";
import Peer from "simple-peer";
import { Call } from "./Call";
interface IInputs {
  video: MediaStream;
  audio: MediaStream;
}
interface IProps {
  serverId: string;
}
export const CallContainer = (props: IProps) => {
  const videoPlayer = useRef<HTMLVideoElement | null>(null);
  const videoPlayer1 = useRef<HTMLVideoElement | null>(null);
  const [videos, setVideos] = useState<MediaStream[]>([]);
  const [users, setUsers] = useState<Peer.Instance[]>([]);
  const [videoPlayers, setVideoPlayers] = useState<
    React.MutableRefObject<HTMLVideoElement>[]
  >([]);
  const [inputs, setInputs] = useState<IInputs>({
    audio: new MediaStream(),
    video: new MediaStream(),
  });
  const [camera, setCamera] = useState<boolean>(false);
  const [mic, setMicrophone] = useState<boolean>(true);
  let video: MediaStream, audio: MediaStream;
  const user = new Peer({ initiator: true });
  const user1 = new Peer();
  const setMedia = async () => {
    audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    video = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    setInputs({ audio: audio, video: video });
    if (audio) {
      user.addStream(audio);
      setMicrophone(!mic);
    }
    if (video) {
      user.addStream(video);
      setCamera(!camera);
    }
    if (videoPlayer.current) {
      videoPlayer.current.srcObject = video;
      videoPlayer.current.play();
    }
  };
  useEffect(() => {
    let isCancelled = false;
    setMedia();
    return () => {
      isCancelled = true;
    };
  }, []);
  const changeInput = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (e.currentTarget.id === "mic") {
      inputs.audio.getAudioTracks()[0].enabled = !mic;
      setMicrophone((prevState) => !prevState);
    } else {
      inputs.video.getVideoTracks()[0].enabled = !camera;
      setCamera((prevState) => !prevState);
    }
  };
  useEffect(() => {
    socket.emit("join_call", { server: props.serverId });
    socket.on("users_in_call", (user: number[]) => {
      let arr = [];
      for (let i = 0; i < user.length; i++) {
        let a = new Peer();
        arr.push(a);
      }
      setUsers(arr);
    });
  }, []);
  useEffect(() => {
    user.on("signal", (data) => {
      user1.signal(data);
      // users.forEach((user) => {
      //   user.signal(data);
      // });
    });
    user1.on("signal", (data) => {
      user.signal(data);
    });
    user1.on("stream", (stream) => {
      // setVideoPlayers([...videoPlayers, stream]);
      console.log(stream);
      if (videoPlayer1.current) {
        setVideos([...videos, stream]);
        videoPlayer1.current.srcObject = stream;
        videoPlayer1.current.play();
      }
    });
  }, []);

  return (
    <Call
      videoPlayer1={videoPlayer1}
      videoPlayer={videoPlayer}
      changeInput={changeInput}
    />
  );
};
