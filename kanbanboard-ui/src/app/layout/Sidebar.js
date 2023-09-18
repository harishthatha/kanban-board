import React from "react";
import { Icon, Menu, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={true}
      width="thin"
    >
      <Menu.Item as="a">
        <Link to="/">
          <Icon name="home" />
          Home
        </Link>
      </Menu.Item>

      <Menu.Item as="a">
        <Link to="/profile">
          <Icon name="user" />
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item as="a">
        <Link to="boards">
          <Icon name="list" />
          Boards
        </Link>
      </Menu.Item>
    </Sidebar>
  );
};

export default LeftSidebar;
