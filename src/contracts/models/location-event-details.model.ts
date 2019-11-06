export class LocationEventDetailsModel {
  County!: string;
  City!: string;
  StreetName!: string;
  Longitude?: number;
  Latitude?: number;
  IsValid: boolean = false;
}
