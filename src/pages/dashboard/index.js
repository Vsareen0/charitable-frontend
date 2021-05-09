import * as React from "react";
import { withRouter } from "react-router-dom";

import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import Events from "./events";

const items = [
  {
    text: "Welcome",
    icon: "k-i-home",
    route: "/dashboard",
  },
  {
    text: "Profile",
    icon: "k-i-user",
    route: "/dashboard/profile",
  },
  { text: "Events", icon: "k-i-calendar", route: "/dashboard/events" },
  { separator: true },
  { text: "Settings", icon: "k-i-cog", route: "/dashboard/settings" },
];

class DrawerRouterContainer extends React.Component {
  state = { expanded: true };

  handleClick = () => {
    this.setState((e) => ({ expanded: !e.expanded }));
  };

  onSelect = (e) => {
    this.setState({ expanded: true });
    this.props.history.push(e.itemTarget.props.route);
  };

  setSelectedItem = (pathName) => {
    let currentPath = items.find((item) => item.route === pathName);
    if (currentPath.text) {
      return currentPath.text;
    }
  };

  render() {
    let selected = this.setSelectedItem(this.props.location.pathname);
    return (
      <>
        <div className="container mt-1 w-full hidden sm:block">
          <Drawer
            expanded={this.state.expanded}
            position={"start"}
            mode={"push"}
            mini={true}
            items={items.map((item) => ({
              ...item,
              selected: item.text === selected,
            }))}
            onSelect={this.onSelect}
          >
            <DrawerContent>
              {this.props.location.pathname === "/dashboard" && <Events />}
              {this.props.location.pathName !== "/dashboard" &&
                this.props.children}
            </DrawerContent>
          </Drawer>
        </div>
        <div className="container mt-1 w-full block sm:hidden">
          <Drawer
            expanded={false}
            position={"start"}
            mode={"push"}
            mini={true}
            items={items.map((item) => ({
              ...item,
              selected: item.text === selected,
            }))}
            onSelect={this.onSelect}
          >
            <DrawerContent>{this.props.children}</DrawerContent>
          </Drawer>
        </div>
      </>
    );
  }
}

export default withRouter(DrawerRouterContainer);
