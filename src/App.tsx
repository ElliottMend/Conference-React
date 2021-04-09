import "./App.css";
import axios from "axios";
import "./assets/main.css";
import { Routes } from "./Routes";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
