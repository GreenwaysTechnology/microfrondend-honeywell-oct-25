import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { Suspense } from "react";

const App1 = React.lazy(() => import("app1/App"));
const App2 = React.lazy(() => import("app2/App"));

export default function Shell() {
  return (
    <BrowserRouter>    {/* ✅ Use BrowserRouter */}
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to="/app1" style={{ marginRight: 10 }}>Login</Link>
        {/* <Link to="/app2">Dashboard</Link> */}
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/app1/*" element={<App1 />} />
          <Route path="/app2/*" element={<App2 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
