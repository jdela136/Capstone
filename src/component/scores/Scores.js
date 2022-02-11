import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";

function Scores() {
  const [league, setLeague] = useState({});
  const [games, setGames] = useState([]);

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

  return (
    <div>
      <h1 className="h3 text-center">Scores</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {games.map((game, index) => {
          return (
            <div className="col">
              <div class="card" style={{ width: "18rem" }}>
                <div class="card-header">
                  Game
                </div>
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
                      <td>{game.awayTeam.teamName}</td>
                      <td>{game.awayScore}</td>
                      <td>{game.awayHits}</td>
                    </tr>
                    <tr>
                      <td>{game.homeTeam.teamName}</td>
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