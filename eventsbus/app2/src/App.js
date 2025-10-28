import React, { useState, useEffect } from "react";
import { StateStore } from "shell/events";

export default function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const unsubscribe = StateStore.subscribe("ADD_TO_CART", (product) => {
      setCart((prev) => [...prev, product]);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <h2>Cart (App 2)</h2>
      <ul>
        {cart.map((item) => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
