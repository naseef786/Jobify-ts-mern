import React from 'react';
import NavBar from '../../components/header/Navbar';
import Test from '../../components/test/Test';
import Footer from '../../components/footer/Footer'
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useGetJobsQuery } from '../../hooks/jobHooks';
import { getError } from '../../utils';
import { ApiError } from '../../types/ApiError';

const HomePage: React.FC = () => {


  const { data: jobs, isLoading, error } = useGetJobsQuery();
console.log(jobs);

  if (isLoading) {
    return <LoadingBox />;
  }

  if (error) {
    return <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>;
  }

  return (
    <>
      <NavBar />
      <Container className='mt-3'>
        <Row>
          <Helmet>
            <title>jobify - Jobs</title>
          </Helmet>
          {jobs && jobs.length > 0 ? ( /* Add a check for 'jobs' and its length before mapping */
            jobs.map((job) => (
              <Col key={job.id} sm={6} md={4} lg={3}>
                <h1>{job.name}</h1>
                <li>{job.salary}</li>
                <li>{job.comapanyName}</li>
                <p>{job.jobDescsription}</p>
              </Col>
            ))
          ) : (
            <MessageBox variant="info">No jobs found.</MessageBox> /* Display a message when 'jobs' is empty or undefined */
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
