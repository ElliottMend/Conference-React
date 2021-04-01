import "./App.css";
import axios from "axios";
import { RoutesContainer } from "./RoutesContainer";
import "./assets/main.css";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
function App() {
  return (
    <div className="App">
      <RoutesContainer />
    </div>
  );
}

export default App;
