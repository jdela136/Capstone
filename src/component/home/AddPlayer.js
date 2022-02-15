import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import field from "../../images/field.jpg";

function AddPlayer() {
  const history = useHistory();
  const [league, setLeague] = useState({});
  const [teams, setTeams] = useState([]);
  const[player, setPlayer] = useState({
    firstName: "",
    lastName: "",
    team: {
      id: 1
    },
  })

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

  const signUpSubmitHandler = () => {
    axios
      .post("http://localhost:8080/save-player", player)
      .then((response) => {
        history.push("/home");
      })
      .catch((error) => {
        console.log();
      });
  };

  const playerChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempPlayer = { ...player };
    tempPlayer[name] = value;
    setPlayer(tempPlayer);
  };

  const teamChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempPlayer = { ...player };
    tempPlayer.team.id = value;
    setPlayer(tempPlayer);
  };

  return (
    <div>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <img src={field} className="w-100" alt="Sample photo"/>
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Player Registration</h3>

                    <form className="px-md-2">

                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example1q" name="firstName" value={player.firstName}
                      onChange={playerChangeHandler} className="form-control" />
                        <label className="form-label" for="form3Example1q">First Name</label>
                      </div>
                      
                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example1q" name="lastName" value={player.lastName}
                      onChange={playerChangeHandler} className="form-control" />
                        <label className="form-label" for="form3Example1q"> Last Name</label>
                      </div>

                      <div className="mb-4">
                          
                        <select onChange={teamChangeHandler} className="select big-select">
                        <option>Choose</option>
                        {teams.map((team, index) => {
                          return(
                          <option name="id" value={team.id}>{team.teamName}</option>
                          );
                        })}
                        </select>
                        <label className="form-label" for="form3Example1q"> Team</label>
                      </div>


                      <button type="button" onClick = {signUpSubmitHandler} className="btn btn-success btn-lg mb-1">Submit</button>

                    </form>

                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddPlayer;
