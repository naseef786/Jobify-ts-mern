import React, { useContext } from 'react';
import New from '../../components/New';
import Testinomial from '../../components/testinomial/Testinomimial';
import { Store } from '../../store/Store';



const HomePage: React.FC = () => {
const {state} = useContext(Store)
const {userInfo} = state


  return (<>

   {!userInfo  &&   <New/>}
      <Testinomial/>
      </>
  );
};

export default HomePage;
