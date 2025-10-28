import React from "react";
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";

const Dashboard = () => <h2>Dashboard</h2>;
const Profile = () => <h2>Profile</h2>;

export default function App() {
  return (
    <MemoryRouter>
      <div>
        <h1>App 2</h1>
        <Link to="/">Dashboard</Link> | <Link to="/profile">Profile</Link>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </MemoryRouter>
  );
}
