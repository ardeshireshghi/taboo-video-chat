import { Topic } from './Topic';
import { User } from './User';

type UserId = User['id'];

export interface Chat {
  id: string;
  topic: Topic;
  users: UserId[];
  createdAt?: string;
  updatedAt?: string;
}
