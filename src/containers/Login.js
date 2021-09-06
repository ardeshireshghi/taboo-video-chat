import React from 'react';
import { CardTitle, CardBody, Row, Col, Alert } from 'shards-react';

import { LoginForm } from '../components/LoginForm';
import { CenteredContainer } from '../components/shared/CenteredContainer';
import { useEmailLogin } from '../hooks/useEmailLogin';
import { DefaultCard } from '../components/shared/DefaultCard';

export default function Login() {
  const { submit, error, status } = useEmailLogin();

  const handleSubmit = (formData) => {
    submit(formData);
  };

  return (
    <CenteredContainer>
      <Row>
        <Col sm={{ size: 12, order: 2, offset: 0 }}>
          <DefaultCard>
            <CardBody>
              <CardTitle size="lg">Login with email</CardTitle>
              <LoginForm onSubmit={handleSubmit} />

              {error && (
                <Alert theme="danger">
                  There was a problem logging you in. Please try later
                </Alert>
              )}
              {status === 'success' && (
                <Alert theme="success">
                  An email with the login link has been sent
                </Alert>
              )}
            </CardBody>
          </DefaultCard>
        </Col>
      </Row>
    </CenteredContainer>
  );
}
