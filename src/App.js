import { useEffect } from "react";

import { ToastContainer } from "react-toastify";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";

import "./App.css";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AddEditBlog from "./pages/AddEditBlog";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import SingleBlog from "./pages/SingleBlog";
import { setUser } from "./redux/features/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addBlog"
            element={
              <PrivateRoute>
                <AddEditBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/editBlog/:id"
            element={
              <PrivateRoute>
                <AddEditBlog />
              </PrivateRoute>
            }
          />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
