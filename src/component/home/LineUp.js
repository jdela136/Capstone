import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";

function LineUp() {
  const [pageRefresh, setPageRefresh] = useState(0);
  const [players, setPlayers] = useState([]);
  const { teamId } = useParams()
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [addPlayer, setAddPlayer] = useState({
    id: 1
  });

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
  }, [pageRefresh]);

  const removeFromLineUpHandler = (player) => {
    axios
      .post("http://localhost:8080/remove-from-lineup", player)
      .then((response) => {
        setPageRefresh(pageRefresh+1);
      })
      .catch((error) => {
        console.log();
      });
  };

  const addToLineUpHandler = (num) => {
    addPlayer.lineupId = num;
    axios
      .post("http://localhost:8080/add-to-lineup", addPlayer)
      .then((response) => {
        setPageRefresh(pageRefresh+1);
      })
      .catch((error) => {
        console.log();
      });
  };

  const addPlayerChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempAddPlayer = { ...addPlayer} ;
    tempAddPlayer[name] = value;
    setAddPlayer(tempAddPlayer);
  };

  const toggleLineUp = (num) => {
    
    let found = false;

    for (let i =0; i < players.length; i++) {

      if (players[i].lineupId === num) {
        found = true;
      }
      
      if (found) {
        found = false;
        return (
          <tr>
            <th scope="row">{num}</th>
            <td>{players[i].firstName} {players[i].lastName}</td>
            <td><input className="btn btn-danger" onClick= {() => removeFromLineUpHandler(players[i])} type="button" value="-"/></td>
          </tr>
        );
      }
      else if(players[i] === players[players.length -1]){
        return (
        <tr>
          <th scope="row">{num}</th>
          <td><select onChange={addPlayerChangeHandler} name="id" className="select big-select">
                        {players.map((player, index) => {
                          return(
                          <option value={player.id}>{player.firstName} {player.lastName}</option>
                          );
                        })}
                        </select></td>
          <td><input className="btn btn-primary" onClick={() => addToLineUpHandler(num)} type="button" value="+"/></td>
        </tr>
        )
      }
    }
  }

  return (
    <div>
      <div>
      <h1 className="h3 text-center">Set Lineup</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Batting Order</th>
              <th scope="col">Name</th>
              <th score="col"></th>
            </tr>
          </thead>
          <tbody>
            {arr.map((num, index) => {
              return (
                toggleLineUp(num)
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LineUp;