// Singleton AuthStore shared across MFEs
if (!window.__authStore__) {
  window.__authStore__ = { user: null, token: null, listeners: [] };
}

export const AuthStore = {
  login(user, token) {
    window.__authStore__.user = user;
    window.__authStore__.token = token;
    localStorage.setItem("auth_token", token);
    this._notify();
  },
  logout() {
    window.__authStore__.user = null;
    window.__authStore__.token = null;
    localStorage.removeItem("auth_token");
    this._notify();
  },
  getUser() {
    return window.__authStore__.user;
  },
  isAuthenticated() {
    return !!window.__authStore__.token;
  },
  subscribe(cb) {
    window.__authStore__.listeners.push(cb);
    return () => {
      window.__authStore__.listeners =
        window.__authStore__.listeners.filter((fn) => fn !== cb);
    };
  },
  _notify() {
    window.__authStore__.listeners.forEach((cb) =>
      cb(window.__authStore__.user)
    );
  },
};
