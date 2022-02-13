import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import { useHistory } from "react-router-dom";

function ChooseTeam() {
    const history = useHistory();
    const [league, setLeague] = useState({});
    const [teams, setTeams] = useState([]);
    const [game, setGame] = useState({
        homeTeam: {
            id : 1
        },
        awayTeam: {
            id : 1
        }
    });


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


    const homeTeamChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempGame = { ...game };
        tempGame.homeTeam[name] = value;
        setGame(tempGame);
    };

    const awayTeamChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempGame = { ...game };
        tempGame.awayTeam[name] = value;
        setGame(tempGame);
    };

    const playHandler = (event) => {
        axios
            .post("http://localhost:8080/start-game", game)
            .then((response) => {
                history.push("/game/" + response.data.id);
            })
            .catch((error) => {
                console.log();
            });
    }

    return (
        <div>
            <section class="vh-100 gradient-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div class="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                                <div class="card-body p-5 text-center">

                                    <div class="mb-md-5 mt-md-4 pb-5">

                                        <h2 class="fw-bold mb-2 text-uppercase">Choose Your Teams</h2>

                                        <div className="mb-4">

                                            <select onChange={homeTeamChangeHandler} name="id" className="select big-select">
                                                {teams.map((team, index) => {
                                                    return (
                                                        <option value={team.id}>{team.teamName}</option>
                                                    );
                                                })}
                                            </select>
                                            <label className="form-label" for="form3Example1q"> Away Team</label>
                                        </div>
                                        <div className="mb-4">

                                            <select onChange={awayTeamChangeHandler} name="id" className="select big-select">
                                                {teams.map((team, index) => {
                                                    return (
                                                        <option value={team.id}>{team.teamName}</option>
                                                    );
                                                })}
                                            </select>
                                            <label className="form-label" for="form3Example1q"> Home Team</label>
                                        </div>
                                        <button class="btn btn-outline-light btn-lg px-5" onClick={playHandler} type="submit">Play Ball</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ChooseTeam;