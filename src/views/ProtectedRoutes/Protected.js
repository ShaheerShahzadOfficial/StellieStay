import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SignIn from "../dashboard/auth/sign-in";

const Protected = (props) => {
  const { Component } = props;
  // const navigate = useNavigate();
  // useEffect(() => {
  //     let login = localStorage.getItem("user");
  //     if (!login) {
  //         navigate('/auth/sign-in')
  //     }else if(login)(
  //         navigate("/")
  //     )
  // }, [])
  let location = useLocation();

  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!loading) {
  //       if (!isAuthenticated && !location.pathname.includes("/auth/")) {
  //         navigate("/auth/sign-in");
  //       }
  //     }

  //     console.log(loading, isAuthenticated);
  //   }, [isAuthenticated, loading]);
  return (
    <>
      <div>
        {!loading && !isAuthenticated ? (
          <SignIn />
        ) : (
          <Component />
        )}
      </div>
    </>
  );
};
export default Protected;
