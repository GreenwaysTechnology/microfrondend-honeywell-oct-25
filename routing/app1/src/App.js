import React from "react";
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";

const Home = () => <h2>App1 Home</h2>;
const About = () => <h2>App1 About</h2>;

export default function App() {
  return (
    <MemoryRouter>
      <div>
        <h1>App 1</h1>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </MemoryRouter>
  );
}
