// Create a single EventTarget to act as a shared bus
const eventBus = new EventTarget();

export function setTheme(theme) {
  console.log("[remote] Dispatching themeChange:", theme);
  eventBus.dispatchEvent(new CustomEvent('themeChange', { detail: theme }));
}

export function onThemeChange(callback) {
  console.log("[remote] Registered onThemeChange listener");
  eventBus.addEventListener('themeChange', e => {
    console.log("[remote] Event caught in eventBus:", e.detail);
    callback(e.detail);
  });
}

// export the bus instance (important)
export { eventBus };
