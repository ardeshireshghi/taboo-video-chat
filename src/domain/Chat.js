export const ChatState = {
  Pending: 'pending',
  PartialJoin: 'partial_join',
  Fullfilled: 'fullfilled'
};

export class Chat {
  constructor(id, { topic, users, state, createdAt, updatedAt }) {
    this.id = id;
    this.topic = topic;
    this.users = users;
    this.state = state;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}
