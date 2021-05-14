import logo from "../assets/logo.png";
import React from "react";
import charity from "../assets/charity-box.png";
import { Ripple } from "@progress/kendo-react-ripple";
import { useHistory, Link, useLocation } from "react-router-dom";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Drawer,
  DrawerContent,
} from "@progress/kendo-react-layout";
import { IntlProvider, load, loadMessages } from "@progress/kendo-react-intl";
import { MessageComponent } from "../components/MessageComponent";

import currencyData from "cldr-core/supplemental/currencyData.json";
import bgLocalCurrency from "cldr-numbers-full/main/bg/currencies.json";
import usLocalCurrency from "cldr-numbers-full/main/en/currencies.json";
import gbLocalCurrency from "cldr-numbers-full/main/en-GB/currencies.json";

import { authenticationService } from "../_services/authentication.service";
import { Chooser } from "./Choose";
import locales from "../_helpers/locales.json";
import {
  headers,
  contactKey,
  dashboardKey,
  donateKey,
  homeKey,
  logoutKey,
  registerKey,
  loginKey,
  headerButtonKey,
} from "../_helpers/localization";

loadMessages(headers["in"], "in");
loadMessages(headers["us"], "us");

load(currencyData, bgLocalCurrency, usLocalCurrency, gbLocalCurrency);
const defaultHeaders = {
  [homeKey]: "Home",
  [donateKey]: "Donate",
  [contactKey]: "Contact",
  [dashboardKey]: "Dashboard",
  [logoutKey]: "Logout",
  [loginKey]: "Login",
  [registerKey]: "Register",
  [headerButtonKey]: "Start a fundraiser",
};

const items = [
  { text: "Home", icon: "k-i-home", selected: true },
  { separator: true },
  { text: "Donate", icon: "k-i-heart-outline" },
  { text: "Contact Us", icon: "k-i-globe" },
  { separator: true },
  { text: "Login", icon: "k-i-lock" },
  { text: "Register", icon: "k-i-user" },
];

const Header = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(
    items.findIndex((x) => x.selected === true)
  );
  let history = useHistory();
  let location = useLocation();

  const handleClick = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleSelect = (ev) => {
    setSelectedId(ev.itemIndex);
    setExpanded(false);
  };

  const logout = () => {
    authenticationService.logout();

    history.push("/login");
  };

  const onLocaleChange = (e) => {
    authenticationService.onLocaleChange(e.target.value);
  };

  const { currentUser, locale } = props;
  return (
    <React.Fragment>
      <AppBar>
        <AppBarSpacer style={{ width: 4 }} />
        <Drawer
          expanded={expanded}
          position={"start"}
          mode="overlay"
          animation={{ duration: 400 }}
          items={items.map((item, index) => ({
            ...item,
            selected: index === selectedId,
          }))}
          onOverlayClick={handleClick}
          onSelect={handleSelect}
        >
          <DrawerContent>
            <div className="flex sm:hidden">
              <AppBarSection>
                <button className="k-button" onClick={handleClick}>
                  <span className="k-icon k-i-menu" />
                </button>
              </AppBarSection>
            </div>
          </DrawerContent>
        </Drawer>

        <AppBarSection>
          <img src={logo} width="150" height="70" alt="charitable-logo" />
        </AppBarSection>

        <AppBarSpacer style={{ width: 32 }} />

        <div className="hidden sm:flex">
          <AppBarSection>
            <ul className="charitable-header-ul">
              <li>
                <Link to="/">
                  <MessageComponent
                    messageKey={homeKey}
                    defaultMessage={defaultHeaders[homeKey]}
                  />
                </Link>
              </li>
              <li>
                <Link to="/donate">
                  <MessageComponent
                    messageKey={donateKey}
                    defaultMessage={defaultHeaders[donateKey]}
                  />
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <MessageComponent
                    messageKey={contactKey}
                    defaultMessage={defaultHeaders[contactKey]}
                  />
                </Link>
              </li>
              {!currentUser && (
                <>
                  <li>
                    <Link to="/login">
                      <MessageComponent
                        messageKey={loginKey}
                        defaultMessage={defaultHeaders[loginKey]}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <MessageComponent
                        messageKey={registerKey}
                        defaultMessage={defaultHeaders[registerKey]}
                      />
                    </Link>
                  </li>
                </>
              )}
              {currentUser && (
                <>
                  <li>
                    <Link to="/dashboard">
                      <MessageComponent
                        messageKey={dashboardKey}
                        defaultMessage={defaultHeaders[dashboardKey]}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link onClick={logout}>
                      <MessageComponent
                        messageKey={logoutKey}
                        defaultMessage={defaultHeaders[logoutKey]}
                      />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </AppBarSection>
        </div>

        <AppBarSpacer />

        <div className="hidden sm:flex">
          <AppBarSection className="actions">
            {location.pathname !== "/" && (
              <Ripple>
                <button className="k-button text-base font-semibold px-6 py-2 rounded-lg">
                  <img src={charity} width="24" height="24" alt="fundraiser" />
                  <MessageComponent
                    messageKey={headerButtonKey}
                    defaultMessage={defaultHeaders[headerButtonKey]}
                  />
                </button>
              </Ripple>
            )}
          </AppBarSection>

          <AppBarSection>
            <span className="k-appbar-separator" />
          </AppBarSection>

          <AppBarSection>
            <Chooser
              value={locale}
              onChange={onLocaleChange}
              options={locales}
              label="Select locale"
            />
          </AppBarSection>
        </div>
      </AppBar>
      <style>{`
                body {
                    background: #fafafa;
                }
                .charitable-header-ul {
                    font-size: 14px;
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                }
                .charitable-header-ul > li {
                    margin: 0 10px;
                }
                .charitable-header-ul > li:hover {
                    cursor: pointer;
                    color: #ff545a;
                }
                .k-button {
                    padding: 10px 25px;
                    background-color: #ff545a;
                    color: white;
                    border-radius: 20px;
                }
                .k-button:hover {
                  background: #ff545a;
                }
                .k-badge-container {
                    margin-right: 8px;
                }
                .k-appbar {
                  background: #fff;
                }
            `}</style>
    </React.Fragment>
  );
};

export default Header;
