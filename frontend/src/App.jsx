import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./ux/layout/Layout";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <div className="App" style={{height: "100%"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
