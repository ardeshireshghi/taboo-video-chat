import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { CardTitle, Row, Col, Alert } from 'shards-react';

import { CenteredContainer } from '../components/shared/CenteredContainer';
import { Spinner } from '../components/shared/Spinner';
import { useAuth } from '../context/AuthContext';
import { useLoginWithToken } from '../hooks/useLoginWithToken';
import { semanticColorTokens } from '../styles/colors';

export default function MagicLogin() {
  const { user, error } = useLoginWithToken();
  const { setToken } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setToken(user.accessToken);
      history.push('/');
    }
  }, [user, history, setToken]);

  return (
    <CenteredContainer>
      <Row>
        <Col
          sm={{ size: 12, order: 2, offset: 0 }}
          style={{ textAlign: 'center' }}
        >
          <CardTitle size="lg">Logging you in</CardTitle>
          <Spinner size="md" color={semanticColorTokens.primary} />
          {error && (
            <Alert theme="light">
              There was a problem logging you <br />
              in with token. Please try later
            </Alert>
          )}
        </Col>
      </Row>
    </CenteredContainer>
  );
}
