import { IsInt, Min, IsDefined, MinLength} from "class-validator";
export class EventFormModel {
    @IsDefined()
    @MinLength(3)
    Sports!: number;
    @IsInt()
    @Min(1)
    TotalParticipants!: number;
    @IsInt()
    @Min(1)
    FreeSpots!: number;
    @IsInt()
    @Min(1)
    PriceForParticipant!: number;
}