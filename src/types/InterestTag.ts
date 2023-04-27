import { ObjectId } from 'mongodb';

interface InterestTag {
  _id: string | ObjectId;
  name: string;
}

export default InterestTag;
