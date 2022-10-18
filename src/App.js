import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AppProvider from "./components/AppProvider";
import "./styles/App.css";
import NavBar from "./components/NavBar";
import Requests from "./pages/Requests";

function App() {
  return (
    <div id="App">
      <AppProvider>
        <NavBar>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/requests" element={<Requests />} />
          </Routes>
        </NavBar>
      </AppProvider>
    </div>
  );
}

export default App;
