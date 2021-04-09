import { createContext, useEffect, useState, useRef } from "react";
import { socket } from "../WebSockets";
interface IContext {
  addNewTrack: (track: any) => void;
  removeTrack: (track: any) => void;
  mediaStream: React.MutableRefObject<MediaStream>;
  tracks: ITracks;
  currentTrack: React.MutableRefObject<MediaStreamTrack | undefined>;
}
interface ITracks {
  audio: MediaStreamTrack | null;
  video: MediaStreamTrack | null;
}
export const StreamContext = createContext<IContext | undefined>(undefined);
const serverId = window.location.pathname.split("/")[2];
export const StreamProvider = ({ children }: any) => {
  const currentTrack = useRef<MediaStreamTrack>();
  const mediaStream = useRef<MediaStream>(new MediaStream());
  const [tracks, setTracks] = useState<ITracks>({ video: null, audio: null });

  const addNewTrack = (track: MediaStreamTrack) => {
    currentTrack.current = track;
    mediaStream.current.addTrack(track);
    socket.emit("add_track");
  };

  const removeTrack = (track: MediaStreamTrack) => {
    // socket.emit("remove_track", { room: serverId });
    // mediaStream!.removeTrack(track);
  };

  return (
    <StreamContext.Provider
      value={{
        tracks,
        currentTrack,
        mediaStream,
        removeTrack,
        addNewTrack,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};
