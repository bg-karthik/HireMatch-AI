import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";

import Login from "./components/Login";

import Register from "./components/Register";

import Contact from "./components/Contact";

import YourResumes from "./components/YourResumes";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* PROTECTED ROUTE */}
        <Route
          path="/your-resumes"
          element={
            <ProtectedRoute>
              <YourResumes />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;