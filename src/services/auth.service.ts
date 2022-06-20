import React from "react";
import AuthContext from "src/views/auth/AuthenContext";

/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    sessionStorage.removeItem('user')
    setTimeout(callback, 100);
  },
};

function useAuth() {
  return { user: sessionStorage.getItem('user'), token:  sessionStorage.getItem('token')}
  // return React.useContext(AuthContext);
}

export { fakeAuthProvider, useAuth };