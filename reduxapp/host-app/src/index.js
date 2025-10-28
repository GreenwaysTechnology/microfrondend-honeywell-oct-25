import React, { Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector, useDispatch } from 'react-redux';

const RemoteStorePromise = import('remote_app/Store');

const RemoteApp = () => {
    const [store, setStore] = React.useState(null);

    useEffect(() => {
        RemoteStorePromise.then(mod => setStore(mod.store));
    }, []);

    if (!store) return <div>Loading Remote Store...</div>;

    const App = () => {
        const cart = useSelector(state => state.cart);
        const dispatch = useDispatch();
        return (
            <div style={{ padding: 20 }}>
                <h2>Host App using Remote Store</h2>
                <button onClick={() => dispatch({ type: 'cart/addItem', payload: { id: 2, name: 'Banana' } })}>
                    Add Banana
                </button>
                <pre>{JSON.stringify(cart, null, 2)}</pre>
            </div>
        );
    };

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<RemoteApp />);
