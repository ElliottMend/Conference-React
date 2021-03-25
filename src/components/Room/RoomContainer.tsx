import React, { useState } from "react";
import { CallContainer } from "../Call/CallContainer";
import { Room } from "./Room";
import { LocationState } from "history";
import { UsersContainer } from "../Users/UsersContainer";
interface ILocation {
  state: string;
}
interface IProps {
  location?: LocationState & ILocation;
}
const RoomContainer = (props: IProps) => {
  const roomId = props.location?.state;
  const [call, setCall] = useState<boolean>(false);
  const enterCall = () => {
    setCall(true);
  };
  return (
    <div className="flex">
      {call ? <Room enterCall={enterCall} /> : <CallContainer />}
      <div>
        <UsersContainer roomId={roomId} />
      </div>
    </div>
  );
};
export default RoomContainer;
