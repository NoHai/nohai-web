export class DescriptionEventModel {
    Description!: string;
    Date: string = "Data";
    Time: string = "Ora";
    Duration!: number;
    IsValid: boolean = false;
}