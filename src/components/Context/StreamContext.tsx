import { createContext, useState } from "react";
import { socket } from "../WebSockets";
interface IContext {
  mediaStream: MediaStream;
  setMediaStream: React.Dispatch<React.SetStateAction<MediaStream>>;
  addNewTrack: (track: any) => void;
  removeTrack: (track: any) => void;
}
interface ITracks {
  audio: MediaStreamTrack;
  video: MediaStreamTrack;
}
export const StreamContext = createContext<IContext | undefined>(undefined);
export const StreamProvider = ({ children }: any) => {
  const [mediaStream, setMediaStream] = useState<MediaStream>(
    new MediaStream()
  );
  const [tracks, setTracks] = useState<ITracks>({
    audio: new MediaStreamTrack(),
    video: new MediaStreamTrack(),
  });
  const addNewTrack = (track: MediaStreamTrack) => {
    setTracks({ ...tracks, [track.kind]: track });
    mediaStream.addTrack(track);
    const data = { track, mediaStream };
    console.log(data);
    socket.emit("add_track", data);
  };
  const removeTrack = (track: MediaStreamTrack) => {
    socket.emit("remove_track");
    mediaStream.removeTrack(track);
  };

  return (
    <StreamContext.Provider
      value={{ mediaStream, setMediaStream, removeTrack, addNewTrack }}
    >
      {children}
    </StreamContext.Provider>
  );
};
