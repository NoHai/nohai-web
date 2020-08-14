import { UserModel } from './user.model';

export class CommentModel {
  public Id?: string;
  public Owner?: string;
  public Event?: string;
  public Description?: string;
  public Date?: Date;
  public User!: UserModel;
  public UserId?: string;
  public EventId?: string;

  constructor() {
    this.User = new UserModel();
  }
}
