import { UserModel } from '../models/user.model';
import { UserDetailsModel } from '../models/user-details.model';
import { SportModel } from '../models/sport.model';

export class UserViewModel {
  user!: UserModel;
  details!: UserDetailsModel;
  sport!: SportModel;

  constructor() {
    this.user = new UserModel();
    this.details = new UserDetailsModel();
    this.sport = new SportModel();
  }
}
