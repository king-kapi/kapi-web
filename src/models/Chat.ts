import { ObjectId } from 'mongodb';
import User from './User';

type Chat = {
  _id?: ObjectId;
  users: User[];
};

export class ChatBuilder {
  chat: Chat;

  constructor() {
    this.chat = {
      users: []
    };
  }

  setId(_id: ObjectId) {
    this.chat._id = _id;
    return this;
  }

  addUser(user: User) {
    this.chat.users.push(user);
    return this;
  }

  build(): Chat {
    return this.chat;
  }


}

export default Chat;
