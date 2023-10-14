import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import LogoImage from "../images/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Menu fixed="top" inverted>
      <Menu.Item
        as={Link}
        to="/boards"
        header
        style={{ marginLeft: 20, marginRight: 10 }}
      >
        <Image size="mini" src={LogoImage} />
        Kanban Board
      </Menu.Item>
      <Menu.Menu position="right">
        {isAuthenticated() ? (
          <>
            <Menu.Item as={Link} to="/boards" style={{ marginRight: 20 }}>
              Boards
            </Menu.Item>
            <Menu.Item as={Link} to="/profile" style={{ marginRight: 20 }}>
              Profile
            </Menu.Item>
            <Menu.Item as={Link} to="/logout" style={{ marginRight: 20 }}>
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item as={Link} to="/register" style={{ marginRight: 20 }}>
              Register
            </Menu.Item>
            <Menu.Item as={Link} to="/login" style={{ marginRight: 20 }}>
              Login
            </Menu.Item>
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
