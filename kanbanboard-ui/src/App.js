import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Board from "./app/layout/Board";
import Layout from "./app/layout/Layout";
import Boards from "./app/layout/Boards";
import Login from "./app/pages/login/Login";
import Register from "./app/pages/register/Register";
import { AuthProvider } from "./app/contexts/AuthContext";
import PrivateRoute from "./app/layout/PrivateRoute";
import Logout from "./app/pages/login/Logout";
import Profile from "./app/layout/Profile";
import AccessDenied from "./app/layout/AccessDenied";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/register" element={<Register />} />

            <Route
              exact
              path="/"
              element={<PrivateRoute path="/" element={Boards} />}
            />
            <Route
              exact
              path="/profile"
              element={<PrivateRoute path="/profile" element={Profile} />}
            />
            <Route
              exact
              path="/boards"
              element={<PrivateRoute path="/boards" element={Boards} />}
            />
            <Route
              exact
              path="/boards/:id"
              element={<PrivateRoute path="/boards/:id" element={Board} />}
            />
            <Route exact path="*" element={<AccessDenied />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
