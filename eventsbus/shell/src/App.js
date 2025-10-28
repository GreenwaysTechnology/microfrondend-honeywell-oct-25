import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

const App1 = React.lazy(() => import("app1/App"));
const App2 = React.lazy(() => import("app2/App"));

export default function Shell() {
  return (
    <BrowserRouter>
      <nav style={{ margin: 10 }}>
        <NavLink to="/app1" style={{ margin: 5 }}>App1</NavLink>
        <NavLink to="/app2" style={{ margin: 5 }}>App2</NavLink>
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
