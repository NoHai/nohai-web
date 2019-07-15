import { IsInt, Min, IsDefined, IsDate} from "class-validator";
export class ParticipantsEventDetailsModel {
    @IsDefined()
    @IsInt()
    @Min(1,{
        message: "Valoarea trebuie sa fie mai mare ca 1"
    })
    @IsDate()
    TotalParticipants: number=0;
    TotalParticipantsError:string=""

    @IsDefined()
    @IsInt()
    @Min(1)
    FreeSpots: number=0;
    FreeSpotsError:string=""

    @IsDefined()
    @IsInt()
    @Min(1)
    PriceForParticipant: number=0;
    PriceForParticipantError:string="";
    IsValid: boolean = false;
}