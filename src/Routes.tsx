import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { LoginContainer } from "./components/UserAuth/LoginContainer";
// import { RegisterContainer } from "./components/UserAuth/RegisterContainer";
import { UserAuthContainer } from "./components/UserAuth/UserAuthContainer";

const ServerContainer = React.lazy(
  () => import("./components/Server/ServerContainer")
);
export const Routes = () => {
  return (
    <div>
      <React.Suspense fallback={<span>...loading</span>}>
        <BrowserRouter>
          <Switch>
            <Route
              path="/Server/:ServerId"
              component={() => <ServerContainer />}
            />
            <React.Fragment>
              <Route
                path={["/Login", "/Register"]}
                component={() => <UserAuthContainer />}
              />
            </React.Fragment>
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
};
