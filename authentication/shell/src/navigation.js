export const navigate = (path) => {
  window.history.pushState({}, "", path);
  // Dispatch a popstate event so React Router re‑syncs
  window.dispatchEvent(new PopStateEvent("popstate"));
};
