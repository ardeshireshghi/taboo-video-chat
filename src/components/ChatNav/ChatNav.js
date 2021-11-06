import { useHistory } from 'react-router-dom';
import { timeSince } from '../../utils/timeSince';

import {
  ChatList,
  ChatListItem,
  ChatItemAvatar,
  ChatName,
  ChatCreatedAt,
  ChatScrollArea
} from './styled-components';

export const ChatNav = ({ activeChats = [] }) => {
  const history = useHistory();

  return (
    <ChatScrollArea>
      <ChatList>
        {activeChats.map((chat) => (
          <ChatListItem
            onClick={() => history.push(`/chat/${chat.id}`)}
            key={chat.id}
          >
            <ChatItemAvatar text={chat.topic.name} />
            <div>
              <ChatName>{chat.topic.name}</ChatName>
              <ChatCreatedAt>
                Created {timeSince(chat.createdAt)} ago
              </ChatCreatedAt>
            </div>
          </ChatListItem>
        ))}
      </ChatList>
    </ChatScrollArea>
  );
};
