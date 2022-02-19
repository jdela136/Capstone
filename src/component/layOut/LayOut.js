import Header from "../header/Header";
import Home from "../home/Home";
import {Route, withRouter} from 'react-router-dom';
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";
import Scores from "../scores/Scores";
import LeagueStats from "../leagueStats/LeagueStats";
import PlayGame from "../playGame/PlayGame";
import ChooseTeams from "../chooseTeams/ChooseTeams";
import AboutMe from "../../aboutMe/AboutMe";

const LayOut = () => {

    const toggleRoutes = () => {
        if(localStorage.getItem("loggedInLeague")) {
            return(
            <div style={{height: "100%"}}>
            <Header/>
            <Route exact path= "/" component={Home}/>
            <Route path= "/home" component={Home}/>
            <Route path= "/scores" component={Scores}/>
            <Route path= "/stats" component={LeagueStats}/>
            <Route path= "/play-game" component={ChooseTeams}/>
            <Route path= "/game/:gameId" component={PlayGame}/>
            <Route path= "/about-me" component={AboutMe}/>
        </div>
            )}
        else {
            return(
            <div style={{height: "100%"}}>
            <Route exact path= "/" component={SignIn}/>
            <Route path= "/sign-in" component={SignIn}/>
            <Route path= "/sign-up" component={SignUp}/>
        </div>
            )}
    }

    return (
        <div style={{height: "100%"}}>
            {toggleRoutes()}
        </div>
    );
};


export default withRouter(LayOut);