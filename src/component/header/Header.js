import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function Header() {
  const history = useHistory();
  const [league, setLeague] = useState({
    commissioner: {

    }
  });
  const signOutSubmitHandler = () => {
    localStorage.clear();
    history.push("/sign-in");
  };


  useEffect(() => {
    const params = {
      email: localStorage.getItem("loggedInLeague"),
    };
    axios.get("http://localhost:8080/league", {params})
      .then((response) => {
        setLeague(response.data);
      }).catch((error) => {

       });
  }, []
  );

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg-clr">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            League Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/scores">
                  Scores
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/stats">
                  Statistics
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/play-game">
                  Play Game
                </Link>
              </li>
            </ul>
          </div>
          <h6>Welcome, {league.commissioner.firstName} {league.commissioner.lastName} </h6>
          <form className="d-flex">
              <button className="btn btn-outline-dark" onClick={signOutSubmitHandler} type="button">
                Sign Out
              </button>
            </form>
        </div>
      </nav>
    </header>
  );
}

export default Header;
