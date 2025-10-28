import React from "react";
import { StateStore } from "shell/events"; // 👈 now resolvable

export default function App() {
  const handleAddToCart = () => {
    const product = { id: Date.now(), name: "Wireless Mouse" };
    StateStore.publish("ADD_TO_CART", product);
  };

  return (
    <div>
      <h2>Catalog (App 1)</h2>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
