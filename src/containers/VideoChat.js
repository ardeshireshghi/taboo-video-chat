import React from 'react';
import { Row, Col, Alert } from 'shards-react';

import { VideoChat } from '../components/VideoChat';

import { useParams } from 'react-router-dom';
import { CenteredContainer } from '../components/shared/CenteredContainer';
import { useAuth } from '../context/AuthContext';
import { useUserChat } from '../hooks/useUserChat';
import { useEffect } from 'react';

export default function VideoChatContainer() {
  let { chatId } = useParams();
  const { getToken, getUser } = useAuth();
  const { value: tokenValue } = getToken();
  const { updateChat, updatedChat, error } = useUserChat();

  const user = getUser();

  useEffect(() => {
    updateChat(chatId);
  }, [chatId, updateChat]);

  return (
    <CenteredContainer>
      {updatedChat && (
        <Row>
          <Col sm={{ size: 12, order: 2 }}>
            <VideoChat
              roomName={chatId.replace(/-/g, '')}
              displayName={user.context.user.name}
              token={tokenValue}
            />
          </Col>
        </Row>
      )}
      {error && (
        <Alert theme="danger">
          There was a problem join the chat. Please try again later
        </Alert>
      )}
    </CenteredContainer>
  );
}
