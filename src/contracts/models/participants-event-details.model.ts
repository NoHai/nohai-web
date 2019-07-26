export class ParticipantsEventDetailsModel {
    Sport!:string;
    Level!:string;
    TotalParticipants!: number;
    FreeSpots!: number;
    PriceForParticipant!: number;
    IsValid: boolean = false;
}