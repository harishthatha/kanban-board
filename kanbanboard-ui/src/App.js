import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import KanbanBoard from "./app/layout/KanbanBoard";
import Layout from "./app/layout/Layout";
import Boards from "./app/layout/Boards";
import Login from "./app/pages/login/Login";
import Register from "./app/pages/register/Register";
import { AuthProvider } from "./app/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Boards />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/boards" element={<Boards />} />
            <Route exact path="/boards/:id" element={<KanbanBoard />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
