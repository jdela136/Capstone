import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import playfield from "../../images/playfield.jpeg";
import scenario1 from "../../images/scenario1.jpg";
import scenario2 from "../../images/scenario2.jpg";
import scenario3 from "../../images/scenario3.jpg";
import scenario4 from "../../images/scenario4.jpg";
import scenario5 from "../../images/scenario5.jpg";
import scenario6 from "../../images/scenario6.jpg";
import scenario7 from "../../images/scenario7.jpg";
import { useHistory } from "react-router-dom";

function PlayGame() {
  const [pageRefresh, setPageRefresh] = useState(0);
  const [plateAppearance, setPlateAppearance] = useState({
    player: {
      team: {

      }
    },
    game: {
      awayTeam: {},
      homeTeam: {}
    }
  });
  const { gameId } = useParams()
  const arr = [1, 2, 3];
  const [awayTeamLineUp, setAwayTeamLineUp] = useState([]);
  const [homeTeamLineUp, setHomeTeamLineUp] = useState([]);
  const [pas, setPAs] = useState([]);
  const history = useHistory();
  const [runners, setRunners] = useState([]);
  let runnerBase = '';
  const [isFieldersChoice, setFieldersChoice] = useState(false);

  useEffect(() => {
    const params = {
      gameId,
    };
    axios
      .get("http://localhost:8080/away-team", { params })
      .then((response) => {
        const params = {
          teamId: response.data.id
        };
        axios
          .get("http://localhost:8080/line-up", { params })
          .then((response) => {
            setAwayTeamLineUp(response.data);
          })
          .catch((error) => { });
      })
      .catch((error) => { });

    axios
      .get("http://localhost:8080/home-team", { params })
      .then((response) => {
        const params = {
          teamId: response.data.id
        };
        axios
          .get("http://localhost:8080/line-up", { params })
          .then((response) => {
            setHomeTeamLineUp(response.data);
          })
          .catch((error) => { });
      })
      .catch((error) => { });

    axios
      .get("http://localhost:8080/last-pa", { params })
      .then((response) => {
        setPlateAppearance(response.data);
      })
      .catch((error) => { });

    axios
      .get("http://localhost:8080/plate-appearances", { params })
      .then((response) => {
        setPAs(response.data);
      })
      .catch((error) => { });

    axios
      .get("http://localhost:8080/runners", { params })
      .then((response) => {
        setRunners(response.data);
      })
      .catch((error) => { });

  }, [pageRefresh]);


  const ballHandler = () => {
    axios
      .post("http://localhost:8080/ball", plateAppearance.game)
      .then((response) => {
        setPageRefresh(pageRefresh + 1);
      })
      .catch((error) => {

      });
  };

  const strikeHandler = () => {
    axios
      .post("http://localhost:8080/strike", plateAppearance.game)
      .then((response) => {
        setPageRefresh(pageRefresh + 1);
      })
      .catch((error) => {

      });
  };

  const inPlayHandler = () => {
    axios
      .post("http://localhost:8080/in-play", plateAppearance.game)
      .then((response) => {
        setPageRefresh(pageRefresh + 1);
      })
      .catch((error) => {

      });
  };

  const hitHandler = (bases) => {
    if (bases === 1) {
      axios
        .post("http://localhost:8080/single", plateAppearance.game)
        .then((response) => {
          setPageRefresh(pageRefresh + 1);
        })
        .catch((error) => {

        });
    }
    else if (bases === 2) {
      axios
        .post("http://localhost:8080/double", plateAppearance.game)
        .then((response) => {
          setPageRefresh(pageRefresh + 1);
        })
        .catch((error) => {

        });
    }
    else if (bases === 3) {
      axios
        .post("http://localhost:8080/triple", plateAppearance.game)
        .then((response) => {
          setPageRefresh(pageRefresh + 1);
        })
        .catch((error) => {

        });
    }
    else {
      axios
        .post("http://localhost:8080/homerun", plateAppearance.game)
        .then((response) => {
          setPageRefresh(pageRefresh + 1);
        })
        .catch((error) => {

        });
    }
    plateAppearance.inPlay = false;
  };
  const outHandler = () => {
    axios
      .post("http://localhost:8080/out", plateAppearance.game)
      .then((response) => {
        setPageRefresh(pageRefresh + 1);
      })
      .catch((error) => {

      });
    plateAppearance.inPlay = false;
  };

  const fcHandler = () => {
    axios
      .post("http://localhost:8080/fielders-choice", plateAppearance.game)
      .then((response) => {
        setPageRefresh(pageRefresh + 1);
        setFieldersChoice(true);
      })
      .catch((error) => {

      });
    plateAppearance.inPlay = false;
  };

  const endGameHandler = () => {
    axios
      .post("http://localhost:8080/end-game", plateAppearance.game)
      .then((response) => {
        history.push("/home");
      })
      .catch((error) => {

      });
  };

  const baseChangeHandler = (event) => {
    runnerBase = event.target.value;
  };

  const baseSubmitHandler = (i) => {
    runners[i].base = runnerBase;
    axios
      .post("http://localhost:8080/move", runners[i])
      .then((response) => {
        setPageRefresh(pageRefresh + 1);
      })
      .catch((error) => {

      });
  };



  const changeHeaderLayout = () => {
    if (plateAppearance.outs === 3) {
      return (
        <div className="card-header">
          Inning: {plateAppearance.inningNum}  |  Outs: 0 |  Ball: {plateAppearance.balls} |  Strike: {plateAppearance.strikes}
        </div>
      );
    }
    else if (plateAppearance.outs === 4) {
      return (
        <div className="card-header">
          Inning: {plateAppearance.inningNum}  |  Outs: 1 |  Ball: {plateAppearance.balls} |  Strike: {plateAppearance.strikes}
        </div>
      );
    }
    else if (plateAppearance.outs === 5) {
      return (
        <div className="card-header">
          Inning: {plateAppearance.inningNum}  |  Outs: 2 |  Ball: {plateAppearance.balls} |  Strike: {plateAppearance.strikes}
        </div>
      );
    }
    else {
      return (
        <div className="card-header">
          Inning: {plateAppearance.inningNum}  |  Outs: {plateAppearance.outs} |  Ball: {plateAppearance.balls} |  Strike: {plateAppearance.strikes}
        </div>
      );
    }
  }

  const toggleImage = () => {

    if (runners.length === 4) {
      return (
        <img className="card-img-top" src={scenario3} alt="Card image" />
      );
    }
    else if (runners.length === 3) {
      if (runners[1].base === 1 && runners[2].base === 2) {
        return (
          <img className="card-img-top" src={scenario2} alt="Card image" />
        );
      }
      else if (runners[1].base === 1 && runners[2].base === 3) {
        return (
          <img className="card-img-top" src={scenario5} alt="Card image" />
        );
      }
      else {
        return (
          <img className="card-img-top" src={scenario4} alt="Card image" />
        );
      }
    }
    else if (runners.length === 2) {
      if (runners[1].base === 1) {
        return (
          <img className="card-img-top" src={scenario1} alt="Card image" />
        );
      }
      else if (runners[1].base === 2) {
        return (
          <img className="card-img-top" src={scenario7} alt="Card image" />
        );
      }
      else {
        return (
          <img className="card-img-top" src={scenario6} alt="Card image" />
        );
      }
    }
    else {
      return (
        <img className="card-img-top" src={playfield} alt="Card image" />
      );
    }
  }


  const toggleResult = () => {
    if (typeof pas[1] !== 'undefined') {
      console.log(pas[1]);
      if (pas[1].strikes === 3) {
        return (
          <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} struck out!</td>
        );
      }
      else if (pas[1].balls === 4) {
        return (
          <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} walked!</td>
        );
      }
      else if (pas[1].base === 1) {
        if(isFieldersChoice === true) {
          return (
            <td>Last Result: Fielder's Choice!</td>
          );
        }
        else {
          return (
            <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} singled!</td>
          );
        }
      }
      else if (pas[1].base === 2) {
        return (
          <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} doubled!</td>
        );
      }
      else if (pas[1].base === 3) {
        return (
          <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} tripled!</td>
        );
      }
      else if (pas[1].base === 4) {
        return (
          <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} homered!</td>
        );
      }
      else if (pas[1].base === 5) {
        return (
          <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} got out!</td>
        );
      }
    }
  }


  const toggleOptions = () => {

    if (plateAppearance.inPlay === true) {
      return (
        <tbody>
          <tr >
            <td><button className="btn btn-outline-dark" onClick={() => hitHandler(1)} type="button">Single</button></td>
          </tr>
          <tr>
            <td><button className="btn btn-outline-dark" onClick={() => hitHandler(2)} type="button">Double</button></td>
          </tr>
          <tr>
            <td><button className="btn btn-outline-dark" onClick={() => hitHandler(3)} type="button">Triple</button></td>
          </tr>
          <tr>
            <td><button className="btn btn-outline-dark" onClick={() => hitHandler(4)} type="button">Home Run</button></td>
          </tr>
          <tr>
            <td><button className="btn btn-outline-dark" onClick={outHandler} type="button">Out</button></td>
          </tr>
          <tr>
            <td><button className="btn btn-outline-dark" onClick={fcHandler} type="button">Fielders Choice</button></td>
          </tr>
        </tbody>
      );
    }
    else {
      return (
        <tbody>
          <tr >
            <td><button className="btn btn-outline-dark" onClick={ballHandler} type="button">Ball</button></td>
          </tr>
          <tr>
            <td><button className="btn btn-outline-dark" onClick={strikeHandler} type="button">Strike</button></td>
          </tr>
          <tr>
            <td><button className="btn btn-outline-dark" onClick={inPlayHandler} type="button">Ball In Play</button></td>
          </tr>
          <tr>
            <td><button className="btn btn-outline-dark" onClick={endGameHandler} type="button">End Game</button></td>
          </tr>
          {toggleResult()}
        </tbody>
      );
    }
  }

  const toggleRunners = (num) => {
    let found = false;
    if (plateAppearance.inPlay === true) {
      for (let i = 0; i < runners.length; i++) {
        if (runners[i].base === num) {
          found = true;
        }

        if (found) {
          found = false;
          return (
            <tr>
              <th scope="row">{num}</th>
              <td>{runners[i].player.firstName} {runners[i].player.lastName}</td>
              <td>
                <select onChange={baseChangeHandler} name={runners[i]} className="select">
                  <option>Select</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={-1}>Out</option>
                </select>
                <button className="btn btn-primary" onClick={() => baseSubmitHandler(i)} type="submit">✓</button>
              </td>
            </tr>
          );
        }
        else if (runners[i] === runners[runners.length - 1]) {
          return (
            <tr>
              <th scope="row">{num}</th>
              <td>Empty</td>
              <td></td>
            </tr>
          )
        }
      }
    }
    else {
      for (let i = 0; i < runners.length; i++) {
        if (runners[i].base === num) {
          found = true;
        }

        if (found) {
          found = false;
          return (
            <tr>
              <th scope="row">{num}</th>
              <td>{runners[i].player.firstName} {runners[i].player.lastName}</td>
            </tr>
          );
        }
        else if (runners[i] === runners[runners.length - 1]) {
          return (
            <tr>
              <th scope="row">{num}</th>
              <td>Empty</td>
            </tr>
          )
        }
      }
    }
  }

  const toggleRunnerHead = () => {
    if (plateAppearance.inPlay === true) {
      return (
        <thead>
          <tr>
            <th scope="col">Base</th>
            <th scope="col">Player</th>
            <th scope="col">Base Change</th>
          </tr>
        </thead>
      );
    }
    else {
      return (
        <thead>
          <tr>
            <th scope="col">Base</th>
            <th scope="col">Player</th>
          </tr>
        </thead>
      );
    }
  }

  return (
    <div>
      <div className="game-score">
        <div className="card" style={{ width: "18rem" }}>
          {changeHeaderLayout()}
          <table className="card-table table">
            <thead>
              <tr>
                <th scope="col">Team</th>
                <th scope="col">Runs</th>
                <th scope="col">Hits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{plateAppearance.game.awayTeam.teamAbbr}</td>
                <td>{plateAppearance.game.awayScore}</td>
                <td>{plateAppearance.game.awayHits}</td>
              </tr>
              <tr>
                <td>{plateAppearance.game.homeTeam.teamAbbr}</td>
                <td>{plateAppearance.game.homeScore}</td>
                <td>{plateAppearance.game.homeHits}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="away-lineup">
        <div className="card" style={{ width: "20rem" }}>
          <div className="card-header align-self-center">
            Away Team: {plateAppearance.game.awayTeam.teamName}
          </div>
          <table className="card-table table">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Name</th>
                <th scope="col">Avg</th>
              </tr>
            </thead>
            <tbody>
              {awayTeamLineUp.map((player, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{player.firstName} {player.lastName}</td>
                    <td>{Number(player.stats.average).toFixed(3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="home-lineup">
        <div className="card" style={{ width: "20rem" }}>
          <div className="card-header align-self-center">
            Home Team: {plateAppearance.game.homeTeam.teamName}
          </div>
          <table className="card-table table">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Name</th>
                <th scope="col">Average</th>
              </tr>
            </thead>
            <tbody>
              {homeTeamLineUp.map((player, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{player.firstName} {player.lastName}</td>
                    <td>{Number(player.stats.average).toFixed(3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="runner-card">
        <div className="card" style={{ width: "370px" }}>
          {toggleImage()}
          <table className="card-table table">
            {toggleRunnerHead()}
            <tbody>
              {arr.map((num, index) => {
                return (
                  toggleRunners(num)
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="options">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-header">
            Batting Team: {plateAppearance.player.team.teamName}
          </div>
          <table className="card-table table">
            <thead>
              <tr>
                <th scope="col">Batter: {plateAppearance.player.firstName} {plateAppearance.player.lastName}</th>
              </tr>
            </thead>
            {toggleOptions()}
          </table>
        </div>
      </div>

    </div>

  );
}

export default PlayGame;