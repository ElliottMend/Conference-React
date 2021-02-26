import { fromPromise } from "@apollo/client";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./components/UserAuth/LoginContainer";
import { RegisterContainer } from "./components/UserAuth/RegisterContainer";
import { Header } from "./components/Views/Header";
import { Sidebar } from "./components/Views/Sidebar";
const ChatContainer = React.lazy(
  () => import("./components/Chat/ChatContainer")
);
// import { ChatSocket } from "./components/ChatSocket";
export const Routes = () => {
  return (
    <div>
      <React.Suspense fallback={<span>...loading</span>}>
        <BrowserRouter>
          <Header />
          <Sidebar />
          <Switch>
            <Route path="/login" component={() => <LoginContainer />} />
            <Route path="/Chat" component={() => <ChatContainer />} />
            <Route path="/Register" component={() => <RegisterContainer />} />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
};
