import MicroModal from "react-micro-modal";
import { CreateRoomController } from "../Room/CreateRoomController";
import { RoomList } from "../Room/RoomList";

export const Sidebar = () => {
  return (
    <div className="flex flex-col">
      <MicroModal trigger={(open) => <div onClick={open}>Create Room!</div>}>
        {(close) => (
          <div>
            <CreateRoomController onClose={close} />
          </div>
        )}
      </MicroModal>
      <p>Rooms:</p>
      <RoomList />
    </div>
  );
};
