import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { EventList } from "../components/Pages/EventList";
import { EventForm } from "../components/Molecules/Forms/Event";
const AppRouter = () => {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/" component={EventList} />
        <Route
          exact
          path="/new"
          render={() => {
            return <EventForm variant="add" />;
          }}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export { AppRouter };
