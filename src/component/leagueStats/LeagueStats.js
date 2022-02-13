import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";


function LeagueStats() {
  const [players, setPlayers] = useState([]);
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
          .get("http://localhost:8080/players", { params })
          .then((response) => {
            setPlayers(response.data);
          })
          .catch((error) => { });
      })
      .catch((error) => { });
  }, []);

  return (
    <div>
      <h1 className="h3 text-center">League Statistics</h1>
      <br/>
      <br/>
      <table id="example" class="table table-striped table-bordered" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team Name</th>
            <th>AVG</th>
            <th>AB</th>
            <th>R</th>
            <th>H</th>
            <th>2B</th>
            <th>3B</th>
            <th>HR</th>
            <th>RBI</th>
            <th>BB</th>
            <th>SO</th>
            <th>OBP</th>
            <th>SLG</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => {
            return (
              <tr>
                <th>{player.firstName} {player.lastName}</th>
                <th>{player.team.teamName}</th>
                <th>{Number(player.stats.average).toFixed(3)}</th>
                <th>{player.stats.atBats}</th>
                <th>{player.stats.runs}</th>
                <th>{player.stats.hits}</th>
                <th>{player.stats.doubles}</th>
                <th>{player.stats.triples}</th>
                <th>{player.stats.homeruns}</th>
                <th>{player.stats.rbis}</th>
                <th>{player.stats.walks}</th>
                <th>{player.stats.strikeouts}</th>
                <th>{Number(player.stats.obp).toFixed(3)}</th>
                <th>{Number(player.stats.slugging).toFixed(3)}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LeagueStats;