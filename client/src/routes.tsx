import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/utils/protectedRoute";

import Landing from "./components/layouts/landing";
import Alert from "./components/layouts/alert";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import DashBoard from "./components/dashboard/dashboard";
import CreateProfile from "./components/profile-forms/create-profile";
import Profiles from "./components/profiles/profiles";
import profile from "./components/profile/profile";
import Posts from "./components/posts/posts";
import Post from "./components/post/post";

function Routes() {
  return (
    <>
      <Switch>
        <ProtectedRoute
          path="/"
          exact
          element={<Landing />}
          componentIfAuth={false}
        />
        <>
          {/* use <> inside Switch not anything else */}
          <section className="container">
            <Alert />
            <ProtectedRoute
              path="/signup"
              exact
              element={<Signup />}
              componentIfAuth={false}
            />
            <ProtectedRoute
              path="/login"
              exact
              element={<Login />}
              componentIfAuth={false}
            />
            <ProtectedRoute path="/dashboard" exact element={<DashBoard />} />
            <Route path="/profiles" exact component={Profiles} />
            <Route path="/profile/:userId" exact component={profile} />
            <ProtectedRoute
              path="/create-profile"
              exact
              element={<CreateProfile />}
            />
            <ProtectedRoute path="/posts" exact element={<Posts />} />
            <ProtectedRoute path="/posts/:postId" exact element={<Post />} />
          </section>
        </>
      </Switch>
    </>
  );
}

export default Routes;
