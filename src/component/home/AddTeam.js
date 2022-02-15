import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import field from "../../images/field.jpg";

function AddTeam() {
  const history = useHistory();
  const [team, setTeam] = useState({
    teamName: "",
    teamAbbr: "",
    league: {
    },
  })
  const [selectedFile, setSelectedFile] = useState({});

  useEffect(() => {
    const params = {
      email: localStorage.getItem("loggedInLeague"),
    };
    axios.get("http://localhost:8080/league", { params })
      .then((response) => {
        team.league = response.data;
      }).catch((error) => {

      });
  }, []

  );

  const teamChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempTeam = { ...team };
    tempTeam[name] = value;
    setTeam(tempTeam);
  };

  const signUpSubmitHandler = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('teamName', team.teamName);
    formData.append('teamAbbr', team.teamAbbr);
    formData.append('leagueId', team.league.id);
    axios
      .post("http://localhost:8080/save-team", formData)
      .then((response) => {
        history.push("/home");
      })
      .catch((error) => {
        console.log();
      });
  };

  const onFileChangeHandler = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <div>
        <section className="h-100 h-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-8 col-xl-6">
                <div className="card rounded-3">
                  <img src={field} className="w-100" alt="Sample photo" />
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Team Registration</h3>

                    <form className="px-md-2">

                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example1q" name="teamName" value={team.teamName}
                          onChange={teamChangeHandler} className="form-control" />
                        <label className="form-label" for="form3Example1q">Team Name</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example1q" name="teamAbbr" value={team.teamAbbr}
                          onChange={teamChangeHandler} className="form-control" />
                        <label className="form-label" for="form3Example1q"> Abbreviation </label>
                      </div>

                      <div className="form-outline mb-4">
                      <input type="file" className="form-control" name="file" onChange={onFileChangeHandler}/>
                        <label className="form-label" for="form3Example1q"> Team Photo </label>
                      </div>

                      <button type="button" onClick={signUpSubmitHandler} className="btn btn-success btn-lg mb-1">Submit</button>

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddTeam;