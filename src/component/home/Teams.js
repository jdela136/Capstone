import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import TeamRoster from "./TeamRoster";
import TeamStats from "./TeamStats";

function Teams() {
    const [league, setLeague] = useState({});
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const params = {
          email: localStorage.getItem("loggedInLeague"),
        };
        axios
          .get("http://localhost:8080/league", { params })
          .then((response) => {
            setLeague(response.data); const params = {
              leagueId: response.data.id
            };
            axios
              .get("http://localhost:8080/teams", { params })
              .then((response) => {
                setTeams(response.data);
              })
              .catch((error) => { });
          })
          .catch((error) => { });
      }, []);


    return (
        <div>
            <h1 className="h3 text-center">Teams</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {teams.map((team, index) => {
                    return (
                        <div className="col">
                            <div className="card shadow-sm">
                                <svg
                                    className="bd-placeholder-img card-img-top"
                                    width="100%"
                                    height="225"
                                    xmlns="http://www.w3.org/2000/svg"
                                    role="img"
                                    aria-label="Placeholder: Thumbnail"
                                    preserveAspectRatio="xMidYMid slice"
                                    focusable="false"
                                >
                                    <title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#55595c"></rect>
                                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                                        Thumbnail
                                    </text>
                                </svg>
                                <div className="card-body">
                                    <p className="card-text">Team Name: {team.teamName}</p>
                                    <p className="card-text">Abbreviation: {team.teamAbbr}</p>
                                    <p className="card-text">Wins: {team.wins}</p>
                                    <p className="card-text">Losses: {team.losses}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                            >
                                                Stats
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                            >
                                                Roster
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Teams;
