import { ObjectId } from 'mongodb';
import PermissionLevel from './PermissionLevel';

type ServerUser = {
  _id: ObjectId;
  user_id: ObjectId;
  server_id: ObjectId;
  permission_level: PermissionLevel; // tbd but could be an enum
};

export default ServerUser;
