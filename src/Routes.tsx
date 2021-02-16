import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ChatSocket } from "./components/ChatSocket";
import { LoginContainer } from "./components/UserAuth/LoginContainer";
import { RegisterContainer } from "./components/UserAuth/RegisterContainer";
export const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={() => <LoginContainer />} />
          <Route path="/Chat" component={() => <ChatSocket />} />
          <Route path="/Register" component={() => <RegisterContainer />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};