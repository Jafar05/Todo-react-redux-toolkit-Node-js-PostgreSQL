import { Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/auth/Login";
import Todo from "./components/Todo/Todo";
import './App.css'
import React from "react";


function App() {
      return (
          <div className="App">
          <NavBar/>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/todo" element={<Todo/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/registration" element={<Register/>} />
              </Routes>
          </div>
  );
}

export default App;
