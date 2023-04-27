import { ObjectId } from 'mongodb';
import PermissionLevel from './PermissionLevel';

type ServerUser = {
  _id: ObjectId;
  userId: ObjectId;
  serverId: ObjectId;
  permissionLevel: PermissionLevel; // tbd but could be an enum
};

export default ServerUser;
