import MicroModal from "react-micro-modal";
import { CreateServerController } from "../Server/CreateServer";
import { ServerList } from "../Server/ServerList";

export const Sidebar = () => {
  return (
    <div className="flex flex-col">
      <MicroModal trigger={(open) => <div onClick={open}>Create Server!</div>}>
        {(close) => (
          <div>
            <CreateServerController onClose={close} />
          </div>
        )}
      </MicroModal>
      <p>Servers:</p>
      <ServerList />
    </div>
  );
};
