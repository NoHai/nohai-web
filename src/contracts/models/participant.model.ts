import { BaseModel } from './base.model';

export class ParticipantModel extends BaseModel {
  public Status!: number;
  public FirstName!: string;
  public LastName!: string;
  public Url!: string;
}
