import React, { useState, useEffect, useRef, useContext } from "react";
import photo from "../../assets/download.png";
import { AudioContainer } from "./AudioContainer";
import { StreamContext } from "../Context/StreamContext";
import Peer from "simple-peer";
import { IStreams } from "./CallContainer";
import { IPeers } from "./CallContainer";
let video: MediaStream;
interface IProps {
  users: IPeers[];
  streams: IStreams[];
}
interface ICamera {
  active: boolean;
  enabled: boolean;
  clickable: boolean;
}
export const VideoContainer = (props: IProps) => {
  const videoContext = useContext(StreamContext);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const [videoInput, setVideoInput] = useState<MediaStream | null>(null);
  const [camera, setCamera] = useState<ICamera>({
    enabled: false,
    active: false,
    clickable: true,
  });

  useEffect(() => {
    let isCancelled = false;
    const element = createElement();
    userVideo.current = element;
    videoContainer.current?.appendChild(element);
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    props.users.forEach((user, index) => {
      Object.values(user).forEach((peer) => {
        const videoPlayer = createElement(
          peer.stream.getVideoTracks().length > 0 ? peer.stream : undefined
        );
        console.log(peer.stream.getVideoTracks());
        videoPlayer.id = Object.keys(user)[0];
        videoContainer.current?.appendChild(videoPlayer);
      });
    });
  }, [props.users]);

  const generateImage = () => {
    if (video && video.getVideoTracks()[0]) {
      video.getVideoTracks()[0].stop();
      video.removeTrack(video.getVideoTracks()[0]);
    }
    userVideo.current!.srcObject = null;
    userVideo.current!.style.backgroundImage = `url(${photo})`;
    userVideo.current!.style.backgroundSize = "cover";
  };

  const createElement = (obj?: MediaStream) => {
    let element = document.createElement("video") as HTMLVideoElement;
    element.style.width = "640px";
    element.style.height = "480px";
    if (obj) {
      element.srcObject = obj;
      element.play();
    } else {
      element.style.backgroundImage = `url(${photo})`;
      element.style.backgroundSize = "cover";
    }
    return element;
  };

  const generateVideo = async () => {
    video = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    if (video) setCamera({ ...camera, enabled: true });
    if (userVideo.current) {
      userVideo.current.style.backgroundImage = "";
      userVideo.current.srcObject = video;
      userVideo.current.play().catch(() => {
        generateImage();
      });
      videoContext!.addNewTrack(video.getVideoTracks()[0]);
      setVideoInput(video);
    }
  };

  const changeCamera = async () => {
    setCamera({ ...camera, clickable: false });
    if (camera.active) {
      await generateImage();
    } else {
      await generateVideo();
    }
    setCamera({ ...camera, active: !camera.active, clickable: true });
  };
  return (
    <div>
      <div className="flex" ref={videoContainer}></div>
      <div className="flex justify-center">
        <label>
          <svg
            className={`w-16 h-16 fill-current ${
              camera.active ? "text-enabled-green" : "text-red-600"
            } ${!camera.clickable && "disabled"}`}
            viewBox="0 0 20 22"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <input
            type="checkbox"
            checked={camera.active}
            onChange={changeCamera}
            disabled={!camera.clickable}
            className={`hidden`}
          ></input>
        </label>
        <AudioContainer users={props.users} />
      </div>
    </div>
  );
};
