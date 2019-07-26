import { UserModel } from "./user.model";
import { UserDetailsModel } from "./user-details.model";

export class UserViewModel {
    user!: UserModel;
    details!:UserDetailsModel;

    constructor(){
        this.user=new UserModel();
        this.details= new UserDetailsModel();
    }
}
