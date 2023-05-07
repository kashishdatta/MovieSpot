// NavBar Component
import { Link } from "react-router-dom";
import "./styles/NavBarStyles.css";
import Logo from "./images/moviespot.png";

const NavBar = ({ isHome }) => {
    const gitRepoLink =
        "/sign-in"
        
    
    
    return (
        <div className="container header">
            <Link to="/">
                <img src={Logo} className="logo" alt="" />
            </Link>


             {/* if isHome then the button is the github button else its the home button */}
             {isHome ? (
                <a href="/home" className="header-btn1 bouncy">
                    <i className="fas fa-home"></i> Home
                </a>
            ) : (
                <a
                    href={gitRepoLink}
                    
                    rel="noreferrer"
                    className="header-btn1 bouncy"
                >
                    <i className="fas fa-home"></i> Log Out
                </a>
            )} 
           
       
        </div>
    );
};

export default NavBar;
