import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Teams from "./Teams";
import AddPlayer from "./AddPlayer";
import AddTeam from "./AddTeam";
import Standings from "./Standings";

const Home = () => {
  const [league, setLeague] = useState({});


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
    <div className="container-fluid home-margin-top-less-200px">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item space-out">
                <Link className="nav-link active" to="/home">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="clipboard-plus"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  Teams
                </Link>
              </li>
              <li className="nav-item space-out">
                <Link className="nav-link" to="/add-team">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-file"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  Add Team
                </Link>
              </li>
              <li className="nav-item space-out">
                <a className="nav-link" href="/add-player">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-file"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  Add Player
                </a>
              </li>
              
              
              <li className="nav-item space-out">
                <a className="nav-link" href="/standings">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-layers"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  Standings
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div
            className="chartjs-size-monitor"
            style={{
              position: "absolute",
              left: "0px",
              top: "0px",
              right: "0px",
              bottom: "0px",
              overflow: "hidden",
              "pointer-events": "none",
              visibility: "hidden",
              "z-index": "-1",
            }}
          >
            <div
              className="chartjs-size-monitor-expand"
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                right: "0",
                bottom: "0",
                overflow: "hidden",
                "pointer-events": "none",
                visibility: "hidden",
                "z-index": "-1",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "1000000px",
                  height: "1000000px",
                  left: "0",
                  top: "0",
                }}
              ></div>
            </div>
            <div
              className="chartjs-size-monitor-shrink"
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                right: "0",
                bottom: "0",
                overflow: "hidden",
                "pointer-events": "none",
                visibility: "hidden",
                "z-index": "-1",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "200%",
                  height: "200%",
                  left: "0",
                  top: "0",
                }}
              ></div>
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">{league.leagueName} League</h1>
          </div>
          {<Route path= "/home" component={Teams}/>}
          {<Route path= "/add-player" component={AddPlayer}/>}
          {<Route path= "/add-team" component={AddTeam}/>}
          {<Route path= "/standings" component={Standings}/>}
        </main>
        <div>
        </div>
      </div>
    </div>
  );
};

export default Home;
