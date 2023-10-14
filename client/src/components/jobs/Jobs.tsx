import React, { useContext, useEffect } from 'react';

import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useGetJobsQuery } from '../../hooks/jobHooks';
import { getError } from '../../utils';
import { ApiError } from '../../types/ApiError';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../store/Store';
import { Job, Jobs } from '../../types/Jobs';


const Jobs: React.FC = () => {
const navigate = useNavigate()
const {state,dispatch} = useContext(Store)
const {userInfo,jobs} = state

const token = userInfo.token
  const { data: fetchedJobs, isLoading, error } = useGetJobsQuery(token);


useEffect(() => {
  // Fetch jobs from your backend server
  if(fetchedJobs) dispatch({ type: 'STORE_JOBS', payload: fetchedJobs });
   
}, [dispatch,jobs]);


  if (isLoading) {
    return <LoadingBox />;
  }

  if (error) {
    return <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>;
  }

  return (<>

    <div className='page-wrapper' style={{background:'white'}}>
     
      <Container className=' main mt-3' style={{paddingTop: '100px',background:'wheat'}}>
        <Row style={{gap:'8px'}}>
          <Helmet>
            <title>jobify - Jobs</title>
          </Helmet>
          {jobs && jobs.length > 0 ? ( /* Add a check for 'jobs' and its length before mapping */
            jobs.map((job) => (
              <Col key={job.id} className='jobcard' sm={6} md={4} lg={3}>
                <h1 style={{textAlign:'center'}}>{job.title}</h1>
                <p style={{textAlign:'center'}}>company : {job.company}</p>
                <li>salary : {job.salary}</li>
                <li>Location :{job.location}</li>
                <li>requirements : {job.description}</li> 
          
                <button  className='buttonapply' onClick={()=>{  navigate('/applyform')            }}>apply now</button>
              </Col>
            ))
          ) : (
            <MessageBox variant="info">No jobs found.</MessageBox> /* Display a message when 'jobs' is empty or undefined */
          )}
        </Row>
      </Container>
     
      </div>
      
 
      </>
  );
};

export default Jobs;
