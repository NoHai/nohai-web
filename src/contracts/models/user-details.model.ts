import { BaseModel } from "./base.model";
import { SportModel } from "./sport.model";

export class UserDetailsModel extends BaseModel {
  public DateOfBirth!: string;
  public City?: string;
  public JobTitle?: string;
  public Description?: string;
  public FacebookPage?: string;
  public WebPage?: string;
  public Picture?: string;
  public Activities:Array<SportModel>

  constructor() {
    super();
    this.Activities = new Array<SportModel>();
  }
}
