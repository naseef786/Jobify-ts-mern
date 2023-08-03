import React, { useState } from 'react';
import { Navbar, Nav, Container, ButtonGroup, Button, NavDropdown } from 'react-bootstrap';
import { useContext, useEffect } from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Store } from '../../store/Store';
import { Link } from 'react-router-dom';
import './navbar.css'





function NavBar(): JSX.Element {



  const { state, dispatch } = useContext(Store)
  const {userInfo} = state
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', state.mode)
  }, [state.mode])
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const switchModeHandler = () => {
  //   console.log("theme changed");
    
  //   dispatch({ type: 'SWITCH_MODE' })
  // }

  
    const signoutHandler = () => {
      dispatch({ type: 'USER_SIGNOUT' })
      localStorage.removeItem('userInfo')
      
      window.location.href = '/login'
    }
  
  
  return (
    <header className='header'>
          {/* <Navbar expand="lg" className="navbar">
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
        <a style={{padding:'20px'}} className="nav-link">
          Log in
        </a>
        <a href="/signup"style={{padding:'20px'}} className="nav-link">
          Sign Up
        </a>  
      </Nav>
    </Navbar> */}
     <Navbar className="navbar" expand="lg">
      <Container><Navbar.Brand>
          
          <h5 className="navbar-brand" style={{width: '100%', height: '100%', textAlign: 'right', color: '#ffff', fontSize: 40, fontFamily: 'Patua One', fontWeight: '400', textTransform: 'uppercase', wordWrap: 'break-word'}}>JOBIFY</h5>
          </Navbar.Brand></Container>
      <Nav >
   <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <a href="/" className='navbar-links'>Home</a>
        <a href="/jobs"  className='navbar-links'>jobs</a>
        <a href="/"  className='navbar-links'>Services</a>
        <a href="/help"  className='navbar-links'>help</a>
         <a href="/contact"  className='navbar-links'>Contact</a>
        {/* <Button
          variant="link"
          className="theme-switch-button"
          onClick={switchModeHandler}
        >
          <i className={state.mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
        </Button> */}
         {userInfo ? (
                  <NavDropdown
                    className="header-link"
                    title={`Hello, ${userInfo.name}`}
                  >
                    {/* <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer> */}
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      {' '}
                      Sign Out{' '}
                    </Link>
                  </NavDropdown>
                ) : (
                  <NavDropdown className="header-link" title={`Hello, sign in`}>
                    <LinkContainer to="/login">
                      <NavDropdown.Item>Sign In</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
        </div>
      </Nav>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>
   
    </Navbar>
    </header>
  );
}

export default NavBar;
