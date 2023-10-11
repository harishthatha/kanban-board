import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";
import LeftSidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";

const layoutStyle = {
  display: "flex",
};

const sidebarStyle = {
  width: "85px", // Adjust this width based on your sidebar width
  flexShrink: 0,
  marginTop: 60,
};

const contentStyle = {
  flex: 1,
  marginTop: 62,
  paddingLeft: 0,
  paddingRight: 0,
};

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={layoutStyle}>
      <Header />
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default Layout;
