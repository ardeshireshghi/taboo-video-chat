import styled from 'styled-components';
import { stringToColor } from '../../utils/stringToColor';

export const ChatList = styled.ul`
  padding: 0;
`;

export const ChatListItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0;
  list-style-type: none;
  padding: 1rem;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
`;

export const ChatItemAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 0.5rem;
  position: relative;
  background-color: ${({ text }) => stringToColor(text)};
  color: white;
  font-weight: 700;

  &::after {
    content: ${({ text }) => `'${text.slice(0, 1)}'`};
    position: absolute;
    text-transform: uppercase;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`;

export const ChatName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.1rem;
  margin-bottom: 0.2rem;
`;

export const ChatCreatedAt = styled.div`
  font-size: 0.8rem;
`;

export const ChatScrollArea = styled.div`
  height: 100%;
  overflow: auto;
`;
