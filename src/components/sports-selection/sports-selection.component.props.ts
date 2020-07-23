import { SportModel } from "../../contracts/models/sport.model";

export interface SportSelectionProps {
  acivities: any;
  multiple?: boolean;
  onClose: (activities: Array<SportModel>) => void;
}
