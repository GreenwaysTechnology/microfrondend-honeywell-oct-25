import React, { useEffect, useState } from "react";
import { AuthStore } from "shell/AuthStore";

export default function App() {
  const [user, setUser] = useState(AuthStore.getUser());

  useEffect(() => {
    const unsubscribe = AuthStore.subscribe((data) => setUser(data));
    return unsubscribe;
  }, []);

  return (
    <div>
      <h2>App2 - Dashboard</h2>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please login from App1.</p>
      )}
    </div>
  );
}
