import React, { useEffect, useState, useRef, useContext } from "react";
import Peer from "simple-peer";
import { IPeers } from "./CallContainer";
import { AudioMeterController } from "./AudioMeterController";
import { StreamContext } from "../Context/StreamContext";
interface IProps {
  users: IPeers[];
}
interface IMic {
  enabled: boolean;
  active: boolean;
}
export const AudioContainer = (props: IProps) => {
  const AudioContext = useContext(StreamContext);
  const audioContainer = useRef<HTMLDivElement | null>(null);
  const [mic, setMicrophone] = useState<IMic>({
    enabled: false,
    active: false,
  });

  const [audioInput, setAudioInput] = useState<MediaStream>(new MediaStream());
  let audio: MediaStream;

  useEffect(() => {
    let isCancelled = false;
    setUserAudio();
    return () => {
      isCancelled = true;
    };
  }, []);
  const setUserAudio = async () => {
    audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    setAudioInput(audio);
    if (audio) {
      let audioPlayer = document.createElement("audio");
      audio.getAudioTracks()[0].enabled = mic.active;
      audioPlayer.srcObject = audio;
      audioContainer.current?.appendChild(audioPlayer);
      AudioContext?.addNewTrack(audio.getAudioTracks()[0]);
      audioPlayer.play();
      setMicrophone({ enabled: true, active: false });
    }
  };

  const changeAudio = () => {
    audioInput.getAudioTracks()[0].enabled = !mic.active;
    setMicrophone({ ...mic, active: !mic.active });
  };
  return (
    <div className="flex">
      <div ref={audioContainer} />
      <label>
        <svg
          className={`w-16 h-16 fill-current ${
            mic.active ? "text-enabled-green" : "text-red-600"
          } `}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
        <input
          type="checkbox"
          checked={mic.active}
          onChange={changeAudio}
          className={`hidden`}
        />
      </label>
      <AudioMeterController changeAudio={changeAudio} source={audioInput} />
    </div>
  );
};
