import React from 'react';
import { Row, Col } from 'shards-react';

import { VideoChat } from '../components/VideoChat';

import { useParams } from 'react-router-dom';
import { CenteredContainer } from '../components/shared/CenteredContainer';
import { useAuth } from '../context/AuthContext';

export default function VideoChatContainer() {
  let { chatId } = useParams();
  const { getToken, getUser } = useAuth();
  const { value: tokenValue } = getToken();

  const user = getUser();

  return (
    <CenteredContainer>
      <Row>
        <Col sm={{ size: 12, order: 2 }}>
          <VideoChat
            roomName={chatId.replace(/-/g, '')}
            displayName={user.context.user.name}
            token={tokenValue}
          />
        </Col>
      </Row>
    </CenteredContainer>
  );
}
