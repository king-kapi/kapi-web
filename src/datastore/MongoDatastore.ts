import { Collection, Db, MongoClient } from 'mongodb'
import Collections from './Collections'
import UserCollection from './UserCollection'

class MongoDatastore {
  private static instance: MongoDatastore
  private datastore: Db = this.client.db(process.env.MONGO_DB_NAME ?? 'designthriving')
  public users: UserCollection = new UserCollection(this.datastore.collection(Collections.USERS))
  // TODO: Add type parameter to the following fields (Collection<?>)
  private chatsCol: Collection = this.datastore.collection(Collections.CHATS)
  private messagesCol: Collection = this.datastore.collection(Collections.MESSAGES)

  private constructor(private client: MongoClient) {}

  /**
   * Gets the MongoDatastore singleton
   */
  static async getInstance() {
    if (!MongoDatastore.instance) {
      // initialize new client
      const client = new MongoClient(
        process.env.MONGODB_CONNECTION_URI ?? 'mongodb://localhost:27017/'
      )
      try {
        console.log(`Attempting to connect to ${process.env.MONGODB_CONNECTION_URI}`)
        await client.connect()
        console.log('Successfully connected to MongoDB!')
        MongoDatastore.instance = new MongoDatastore(client)
      } catch (exception) {
        console.error('Something went wrong with MongoDB!')
        console.error(exception)
        await client.close()
      }
    }
    return MongoDatastore.instance
  }
}

// Consider using named exports
export default MongoDatastore
