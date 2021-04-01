import React, { useEffect, useState } from "react";
import Peer from "simple-peer";
interface IProps {
  user: Peer.Instance;
}
export const AudioContainer = (props: IProps) => {
  const [mic, setMicrophone] = useState<boolean>(true);
  const [audioInput, setAudioInput] = useState<MediaStream>(new MediaStream());
  let audio: MediaStream;
  useEffect(() => {
    let isCancelled = false;
    setUserAudio();
    return () => {
      isCancelled = true;
    };
  });
  const setUserAudio = async () => {
    audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    setAudioInput(audio);
    if (audio) {
      props.user.addStream(audio);
      setMicrophone(!mic);
    }
  };
  const changeAudio = (e: React.MouseEvent<Element, MouseEvent>) => {
    audioInput.getAudioTracks()[0].enabled = !mic;
    setMicrophone((prevState) => !prevState);
  };
  return (
    <div>
      <svg
        onClick={changeAudio}
        className="w-16 h-16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>{" "}
    </div>
  );
};
