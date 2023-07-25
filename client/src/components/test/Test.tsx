import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { sampleJobs } from '../../data';

const Test: React.FC = () => {
  return (
    <main>
      <Container className='mt-3'>
        <Row>
          {sampleJobs.map((jobs) => (
            <Col key={jobs.id} sm={6} md={4} lg={3}>
              <h1>{jobs.name}</h1>
              <li>{jobs.salary}</li>
              <li>{jobs.comapanyName}</li>
              <p>{jobs.jobDescsription}</p> {/* Fix typo: jobDescsription -> jobDescription */}
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default Test;
