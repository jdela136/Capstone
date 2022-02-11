import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";

function TeamRoster() {
  const [players, setPlayers] = useState([]);
  const {teamId} = useParams()

  useEffect(() => {
    const params = {
          teamId,
        };
        axios
          .get("http://localhost:8080/line-up", { params })
          .then((response) => {
            setPlayers(response.data);
          })
          .catch((error) => { });
  }, []);

    return (
      <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Batting Order</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => {
            return (
              <tr>
                <th scope="row">{player.lineupId}</th>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    );
  }
  
  export default TeamRoster;