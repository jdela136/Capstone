import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";


function TeamStats() {
  const [players, setPlayers] = useState([]);
  const { teamId } = useParams()

  useEffect(() => {
    const params = {
      teamId,
    };
    axios
      .get("http://localhost:8080/roster", { params })
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => { });
  }, []);

  return (
    <div>
      <table id="example" class="table table-striped table-bordered" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
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
                <th>{player.stats.average}</th>
                <th>{player.stats.atBats}</th>
                <th>{player.stats.runs}</th>
                <th>{player.stats.hits}</th>
                <th>{player.stats.doubles}</th>
                <th>{player.stats.triples}</th>
                <th>{player.stats.homeruns}</th>
                <th>{player.stats.rbis}</th>
                <th>{player.stats.walks}</th>
                <th>{player.stats.strikeouts}</th>
                <th>{player.stats.obp}</th>
                <th>{player.stats.slugging}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TeamStats;