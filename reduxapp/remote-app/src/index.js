import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, addItem } from './store';

const App = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 20 }}>
      <h2>Remote App Store Demo</h2>
      <button onClick={() => dispatch(addItem({ id: 1, name: 'Apple' }))}>
        Add Apple
      </button>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
