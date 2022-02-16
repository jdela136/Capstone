import Jonathan_Headshot from "../images/Jonathan_Headshot.jpeg";
import photo1 from "../images/photo1.jpg";
import photo2 from "../images/photo2.jpg";
import photo3 from "../images/photo3.jpg";
function AboutMe() {
    return (
        <div className="about-me">
            <div className="container-fluid bg-1 text-center cont">
                <h2 className="margin">About Me</h2>
                <img src={Jonathan_Headshot} className="img-responsive img-circle margin" style={{ display: "inline" }} width="250" height="250" />
                <h1>Jonathan De La Cruz</h1>
            </div>

            <div className="container-fluid bg-2 text-center cont">
                <h3 className="margin">Full Stack Software Developer</h3>
                <p>I am a Full Stack Software Developer who is proficient is problem solving. I have a military background as a member of the United States Air Force and have been awarded a secret clearance. Recently, I was a nominee for Airman of the Year at Homestead Air Reserve Base.</p>
                <br/>
                <p>I am passionate about achieving my goals and my current goal is becoming a Software Engineer. I have acquired proficient knowledge on many languages and technologies on my journey to include, Java, C#, ReactJS, Spring, .NET Framework, T-SQL, HTML, CSS, and JavaScript. I am an expeditious learner with a capability to learn new languages and technologies if need be.</p>
                <br/>
                <p>I was born in Dominican Republic. I country that loves baseball. So of course, I grew up loving and playing baseball. I started playing softball once I graduated high school and I loved it. It's essentially an easier version of baseball!</p>
                <br/>
                <p>Unfortunately we didn't have a way to keep track of the team's statistics. This is my solution!</p>
                
            </div>

            <div className="container-fluid bg-3 text-center cont">
                <h3 className="margin">Where To Find Me?</h3><br />
                <div className="row">
                    <div className="col-sm-4">
                        <a href="https://www.linkedin.com/in/jdela136/">LinkedIn</a>
                        <img src={photo1} className="img-responsive margin" style={{ width: "81%" }} alt="Image" />
                    </div>
                    <div className="col-sm-4">
                        <a href="https://github.com/jdela136">GitHub</a>
                        <img src={photo2} className="img-responsive margin" style={{ width: "100%" }} alt="Image" />
                    </div>
                    <div className="col-sm-4">
                        <a href="mailto: jdela136@gmail.com">Email: jdela136@gmail.com</a>
                        <img src={photo3} className="img-responsive margin" style={{ width: "100%" }} alt="Image" />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutMe;