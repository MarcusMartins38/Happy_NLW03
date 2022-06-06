import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Route from "./Routes";

import CreateOrphanage from "../pages/CreateOrphanage/CreateOrphanage";
import Landing from "../pages/Landing";
import Orphanage from "../pages/Orphanage";
import OrphanagesMap from "../pages/OrphanagesMap";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import CreateSuccess from "../pages/CreateOrphanage/CreateSuccess";
import MyRegisterOrphanages from "../pages/MyRegisterOrphanages";

import RemoveOrphanage from "../pages/RemoveOrphanage";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />

        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />

        <Route path="/map" component={OrphanagesMap} canView />
        <Route path="/orphanages/:id" component={Orphanage} canView />

        <Route
          path="/registerOrphanages"
          component={MyRegisterOrphanages}
          isPrivate
          exact
        />

        <Route
          path="/registerOrphanages/remove/:id"
          component={RemoveOrphanage}
          isPrivate
        />

        <Route
          path="/orphanages-create"
          component={CreateOrphanage}
          isPrivate
          exact
        />
        <Route
          path="/orphanages-create-success"
          component={CreateSuccess}
          isPrivate
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
