import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RedirectPage from "./pages/RedirectPage";
// Components
import Nav from "./components/nav/Nav"
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shortid" element={<RedirectPage />} />
      </Routes>
      <p style={{ textAlign: "center" }}>
        Released by <a href="https://www.ndsql.top" target="_blank" rel="noopener noreferrer">NdSQL</a>
      </p>
    </>
  );
}

export default App;
