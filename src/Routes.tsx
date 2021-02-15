import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ChatSocket } from "./components/ChatSocket";
import { LoginContainer } from "./components/UserAuth/LoginContainer";
export const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={() => <LoginContainer />} />
          <Route path="/Chat" component={() => <ChatSocket />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
