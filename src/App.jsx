import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header.jsx";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateFundraiser from "./pages/fundraiser";
import Dashboard from "./pages/dashboard";
import Checkout from "./pages/checkout";
import Profile from "./pages/dashboard/profile";
import Settings from "./pages/dashboard/settings";
import Events from "./pages/dashboard/events";
import { PrivateRoute } from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import { authenticationService } from "./_services/authentication.service";
import Donate from "./pages/events";
import { LocalizationProvider } from "@progress/kendo-react-intl";

class App extends Component {
  state = { currentUser: null, locale: "en-IN" };

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
      this.setState({ currentUser: x })
    );
    authenticationService.currentLocale.subscribe((x) =>
      this.setState({ locale: x })
    );
  }

  render() {
    const { currentUser, locale } = this.state;
    return (
      <>
        <LocalizationProvider language={locale.toLowerCase()}>
          <Router>
            <Header currentUser={currentUser} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/contact" component={Contact} />
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register" component={Register} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/donate" component={Donate} />
              <PrivateRoute
                path="/create-fundraiser"
                component={CreateFundraiser}
              />
              <PrivateRoute path="/dashboard">
                <Dashboard>
                  <Switch>
                    <PrivateRoute
                      path="/dashboard/profile"
                      component={Profile}
                    />
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
        </LocalizationProvider>
      </>
    );
  }
}

export default App;
