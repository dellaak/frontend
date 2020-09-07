import React,{useState,useRef,useEffect} from "react"
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from "react-router-dom"
import "./style.scss"
import { StyledNavbar } from "./styledNavbar";
import authorizationService, { SESSION_TOKEN_EXPIRATION_DATE_KEY, SESSION_TOKEN_KEY } from "../../services/authService";


export const  Navbar = () =>{
  const [navBackground, setNavBackground] = useState(false)
  const navRef = useRef()
  navRef.current = navBackground

  useEffect(() => {
    const handleScroll = () => {
      const show = window.pageYOffset > 50
      if (navRef.current !== show) {
        setNavBackground(show)

      }
    }

    document.addEventListener('scroll', handleScroll)
    return () => {

      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLogOut = () =>{
    sessionStorage.removeItem(SESSION_TOKEN_EXPIRATION_DATE_KEY);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    window.location.href="/"
  }

    return (
      <div >
       
        <StyledNavbar position="fixed" className="navbar-style" scrolled={navBackground ? 1: 0} >
          <Toolbar>
            <div className="img-div">
            <Link to="/">
            <img src="/images/navlogo.svg" className="navbar-logo" />
            </Link>
            </div>
        {authorizationService.isAuthenticated()  && <>
          <Link to="/profile">
            <Button  className="profile-button-nav" >
                 <AccountCircleIcon className="user-icon"/>
                </Button>
                </Link>
          <Button onClick={handleLogOut} className="login-button-nav" >
          Log out
        </Button>
     
                </>
                }
                { !authorizationService.isAuthenticated()   && <Link to="/login">
            <Button className="login-button-nav" >
                  Login
                </Button>
                </Link>}
          </Toolbar>
     
          </StyledNavbar>
      </div>
    );
  }