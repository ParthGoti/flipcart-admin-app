import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Home } from "./containers/Home";
import { Signin } from "./containers/Signin";
import { Signup } from "./containers/Signup";
import PrivateRoute from "./helpers/PrivateRoute";
import { isUserLoggedIn, getInitialData } from "./actions";
import { Products } from "./containers/Product";
import { Orders } from "./containers/Orders";
import { Category } from "./containers/Category";
import { Page } from "./containers/Page";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products" exact component={Products} />
        <PrivateRoute path="/page" exact component={Page} />
        <PrivateRoute path="/orders" exact component={Orders} />
        <PrivateRoute path="/category" exact component={Category} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
