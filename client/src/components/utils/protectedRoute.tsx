import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { AppState } from "../../store/configureStore";

function ProtectedRoute({
  isAuthenticated,
  loading,
  componentIfAuth = true,
  element,
  ...rest
}: ProtectedRouteProps) {
  return (
    <Route
      {...rest}
      render={() => {
        if (loading) {
          return (
            <div className="loader-page">
              <MoonLoader loading={true} size={100} color="#00A3B8" />;
            </div>
          );
        } else if (isAuthenticated === componentIfAuth) {
          return element;
        } else {
          return <Redirect to={componentIfAuth ? "/" : "/dashboard"} />;
        }
      }}
    />
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  componentIfAuth?: boolean;
  loading: boolean;
  element: JSX.Element;
}
