import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CallContainer } from "./components/Call/CallContainer";
import { LoginContainer } from "./components/UserAuth/LoginContainer";
import { RegisterContainer } from "./components/UserAuth/RegisterContainer";
import { Sidebar } from "./components/Views/Sidebar";
const ServerContainer = React.lazy(
  () => import("./components/Server/ServerContainer")
);
interface IProps {
  state: boolean;
}
export const Routes = (props: IProps) => {
  return (
    <div className="flex">
      <React.Suspense fallback={<span>...loading</span>}>
        <BrowserRouter>
          <Sidebar />
          {/* <ServerContainer /> */}
          <Switch>
            <Route
              path="/Server/:ServerId"
              component={() => <ServerContainer />}
            />
            <React.Fragment>
              <Route path="/Login" component={() => <LoginContainer />} />
              <Route path="/Register" component={() => <RegisterContainer />} />
            </React.Fragment>
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
};
