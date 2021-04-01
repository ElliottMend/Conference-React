import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../App";
import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";
interface IServers {
  server_id: string;
  server_name: string;
}
export const ServerList = () => {
  const [servers, setServers] = useState<IServers[]>([]);

  useEffect(() => {
    getServers();
  }, []);
  const getServers = async () => {
    await axiosInstance
      .get("/server/get_servers")
      .then((res: AxiosResponse<IServers[]>) => {
        setServers(res.data);
      });
  };
  return (
    <div>
      {servers &&
        servers.map((serverName, index) => (
          <ul key={index}>
            <Link to={{ pathname: `/Server/${serverName.server_id}` }}>
              <li>{serverName.server_name}</li>
            </Link>
          </ul>
        ))}
      <div></div>
    </div>
  );
};
