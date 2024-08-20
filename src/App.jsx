import React from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Content from "./components/Container/Content";
import Main from "./components/Container/Main";
import PageNotFound from "./components/Error/PageNotFound";
import Dashboard from "./components/Form/Dashboard";
import Login from "./components/Form/Login";
import Register from "./components/Form/Register";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Main>
          <Header />
          <Content>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Content>
        </Main>
      </div>
    </Router>
  );
};

export default App;
