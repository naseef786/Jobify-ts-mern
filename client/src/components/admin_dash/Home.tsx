import React, { useContext, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Store } from '../../store/Store';
import { useGetCandidatesQuery, useGetRecruitersQuery } from '../../hooks/adminHooks';
import { useGetJobsQuery } from '../../hooks/jobHooks';


const Home: React.FC = () => {

  const { state, dispatch } = useContext(Store)
  const { adminInfo } = state
  const token = adminInfo.token
  const { data: recruiters,  } = useGetRecruitersQuery(token);
  const { data: Candidates,  } = useGetCandidatesQuery(token);
  const {data:Jobs} =useGetJobsQuery(token)

  // useEffect(()=>{
  //   if(recruiters){
  //     dispatch({ type: 'S', payload: job })
  //   }
  // },[])

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
          
            <Link to='/admin/recruiters'>   <h3>Recruiters</h3></Link>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{recruiters?.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
           
            <Link to='/admin/candidates'>  <h3>Candidates signed</h3></Link>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{Candidates?.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
           
            <Link to='/admin/jobposts'> <h3>Total job Posts</h3></Link>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{Jobs?.length}</h1>
        </div>
        {/* <div className='card'>
          <div className='card-inner'>
            <h3>ALERTS</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>42</h1>
        </div> */}
      </div>
    </main>
  );
}

export default Home;
