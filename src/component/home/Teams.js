import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";

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
                                <div className="card-top">
                                    <img src={"data:image/png;base64," + team.photo} width="100%" height="50%"/>                                    
                                </div>
                                <div className="card-body">
                                    <p className="card-text">Team Name: {team.teamName}</p>
                                    <p className="card-text">Abbreviation: {team.teamAbbr}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                            >
                                                <Link className="button" to={"/home/" + team.id + "/stats"}>
                                                    Team Stats
                                                </Link>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                            >
                                                <Link className="button" to={"/home/" + team.id + "/line-up"}>
                                                    Team Lineup
                                                </Link>
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
