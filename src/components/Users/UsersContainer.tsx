import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../App";
interface IUsers {
  online: string[];
  users: string[];
}
export const UsersContainer = () => {
  const [users, setUsers] = useState<IUsers>({ online: [], users: [] });
  const serverId = window.location.pathname.split("/")[2];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res: AxiosResponse<IUsers> = await axiosInstance.get(
      `/server/get_users/${serverId}`
    );
    console.log(res.data);
    setUsers(res.data);
  };
  return (
    <div className="bg-gray-100 w-full h-screen">
      <div className="flex justify-center flex-col">
        <p className="">Online</p>
        <ul>
          {users.online.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>
      <p>Offline</p>
      <ul>
        {users.users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};
