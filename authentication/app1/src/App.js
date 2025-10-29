import React, { useState } from "react";
import { AuthStore } from "shell/AuthStore";
import { navigate } from "shell/Navigation"; // 👈 import from Shell

export default function App() {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    const user = { name: email };
    AuthStore.login(user, "FAKE_TOKEN_123");
    console.log("User logged in:", user);
    // 👇 Redirect user to App2 (Dashboard)
    navigate("/app2");
  };

  return (
    <div>
      <h2>App1 - Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
