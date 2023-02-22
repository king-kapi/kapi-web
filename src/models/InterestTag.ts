import { ObjectId } from 'mongodb';

interface InterestTagModel {
  _id?: string | ObjectId;
  name: string;
}

class InterestTag implements InterestTagModel {
  _id?: ObjectId;
  name = "";

  constructor(init?:Partial<InterestTag>) {
    Object.assign(this, init);
  }

  static fromJson(json: InterestTagModel) {
    return new InterestTag({
      ...json,
      _id: new ObjectId(json._id),
    })
  }
}

export default InterestTag;
