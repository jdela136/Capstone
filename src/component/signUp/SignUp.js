import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [league, setLeague] = useState({
    leagueName: "",
    commissioner: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
    },
  });

  const leagueChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempLeague = { ...league };
    tempLeague[name] = value;
    setLeague(tempLeague);
  };

  const commissionerChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempLeague = { ...league };
    tempLeague.commissioner[name] = value;
    setLeague(tempLeague);
  };

  const signUpSubmitHandler = () => {
    axios
      .post("http://localhost:8080/leagues", league)
      .then((response) => {
        history.push("thank-you");
      })
      .catch((error) => {
        console.log();
      });
  };

  return (
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">
                  Create an account
                </h2>

                <form>
                  <div className="form-outline mb-4">
                    <label className="form-label" for="form3Example1cg">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="form3Example1cg"
                      name="firstName"
                      value={league.commissioner.firstName}
                      onChange={commissionerChangeHandler}
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="form3Example1cg">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="form3Example1cg"
                      name="lastName"
                      value={league.commissioner.lastName}
                      onChange={commissionerChangeHandler}
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="form3Example3cg">
                      Email
                    </label>
                    <input
                      type="email"
                      id="form3Example3cg"
                      name="email"
                      value={league.commissioner.email}
                      onChange={commissionerChangeHandler}
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="form3Example4cg">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form3Example4cg"
                      name="password"
                      value={league.commissioner.password}
                      onChange={commissionerChangeHandler}
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="form3Example1cg">
                      League Name
                    </label>
                    <input
                      type="text"
                      id="form3Example1cg"
                      name="leagueName"
                      value={league.leagueName}
                      onChange={leagueChangeHandler}
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      onClick={signUpSubmitHandler}
                      type="button"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                    >
                      Register
                    </button>
                  </div>

                  <p className="text-center text-muted mt-5 mb-0">
                    Have already an account?{" "}
                    <Link to="/" className="fw-bold text-body">
                      <u>Login here</u>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
