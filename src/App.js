import "./App.css";
import Swal from "sweetalert2";
import Home from "./Home";
import Login from "./Auth/Login";
import ModalEdit from "./components/Modal/ModalEdit";
import { Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
function App() {
  const PrivateRoute = () => {
    const token = localStorage.getItem("Token");
    if (token) {
      return <Outlet />;
    } else {
      Swal.fire("Warning", "Please login first", "error");
      return <Navigate to="/login" />;
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<ModalEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
