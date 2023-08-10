import React from 'react'
import Login from '../../components/login/Login'
import NavBar from '../../components/header/Navbar'
import Footer from '../../components/footer/Footer'
import SignIn from '../../components/login/SignIn'
import TileNav from '../../components/header/TileNav'

export default function Loginpage() {
  return (
    <>
      {/* <NavBar />  */}
      <TileNav/>
      {/* <Login /> */}
      <SignIn/>
      <Footer /></>
  )
}

