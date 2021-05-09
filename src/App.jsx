import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header.jsx";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Register from "./pages/register";
// import CreateFundraiser from "./pages/fundraiser";
import CreateFundraiser from "./pages/fundraiser2";
import Dashboard from "./pages/dashboard";
import Checkout from "./pages/checkout";
import Profile from "./pages/dashboard/profile";
import Settings from "./pages/dashboard/settings";
import Events from "./pages/dashboard/events";
import { PrivateRoute } from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import { authenticationService } from "./_services/authentication.service";

class App extends Component {
  state = { currentUser: null };

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
      this.setState({ currentUser: x })
    );
  }

  render() {
    const { currentUser } = this.state;
    return (
      <>
        <Router>
          <Header currentUser={currentUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register" component={Register} />
            <Route path="/checkout" component={Checkout} />
            <PrivateRoute
              path="/create-fundraiser"
              component={CreateFundraiser}
            />
            <PrivateRoute path="/dashboard">
              <Dashboard>
                <Switch>
                  <PrivateRoute path="/dashboard/profile" component={Profile} />
                  <PrivateRoute path="/dashboard/events" component={Events} />
                  <PrivateRoute
                    path="/dashboard/settings"
                    component={Settings}
                  />
                </Switch>
              </Dashboard>
            </PrivateRoute>
            <Route path="*" component={NotFound} />
          </Switch>

          <div className="text-xs sm:text-sm bg-gray-200 text-semibold p-5">
            @ 2021 - Charitable Crowdfunding. All rights reserved
          </div>
        </Router>
      </>
    );
  }
}

export default App;
