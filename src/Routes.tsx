import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./components/UserAuth/LoginContainer";
import { RegisterContainer } from "./components/UserAuth/RegisterContainer";

const ChatSocket = React.lazy(() => import("./components/ChatSocket"));
// import { ChatSocket } from "./components/ChatSocket";
export const Routes = () => {
  return (
    <div>
      <React.Suspense fallback={<span>...loading</span>}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={() => <LoginContainer />} />
            <Route path="/Chat" component={() => <ChatSocket />} />
            <Route path="/Register" component={() => <RegisterContainer />} />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
};
