import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Softball from "../../images/Softball.jpg";

function SignIn() {
  const [signInLeague, setSignInLeague] = useState({
    commissioner: {
      email: "",
      password: "",
    },
  });

  const history = useHistory();

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempSignIn = { ...signInLeague };
    tempSignIn.commissioner[name] = value;
    setSignInLeague(tempSignIn);
  };

  const signInSubmitHandler = () => {
    axios
      .post("https://softball-tracker-backend.azurewebsites.net/login", signInLeague)
      .then((response) => {
        localStorage.setItem("loggedInLeague", response.data.commissioner.email);
        history.push("/home");
      })
      .catch((error) => {
        console.log("in the future add logic to navigate to an error page");
      });
  };

  return (
    <div className="sign-in">
      <div className="container h-90 mb-0" >
          <br/>
          <br/>
        <div className="title">
          <h1>Softball Stat Tracker</h1>
        </div>
        <div className="d-flex justify-content-center h-100">
          <div className="user_card ">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src={Softball} className="brand_logo" alt="Logo" />
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    onChange={changeHandler}
                    type="email"
                    name="email"
                    className="form-control input_user"
                    value={signInLeague.commissioner.email}
                    placeholder="email"
                  />
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    onChange={changeHandler}
                    type="password"
                    name="password"
                    className="form-control input_pass"
                    value= {signInLeague.commissioner.password}
                    placeholder="password"
                  />
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customControlInline"
                    />
                    <label
                      className="custom-control-label"
                      for="customControlInline"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3 login_container">
                  <button type="button" name="button" onClick={signInSubmitHandler} className="btn login_btn">
                    Login
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-center links">
                Don't have an account?{" "}
                <Link to="/sign-up" className="ml-2">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
