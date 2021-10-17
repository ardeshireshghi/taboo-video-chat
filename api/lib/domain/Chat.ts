import { Topic } from './Topic';
import { User } from './User';

type UserId = User['id'];

export enum ChatState {
  Pending = 'pending',
  PartialJoin = 'partial_join',
  Fullfilled = 'fullfilled'
}
export interface Chat {
  id: string;
  topic: Topic;
  users: UserId[];
  state: ChatState;
  createdAt?: string;
  updatedAt?: string;
  joinedUsers?: Record<UserId, { lastJoinedAt: string }>;
}
