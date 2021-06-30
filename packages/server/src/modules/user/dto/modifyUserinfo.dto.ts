import { User } from '../user.entity';

export class UpdateUserinfoRequest {
  id: number;
  user: User;
}

export class UpdatePasswordRequest {
  id: number;
  user: User;
}
