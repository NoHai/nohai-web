import { IsDefined, MinLength, IsDate} from "class-validator";
export class LocationEventDetailsModel {
    @IsDefined()
    @MinLength(3)
    District: string='';

    @IsDefined()
    @MinLength(3)
    City: string='';

    @IsDefined()
    @MinLength(3)
    @IsDate()
    Address: string='';
    IsValid: boolean = false;
}