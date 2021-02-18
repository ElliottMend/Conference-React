import "./App.css";
import { Routes } from "./Routes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./index";
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes />
      </div>
    </ApolloProvider>
  );
}

export default App;
