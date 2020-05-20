import React, { Component } from "react";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import setAuthHeaders from "./utils/setAuthHeaders";
import { setCurrentUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Queries from "./components/pub/Queries";
import WelcomeBack from "./components/layout/WelcomeBack"

// Check for token to keep user logged in
if (localStorage.username && localStorage.password) {
  // Set auth token header auth
  const username = localStorage.username;
  const password = localStorage.password;
  setAuthHeaders(username, password);
  // Decode token and get user info and exp
  const user = { username: username, password: password };
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(user));
  //<Route exact path="/" component={Landing} />
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={()=>store.getState().auth.isAuthenticated?<WelcomeBack/> : <Landing/>} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/queries" component={Queries} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
