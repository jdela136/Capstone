import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Scores() {
  const [games, setGames] = useState([]);
  const [league, setLeague] = useState({});

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
          .get("http://localhost:8080/games", { params })
          .then((response) => {
            setGames(response.data);
          })
          .catch((error) => { });
      })
      .catch((error) => { });
  }, []);

  const toggleGameStatus = (index) => {
    if (games[index].endGame === true) {
      return (
        <div className="card-header">
          Final
        </div>
      );
    }
    else {
      return (
        <div className="card-header">
          Live
          <div className="float-right">
          <Link to={"/game/" + games[index].id} className="fw-bold text-body">
            <u>Continue Scoring</u>
          </Link>
          </div>
        </div>
      );
    }
  }


  return (
    <div>
      <h1 className="h3 text-center">Scores</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {games.map((game, index) => {
          return (
            <div className="col">
              <div className="card space-scores" style={{ width: "18rem" }}>
                {toggleGameStatus(index)}
                <table class="card-table table">
                  <thead>
                    <tr>
                      <th scope="col">Team</th>
                      <th scope="col">Runs</th>
                      <th scope="col">Hits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{game.awayTeam.teamAbbr}</td>
                      <td>{game.awayScore}</td>
                      <td>{game.awayHits}</td>
                    </tr>
                    <tr>
                      <td>{game.homeTeam.teamAbbr}</td>
                      <td>{game.homeScore}</td>
                      <td>{game.homeHits}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Scores;