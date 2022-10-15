import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AppProvider from "./components/AppProvider";
import "./styles/App.css";

function App() {
  return (
    <div id="App">
      <AppProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
