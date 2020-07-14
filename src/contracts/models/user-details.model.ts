export class UserDetailsModel {
  public DateOfBirth!: string;
  public City?: string;
  public JobTitle?: string;
  public Description?: string;
  public FacebookPage?: string;
  public WebPage?: string;
  public Picture?: string;
  public Activities!: Array<string>;

  constructor() {
    this.Activities = new  Array<string>();
  }
}
