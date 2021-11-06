import { memo } from 'react';
import { useEffect } from 'react';

import styled from 'styled-components';
import { ChatNav } from '../components/ChatNav';
import { useUserChat } from '../hooks/useUserChat';

const ChatNavStyledContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 300px;
  padding: 2rem 0;
  background-color: white;
  border-radius: 5px;
  height: 100%;
  display: none;

  @media all and (min-width: 1200px) {
    display: block;
  }
`;

const ChatNavTitle = styled.h5`
  font-weight: 600;
  padding: 0 1rem 1rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin: 0;
`;

const NoChatText = styled.div`
  padding: 1rem;
`;

const ChatNavContainer = () => {
  const { getChats, userChats } = useUserChat();

  useEffect(() => {
    getChats();
  }, [getChats]);

  return (
    <ChatNavStyledContainer>
      <ChatNavTitle>Active chats</ChatNavTitle>
      <ChatNav activeChats={userChats} />

      {userChats.length === 0 && (
        <NoChatText>No active chats, choose a new topic</NoChatText>
      )}
    </ChatNavStyledContainer>
  );
};

export default memo(ChatNavContainer);
