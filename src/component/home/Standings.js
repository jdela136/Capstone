import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";

function Standings() {
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
          .get("http://localhost:8080/standings", { params })
          .then((response) => {
            setTeams(response.data);
          })
          .catch((error) => { });
      })
      .catch((error) => { });
  }, []);

  return (
    <div>
      <h1 className="h3 text-center">Standings</h1>
      <table className="table table-hover">
        <thead className= "table-color">
          <tr>
            <th scope="col">Team Name</th>
            <th scope="col">Wins</th>
            <th scope="col">Losses</th>
            <th scope="col">Win Percentage</th>
            <th scope="col">Games Back</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => {
            return (
              <tr>
                <th scope="row">{team.teamName}</th>
                <td>{team.wins}</td>
                <td>{team.losses}</td>
                <td>{Number(team.winPercentage).toFixed(3)}</td>
                <td>{team.gamesBack}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Standings;