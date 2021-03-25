import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./components/UserAuth/LoginContainer";
import { RegisterContainer } from "./components/UserAuth/RegisterContainer";
import { Sidebar } from "./components/Views/Sidebar";
const RoomContainer = React.lazy(
  () => import("./components/Room/RoomContainer")
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
          <Switch>
            {props.state ? (
              <Route path="/Room" component={() => <RoomContainer />} />
            ) : (
              <div>
                <Route path="/login" component={() => <LoginContainer />} />
                <Route
                  path="/Register"
                  component={() => <RegisterContainer />}
                />
              </div>
            )}
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
};
