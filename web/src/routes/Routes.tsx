import React from "react";
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from "react-router-dom";

import { useSelector } from "react-redux";
import { IState } from "../store";
import { UserData } from "../store/modules/user/types";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const userData = useSelector<IState, UserData>((state) => state.userReducer);
  let userExists = false;

  if (userData.token === "") {
    userExists = false;
  } else {
    userExists = true;
  }

  console.log(userData.user);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === userExists ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/app",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
