// export const EventBus = {
//   publish: (event, data) => {
//     console.log("[Bus] Publishing event:", event, data);
//     window.dispatchEvent(new CustomEvent(event, { detail: data }));
//   },
//   subscribe: (event, callback) => {
//     const handler = (e) => {
//       console.log("[Bus] Received event:", event, e.detail);
//       callback(e.detail);
//     };
//     window.addEventListener(event, handler);
//     return () => window.removeEventListener(event, handler);
//   },
// };

// Global shared store with queuing
if (!window.__stateStore__) {
  window.__stateStore__ = {
    queue: [], // holds messages until consumed
    listeners: {},
  };
}

export const StateStore = {
  publish: (event, data) => {
    const message = { event, data, timestamp: Date.now() };
    window.__stateStore__.queue.push(message);

    // Trigger all listeners subscribed to this event
    (window.__stateStore__.listeners[event] || []).forEach((cb) => cb(data));
  },

  subscribe: (event, callback) => {
    // Register listener
    if (!window.__stateStore__.listeners[event]) {
      window.__stateStore__.listeners[event] = [];
    }
    window.__stateStore__.listeners[event].push(callback);

    console.log(`[Queue] Subscribed to ${event}`);

    // Replay past events from queue (so late consumers catch up)
    window.__stateStore__.queue
      .filter((msg) => msg.event === event)
      .forEach((msg) => callback(msg.data));

    return () => {
      window.__stateStore__.listeners[event] =
        window.__stateStore__.listeners[event].filter((cb) => cb !== callback);
    };
  },
};

