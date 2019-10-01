import { BaseModel } from './base.model';

export class EventModel extends BaseModel {
  public Owner!: string;
  public Name!: string;
  public Description?: string;
}
