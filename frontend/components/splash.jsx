import React from "react";
import { Link } from "react-router-dom";

class Splash extends React.Component {

    render() {
        return (
            <>
            <div className="splash-background"></div>
            <div className="splash">
                <div className="splash-nav">
                    <div className="logo"><i className="fa-brands fa-discord"/><span className="spicord">Spicord</span></div>
                    <div className="links">
                        <a href="#">Github</a>
                        <a href="#">LinkedIn</a>
                        <a href="#">Portfolio</a>
                    </div>
                    <Link to="/login" className="button small white"
                    >Login</Link>
                </div>
                <div className="body">
                    <div className="inside">
                        <h1 className="header">IMAGINE A PLACE...</h1>
                        <div className="paragraph">...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</div>
                        <div className="buttons">
                            <Link to="/signup" className="button big white"><i className="fa-solid fa-user-plus"></i>Sign up now!</Link>
                            <Link to="/login" className="button big black">Open Spicord in your browser</Link>
                        </div>
                    </div>
                    <div className="body-background">
                        <div className="body-background-inside">
                            <img src="assets/clouds.svg" className="clouds" />
                            <img src="assets/left.svg" className="left" />
                            <img src="assets/right.svg" className="right" />
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Splash;