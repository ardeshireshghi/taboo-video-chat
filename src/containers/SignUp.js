import React from 'react';
import { Card, CardTitle, CardBody, Row, Col, Alert } from 'shards-react';

import { useHistory } from 'react-router-dom';

import { SignUpForm } from '../components/SignUpForm';
import { CenteredContainer } from '../components/shared/CenteredContainer';
import { useSignUp } from '../hooks/useSignUp';
import { useEffect } from 'react';

export default function SignUp() {
  let history = useHistory();
  const { user, submit, error } = useSignUp();

  const handleSubmit = (formData) => {
    submit(formData);
  };

  useEffect(() => {
    if (user) {
      history.push('/choose-topic');
    }
  }, [user, history]);

  return (
    <CenteredContainer>
      <Row>
        <Col
          sm={{ size: 6, order: 2, offset: 3 }}
          lg={{ size: 4, order: 2, offset: 4 }}
        >
          <Card>
            <CardBody>
              <CardTitle>Sign up for Taboo</CardTitle>
              <SignUpForm onSubmit={handleSubmit} />
              {error && (
                <Alert theme="danger">
                  There was a problem signing you up. Please try later
                </Alert>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </CenteredContainer>
  );
}
