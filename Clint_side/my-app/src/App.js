
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        </Routes>

        <Routes>
        <Route path="/login" element={<Login />} />
        </Routes>

        <Routes>
        <Route path="/setAvatar" element={<SetAvatar />} />
        </Routes>

        <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}