import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";

// Components
import Nav from "./components/nav/Nav"
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
