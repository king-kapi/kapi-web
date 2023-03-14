import { MongoClient } from 'mongodb';
import ChatsCollection from './ChatsCollection';
import Collections from './Collections';
import MessagesCollection from './MessagesCollection';
import PostsCollection from './PostsCollection';
import UserCollection from './UserCollection';

class MongoDatastore {
  private static instance: MongoDatastore;
  private datastore = this.client.db(process.env.MONGO_DB_NAME ?? 'designthriving');
  public users = new UserCollection(this.datastore.collection(Collections.USERS));
  public chats = new ChatsCollection(this.datastore.collection(Collections.CHATS), this);
  public messages = new MessagesCollection(this.datastore.collection(Collections.MESSAGES));
  public posts = new PostsCollection(this.datastore.collection(Collections.POSTS), this);

  private constructor(private client: MongoClient) {}

  /**
   * Gets the MongoDatastore singleton
   */
  static async getInstance() {
    if (!MongoDatastore.instance) {
      // initialize new client
      const client = new MongoClient(
        process.env.MONGODB_CONNECTION_URI ?? 'mongodb://localhost:27017/'
      );
      try {
        console.log(`Attempting to connect to ${process.env.MONGODB_CONNECTION_URI}`);
        await client.connect();
        console.log('Successfully connected to MongoDB!');
        MongoDatastore.instance = new MongoDatastore(client);
      } catch (exception) {
        console.error('Something went wrong with MongoDB!');
        console.error(exception);
        // TODO: Error handling? should we just throw uncaught exception or retry?
        await client.close();
      }
    }
    return MongoDatastore.instance;
  }
}

// Consider using named exports
export default MongoDatastore;
