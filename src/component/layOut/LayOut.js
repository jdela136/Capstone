import Header from "../header/Header";
import Home from "../home/Home";
import {Route, withRouter} from 'react-router-dom';
import SignIn from "../signIn/SignIn";
import ThankYou from "../thankYou/ThankYou";
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
            <div>
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
            <div>
            <Route exact path= "/" component={SignIn}/>
            <Route path= "/sign-in" component={SignIn}/>
            <Route path= "/sign-up" component={SignUp}/>
            <Route path= "/thank-you" component={ThankYou}/>
        </div>
            )}
    }

    return (
        <div>
            {toggleRoutes()}
        </div>
    );
};


export default withRouter(LayOut);