import React from "react";
interface IProps {
  changeInput: (e: React.MouseEvent<Element, MouseEvent>) => void;
  videoPlayer: React.MutableRefObject<HTMLVideoElement | null>;
  videoPlayer1: React.MutableRefObject<HTMLVideoElement | null>;
}
export const Call = (props: IProps) => {
  return (
    <div>
      <div>
        {}
        <div>
          <p>VP</p>
          <video ref={props.videoPlayer}></video>
        </div>
        <div>
          <p>VP1</p>
          <video ref={props.videoPlayer1}>VP1</video>
        </div>
      </div>
      <button id="cam" name="Camera" onClick={props.changeInput}>
        Camera
      </button>
      <button id="mic" onClick={props.changeInput}>
        Microphone
      </button>
    </div>
  );
};
