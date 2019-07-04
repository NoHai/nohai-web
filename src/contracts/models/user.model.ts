import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
    public FirstName!: string;
    public LastName!: string;
    public Email!: string;
    public Url!:string;
}
