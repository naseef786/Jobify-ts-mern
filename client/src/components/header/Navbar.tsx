import React from 'react';
import { Navbar, Nav, Container, ButtonGroup, Button } from 'react-bootstrap';
import { useContext, useEffect } from 'react'
import { Store } from '../../store/Store';
import { Link } from 'react-router-dom';
import './navbar.css'





function NavBar(): JSX.Element {
  const { state, dispatch } = useContext(Store)
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', state.mode)
  }, [state.mode])

  const switchModeHandler = () => {
    console.log("theme changed");
    
    dispatch({ type: 'SWITCH_MODE' })
  }
  return (
    <header className='header'>
          <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand>
          
        <h5 className="Jobify" style={{width: '100%', height: '100%', textAlign: 'right', color: '020A35', fontSize: 40, fontFamily: 'Patua One', fontWeight: '400', textTransform: 'uppercase', wordWrap: 'break-word'}}>JOBIFY</h5>
        </Navbar.Brand>
      </Container>
      <Nav>
        <Button
          variant="link"
          className="theme-switch-button"
          onClick={switchModeHandler}
        >
          <i className={state.mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
        </Button>
        <a href="/about" style={{padding:'20px'}} className="nav-link">
          about
        </a>
        <a href="/help"style={{padding:'20px'}} className="nav-link">
          help
        </a>
        <a href="/contact"style={{padding:'20px'}} className="nav-link">
          contact
        </a>
        <a href="/login"style={{padding:'20px'}} className="nav-link">
          Log in
        </a>
        <a href="/signup"style={{padding:'20px'}} className="nav-link">
          Sign Up
        </a>
      </Nav>
    </Navbar>
    </header>
  );
}

export default NavBar;
