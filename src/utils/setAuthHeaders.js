import axios from "axios";

const setAuthHeaders = (username, password) => {
  if (username && password) {
    // Apply authorization headers to every request if logged in
    axios.defaults.headers.common["username"] = username;
    axios.defaults.headers.common["password"] = password;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["username"];
    delete axios.defaults.headers.common["password"];
  }
};

export default setAuthHeaders;
