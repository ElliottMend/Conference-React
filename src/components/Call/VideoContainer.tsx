import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";
import photo from "../../assets/download.png";
let video: MediaStream;
interface IProps {
  videos: MediaStream[];
  user: Peer.Instance;
}
interface ICamera {
  active: boolean;
  clickable: boolean;
}
export const VideoContainer = (props: IProps) => {
  const userVideo = useRef<HTMLDivElement | HTMLVideoElement | null>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<MediaStream[]>(props.videos);
  const [videoInput, setVideoInput] = useState<MediaStream | null>(null);
  const [camera, setCamera] = useState<ICamera>({
    active: false,
    clickable: true,
  });
  useEffect(() => {
    let isCancelled = false;
    generateImage();
    videoContainer.current?.appendChild(userVideo.current!);
    return () => {
      isCancelled = true;
    };
  }, []);
  const generateImage = () => {
    let image = document.createElement("div");
    image.style.backgroundImage = `url(${photo})`;
    image.style.backgroundSize = "cover";
    image.style.width = "640px";
    image.style.height = "480px";
    if (userVideo.current)
      videoContainer.current?.replaceChild(image, userVideo.current!);
    userVideo.current = image;
    if (video && video.getVideoTracks()[0]) {
      video.getVideoTracks()[0].stop();
      video.removeTrack(video.getVideoTracks()[0]);
    }
  };
  const generateVideo = async () => {
    let videoPlayer = document.createElement("video");
    videoPlayer.style.width = "640px";
    videoPlayer.style.height = "480px";
    video = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoPlayer.srcObject = video;
    videoContainer.current?.replaceChild(videoPlayer, userVideo.current!);
    props.user.addStream(video);
    setVideoInput(video);
    userVideo.current = videoPlayer;
    userVideo.current.play().catch(() => {
      generateImage();
    });
  };

  const changeCamera = async () => {
    setCamera({ ...camera, clickable: false });
    if (camera.active) {
      await generateImage();
    } else {
      await generateVideo();
    }
    setCamera({ active: !camera.active, clickable: true });
  };
  return (
    <div>
      <div ref={videoContainer}></div>
      <label>
        <svg
          className={`w-16 h-16 fill-current ${
            camera.active ? "text-enabled-green" : "text-red-600"
          } ${!camera.clickable && "disabled"}`}
          viewBox="0 0 24 24"
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
    </div>
  );
};
