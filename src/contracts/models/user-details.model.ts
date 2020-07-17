import { BaseModel } from "./base.model";

export class UserDetailsModel extends BaseModel {
  public DateOfBirth!: string;
  public City?: string;
  public JobTitle?: string;
  public Description?: string;
  public FacebookPage?: string;
  public WebPage?: string;
  public Picture?: string;
  public ActivitiesId!: Array<string>;
  public ActivitiesName!: Array<string>;

  constructor() {
    super();
    this.ActivitiesId = new  Array<string>();
    this.ActivitiesName = new  Array<string>();
  }
}
