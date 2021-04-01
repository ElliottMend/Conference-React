import React, { useEffect, useState } from "react";
import { CallContainer } from "../Call/CallContainer";
import { Server } from "./Server";
import { LocationState } from "history";
import { UsersContainer } from "../Users/UsersContainer";
import { socket } from "../WebSockets";
interface ILocation {
  state: string;
}
interface IProps {
  location?: LocationState & ILocation;
}
const ServerContainer = (props: IProps) => {
  const serverId = window.location.pathname.split("/");
  useEffect(() => {
    socket.emit("join_server", { server: serverId[2] });
  }, []);
  const [call, setCall] = useState<boolean>(true);
  const enterCall = () => {
    setCall(true);
  };
  return (
    <div className="flex">
      {!call ? (
        <Server enterCall={enterCall} />
      ) : (
        <CallContainer serverId={serverId[2]} />
      )}
      <div>
        <UsersContainer serverId={serverId[2]} />
      </div>
    </div>
  );
};
export default ServerContainer;
