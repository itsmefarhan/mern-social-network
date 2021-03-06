import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthContextProvider from "./context/auth/authContext";
import UserContextProvider from "./context/user/userContext";
import PostContextProvider from "./context/post/postContext";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Menu from "./components/Menu";
import PrivateRoute from "./components/PrivateRoute";
import Users from "./pages/profile/Users";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";

const App = () => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <PostContextProvider>
          <BrowserRouter>
            <Menu />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/user/:id" component={Profile} />
              <Route exact path="/user/edit/:id" component={EditProfile} />
            </Switch>
          </BrowserRouter>
        </PostContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
};

export default App;
