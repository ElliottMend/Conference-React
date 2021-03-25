import React from "react";
import { io } from "socket.io-client";
import { Homepage } from "./Homepage";
export const socket = io("http://localhost:5000", {
  withCredentials: true,
});
export const HomepageContainer = () => {
  return <Homepage />;
};
