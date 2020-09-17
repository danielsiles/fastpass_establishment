import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

// components

// pages
import LoginPage from "_pages/login";
import DashboardPage from "_pages/dashboard";
import TicketPage from "_pages/ticket";
import ServicePage from "_pages/service";
import WorkingTimePage from "_pages/working-time";

function App(props) {
  return (
    <Switch>
      <Route path="/app/dashboard" component={DashboardPage} />
      <Route path="/app/tickets" component={TicketPage} />
      <Route path="/app/services" component={ServicePage} />
      <Route path="/app/workingTime" component={WorkingTimePage} />
    </Switch>
  );
}

export default function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.auth?.login?.token);
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={App} />
        <PublicRoute path="/login" component={LoginPage} />
        <Route path="*" render={() => <div>404</div>} />
      </Switch>
    </Router>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
