import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Admin from "./components/Admin";
import Builder from "./components/Builder/Builder";
import Home from "./components/Home";
import Print from "./components/Builder/Print";
import useAuth from "./components/useAuth";
import firebase, { FirebaseContext } from "./firebase/firebase";

function App() {
  const user = useAuth();

  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/admin" component={Admin} />
          <Route path="/builder" component={Builder} />
          <Route path="/print" component={Print} />
        </Switch>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
