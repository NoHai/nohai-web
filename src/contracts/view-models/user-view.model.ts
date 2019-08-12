import { UserModel } from "../models/user.model";
import { UserDetailsModel } from "../models/user-details.model";

export class UserViewModel {
    user!: UserModel;
    details!:UserDetailsModel;

    constructor(){
        this.user=new UserModel();
        this.details= new UserDetailsModel();
    }
}
