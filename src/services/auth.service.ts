import React from "react";
import AuthContext from "src/views/auth/AuthenContext";
import axios from 'axios'
import { SignpostOutlined } from "@mui/icons-material";

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

const authentication = {
  async signin(u: String, p: String) {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/users/signIn',
      data: { username: u, password: p }
    });

    return res;
  },

  sigout() {
    delete axios.defaults.headers.common['Authorization'];
    sessionStorage.removeItem('token');
  },
}

function useAuth() {
  return { user: sessionStorage.getItem('user'), token: sessionStorage.getItem('token') }
  // return React.useContext(AuthContext);
}

export { fakeAuthProvider, authentication, useAuth };