import logo from "../assets/logo.png";
import React, { useEffect } from "react";
import charity from "../assets/charity-box.png";
import { Ripple } from "@progress/kendo-react-ripple";
import { Link } from "react-router-dom";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  // Avatar,
  Drawer,
  DrawerContent,
} from "@progress/kendo-react-layout";

import { authenticationService } from "../_services/authentication.service";
import { useHistory } from "react-router-dom";

// let kendokaAvatar =
//   "https://www.telerik.com/kendo-react-ui-develop/images/kendoka-react.png";

const items = [
  { text: "Home", icon: "k-i-home", selected: true },
  { separator: true },
  { text: "Donate", icon: "k-i-heart-outline" },
  { text: "About Us", icon: "k-i-globe" },
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

  const { currentUser } = props;

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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/donate">Donate</Link>
              </li>
              <li>
                <Link to="/about">Contact Us</Link>
              </li>
              {!currentUser && (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
              {currentUser && (
                <>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link onClick={logout}>Logout</Link>
                  </li>
                </>
              )}
            </ul>
          </AppBarSection>
        </div>

        <AppBarSpacer />

        <div className="hidden sm:flex">
          <AppBarSection className="actions">
            <Ripple>
              <button className="k-button text-base font-semibold px-6 py-2 rounded-lg">
                <img src={charity} width="24" height="24" alt="fundraiser" />
                Start a fundraiser
              </button>
            </Ripple>
          </AppBarSection>

          <AppBarSection>
            <span className="k-appbar-separator" />
          </AppBarSection>

          {/* <AppBarSection>
            <Link to="/profile">
              <Avatar shape="circle" type="image">
                <img src={kendokaAvatar} alt="kendo-avatar" />
              </Avatar>
            </Link>
          </AppBarSection> */}
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
