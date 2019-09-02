export class ParticipantsEventDetailsModel {
    Sport!:string;
    Level!:number;
    TotalParticipants!: number;
    FreeSpots!: number;
    PriceForParticipant!: number;
    IsValid: boolean = false;
}