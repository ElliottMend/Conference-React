import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../App";
interface IProps {
  roomId: string | undefined;
}
export const UsersContainer = (props: IProps) => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res: AxiosResponse<string[]> = await axiosInstance.get(
      `/users/${props.roomId}`
    );
    setUsers(res.data);
  };
  return <div></div>;
};
