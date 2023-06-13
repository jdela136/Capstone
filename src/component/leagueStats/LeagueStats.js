import React, { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";


function LeagueStats() {
  const [players, setPlayers] = useState([]);
  const [league, setLeague] = useState({});
  const [sortedField, setSortedField] = useState('');

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

  
  const sortPlayerHandler = (sortedField) => {
    
    const temp = [...players];
    if(sortedField === 'firstName') {
      temp.sort(compareName);
      setPlayers(temp);
    }
    else if(sortedField === 'teamName') {
      temp.sort(compareTeamName);
      setPlayers(temp);
    }
    else{
      setSortedField(sortedField);
      temp.sort(compareStats);
      setPlayers(temp);
    }
  }

  const compareName = (a,b) => {
      const sortA = a.firstName.toLowerCase();
      const sortB = b.firstName.toLowerCase();

      if(sortA > sortB) {
        return 1;
      }
      else if(sortA < sortB) {
        return -1;
      }
      else {
        return 0;
      }
  }

  const compareTeamName = (a,b) => {
    const sortA = a.team.teamName.toLowerCase();
    const sortB = b.team.teamName.toLowerCase();

    if(sortA > sortB) {
      return 1;
    }
    else if(sortA < sortB) {
      return -1;
    }
    else {
      return 0;
    }
}

  const compareStats = (a,b) => {
    const sortA = a.stats[sortedField];
    const sortB = b.stats[sortedField];

    console.log(sortA);
    if(sortA < sortB) {
      return 1;
    }
    else if(sortA > sortB) {
      return -1;
    }
    else {
      return 0;
    }
}



  return (
    <div>
      <h1 className="h3 text-center">League Statistics</h1>
      <br />
      <br />
      <table id="example" className="table table-striped table-bordered" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('firstName')} type="button" value="▼" />
              </div>
            </th>
            <th>Team Name
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('teamName')} type="button" value="▼" />
              </div>
            </th>
            <th>AVG
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('average')} type="button" value="▼" />
              </div>
            </th>
            <th>AB
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('atBats')} type="button" value="▼" />
              </div>
            </th>
            <th>R
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('runs')} type="button" value="▼" />
              </div>
            </th>
            <th>H
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('hits')} type="button" value="▼" />
              </div>
            </th>
            <th>2B
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('doubles')} type="button" value="▼" />
              </div>
            </th>
            <th>3B
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('triples')} type="button" value="▼" />
              </div>
            </th>
            <th>HR
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('homeruns')} type="button" value="▼" />
              </div>
            </th>
            <th>RBI
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('rbis')} type="button" value="▼" />
              </div>
            </th>
            <th>BB
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('walks')} type="button" value="▼" />
              </div>
            </th>
            <th>SO
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('strikeouts')} type="button" value="▼" />
              </div>
            </th>
            <th>OBP
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('obp')} type="button" value="▼" />
              </div>
            </th>
            <th>SLG
              <div className="float-right">
                <input className="btn btn-primary" onClick={() => sortPlayerHandler('slugging')} type="button" value="▼" />
              </div>
            </th>
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