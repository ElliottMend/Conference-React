import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createRef,
} from "react";
import photo from "../../assets/download.png";
import { AudioContainer } from "./AudioContainer";
import { StreamContext } from "../Context/StreamContext";
import { IPeers } from "./CallContainer";
import { socket } from "../WebSockets";
import adapter from "webrtc-adapter";
let video: MediaStream;
interface IProps {
  users: IPeers;
}
interface ICamera {
  active: boolean;
  enabled: boolean;
  clickable: boolean;
}

export const VideoContainer = (props: IProps) => {
  const videoContext = useContext(StreamContext);
  const containerRef = createRef<React.ForwardedRef<HTMLDivElement>>();
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const [camera, setCamera] = useState<ICamera>({
    enabled: false,
    active: false,
    clickable: true,
  });
  useEffect(() => {
    let isCancelled = false;
    setCamera({ ...camera, enabled: true, active: false });
    getUserVideo()
      .then(() => {
        videoContext?.addNewTrack(video.getVideoTracks()[0]);
      })
      .catch((err) => {
        console.log("err");
      });
    return () => {
      isCancelled = true;
    };
  }, []);
  const getUserVideo = async () => {
    video = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    userVideo.current = createElement(video);
    videoContainer.current!.appendChild(userVideo.current);
  };
  useEffect(() => {
    socket.on("user_left_call", (sid: string) => {
      console.log(sid);
      const videoPlayer = document.getElementById(sid);
      videoPlayer?.remove();
    });

    Object.values(props.users).forEach((user) => {
      Object.keys(props.users).forEach((sid) => {
        const videoElement = document.getElementById(
          sid + "-video"
        ) as HTMLVideoElement;
        if (!videoElement) {
          const videoPlayer = createElement(
            user.stream ? user.stream : undefined
          );
          let div;
          div = document.getElementById(sid);
          console.log(div);
          if (!div) {
            div = document.createElement("div");
            div.id = sid;
          }
          div.append(videoPlayer);
          videoPlayer.id = sid + "-video";
          videoContainer.current?.appendChild(div);
        }
      });
    });
  }, [props.users]);

  const generateImage = () => {
    videoContext?.removeTrack(videoContext.tracks.video);
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
    if (obj && obj!.getVideoTracks().length > 0) {
      console.log("das");
      element.srcObject = obj;
      element.autoplay = true;
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
    } else {
      createElement(video);
    }
    videoContext!.addNewTrack(video.getVideoTracks()[0]);
  };
  const screenShare = async (checked: React.ChangeEvent<HTMLInputElement>) => {
    if (checked.target.value) {
      // @ts-ignore
      const stream = await navigator.mediaDevices.getDisplayMedia();
      userVideo.current!.srcObject = stream;
      userVideo.current!.autoplay = true;
      videoContext?.addNewTrack(stream.getVideoTracks()[0]);
    } else generateVideo();
  };

  const changeCamera = async () => {
    setCamera({ ...camera, clickable: false });
    if (camera.active) {
      generateImage();
    } else {
      await generateVideo();
    }
    setCamera({ ...camera, active: !camera.active, clickable: true });
  };
  return (
    <div>
      <div className="flex justify-center">
        <input onChange={screenShare} type="checkbox"></input>

        <label>
          <svg
            className={`w-16 h-16 fill-current ${
              !camera.enabled
                ? "text-gray-500"
                : camera.active
                ? "text-enabled-green"
                : "text-red-600"
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
