import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";
import playfield from "../../images/playfield.jpeg";
import scenario4 from "../../images/scenario4.jpg";
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

  }, [pageRefresh]);


  const ballHandler = () => {
    axios
      .post("http://localhost:8080/ball", plateAppearance.game)
      .then((response) => {
        setPageRefresh(pageRefresh + 1);
      })
      .catch((error) => {
        console.log();
      });
  };

  const strikeHandler = () => {
    axios
      .post("http://localhost:8080/strike", plateAppearance.game)
      .then((response) => {
        setPageRefresh(pageRefresh + 1);
      })
      .catch((error) => {
        console.log();
      });
  };

  const inPlayHandler = () => {
    axios
      .post("http://localhost:8080/in-play", plateAppearance.game)
      .then((response) => {
        setPageRefresh(pageRefresh + 1);
      })
      .catch((error) => {
        console.log();
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
          console.log();
        });
    }
    else if (bases === 2) {
      axios
        .post("http://localhost:8080/double", plateAppearance.game)
        .then((response) => {
          setPageRefresh(pageRefresh + 1);
        })
        .catch((error) => {
          console.log();
        });
    }
    else if (bases === 3) {
      axios
        .post("http://localhost:8080/triple", plateAppearance.game)
        .then((response) => {
          setPageRefresh(pageRefresh + 1);
        })
        .catch((error) => {
          console.log();
        });
    }
    else {
      axios
        .post("http://localhost:8080/homerun", plateAppearance.game)
        .then((response) => {
          setPageRefresh(pageRefresh + 1);
        })
        .catch((error) => {
          console.log();
        });
    }
  };
  const outHandler = () => {
    axios
      .post("http://localhost:8080/out", plateAppearance.game)
      .then((response) => {
        setPageRefresh(pageRefresh + 1);
      })
      .catch((error) => {
        console.log();
      });
  };

  const endGameHandler = () => {
    axios
      .post("http://localhost:8080/end-game", plateAppearance.game)
      .then((response) => {
        history.pushState("/home");
      })
      .catch((error) => {
        console.log();
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

  const toggleResult = () => {
    if(pas[1].strikes === 3) {
      return(
        <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} struck out!</td>
      );
    }
    if(pas[1].balls === 4) {
      return(
        <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} walked!</td>
      );
    }
    if(pas[1].base === 1) {
      return(
        <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} singled!</td>
      );
    }
    if(pas[1].base === 2) {
      return(
        <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} doubled!</td>
      );
    }
    if(pas[1].base === 3) {
      return(
        <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} tripled!</td>
      );
    }
    if(pas[1].base === 4) {
      return(
        <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} homered!</td>
      );
    }
    if(pas[1].base === 5) {
      return(
        <td>Last Result: {pas[1].player.firstName} {pas[1].player.lastName} got out!</td>
      );
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

    for (let i = 0; i < pas.length; i++) {
      if (pas[i].base === num) {
        found = true;
      }

      if (found) {
        found = false;
        return (
          <tr>
            <th scope="row">{num}</th>
            <td>{pas[i].player.firstName} {pas[i].player.lastName}</td>
          </tr>
        );
      }
      else if (pas[i] === pas[pas.length - 1]) {
        return (
          <tr>
            <th scope="row">{num}</th>
            <td>Empty</td>
          </tr>
        )
      }
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
                <td>{plateAppearance.game.awayTeam.teamName}</td>
                <td>{plateAppearance.game.awayScore}</td>
                <td>{plateAppearance.game.awayHits}</td>
              </tr>
              <tr>
                <td>{plateAppearance.game.homeTeam.teamName}</td>
                <td>{plateAppearance.game.homeScore}</td>
                <td>{plateAppearance.game.homeHits}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="away-lineup">
        <div className="card" style={{ width: "18rem" }}>
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
        <div className="card" style={{ width: "18rem" }}>
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
        <div className="card" style={{ width: "250px" }}>
          <img className="card-img-top" src={scenario4} alt="Card image" />
          <table className="card-table table">
            <thead>
              <tr>
                <th scope="col">Base</th>
                <th scope="col">Player</th>
              </tr>
            </thead>
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