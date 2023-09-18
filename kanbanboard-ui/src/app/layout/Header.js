import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";

const Header = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header>
          <Image
            size="mini"
            src="https://cdn-icons-png.flaticon.com/512/5360/5360804.png"
            style={{ marginRight: "1.5em" }}
          />
          Kanban Board
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Header;
