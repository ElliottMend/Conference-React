import React, { useEffect, useState } from "react";
import { CallContainer } from "../Call/CallContainer";
import { Server } from "./Server";
import { socket } from "../WebSockets";
import { axiosInstance } from "../../App";
import { AxiosResponse } from "axios";
import { createBrowserHistory } from "history";
import { StreamProvider } from "../Context/StreamContext";
import { Redirect } from "react-router";
import { CC } from "../Call/CC";
const ServerContainer = () => {
  let history = createBrowserHistory();
  const [call, setCall] = useState<boolean>(true);
  useEffect(() => {
    checkAuth();
  }, []);
  const handleUnload = () => {
    socket.emit("leave_room", { room: serverId });
  };
  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    socket.on("connected", () => {});
    socket.emit("join_room", { room: serverId });
  }, [handleUnload]);

  const serverId = window.location.pathname.split("/")[2];
  const checkAuth = async () => {
    const res = await axiosInstance.get<AxiosResponse<string>>("/auth/verify");
    if (res.status !== 200) return <Redirect to="/Login" />;
  };

  const changeCall = () => {
    setCall(!call);
  };
  return (
    <div>
      {!call ? (
        <Server enterCall={changeCall} />
      ) : (
        <StreamProvider>
          <CallContainer changeCall={changeCall} />
        </StreamProvider>
      )}
    </div>
  );
};
export default ServerContainer;
