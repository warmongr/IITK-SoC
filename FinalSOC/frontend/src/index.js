import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { Router, Route, Switch, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import { store } from "./store";
import { AuthenticatedRoute,PrivateRoute } from "./customRoutes/ProtectedRoutes";

import Navigation from "./containers/NavigationContainer";
import HomePage from "./containers/HomePageContainer";
import Catalogue from './components/catalogue';
import AddBook from './components/AddBook';
import Check from './components/Checkin';
import User from './components/User';
import Login from "./containers/auth/LoginContainer";
import Register from "./containers/auth/RegisterContainer";
import ChangePassword from "./containers/auth/ChangePasswordContainer";

export const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/catalogue" component={Catalogue}/>
          <Route path='/user' component ={User}/>
          <PrivateRoute path='/circulation' component={Check}/>
          <PrivateRoute path='/addbook' component={AddBook}/>
          <AuthenticatedRoute exact path="/login" component={Login} />
          <AuthenticatedRoute exact path="/register" component={Register} />
          <Route exact path="/signout" render={() => <Redirect to="/" />} />
          <Route exact path="/changepassword" component={ChangePassword} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
