// auth.js
export const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("storage"));
  };
  
  export const logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    window.dispatchEvent(new Event("storage"));
  };
  
  export const isLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };