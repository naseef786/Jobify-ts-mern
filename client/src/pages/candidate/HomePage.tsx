import React from 'react';
import NavBar from '../../components/header/Navbar';

import Footer from '../../components/footer/Footer'

import New from '../../components/New';
import TileNav from '../../components/header/TileNav';



const HomePage: React.FC = () => {



  return (<>
      <TileNav/>
      
      <New/>
      
     
      <Footer />
      </>
  );
};

export default HomePage;
