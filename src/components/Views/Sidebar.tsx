import MicroModal from "react-micro-modal";
import { CreateServerController } from "../Server/CreateServer";
import { ServerList } from "../Server/ServerList";

export const Sidebar = () => {
  return (
    <div className="flex h-screen bg-gray-100 flex-col">
      <MicroModal
        trigger={(open) => (
          <div
            className="bg-red-100 cursor-pointer rounded-2xl py-10 "
            onClick={open}
          >
            Create Server!
          </div>
        )}
      >
        {(close) => <CreateServerController onClose={close} />}
      </MicroModal>
      <div className="md:flex flex-col md:flex-row md:min-h-screen">
        <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
          <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <p className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
              Your Servers
            </p>
          </div>
          <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
            <div className="block px-4 cursor-pointer py-6 bg-gray-100 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
              <ServerList />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
