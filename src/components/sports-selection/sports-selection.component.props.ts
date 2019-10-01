import { SportModel } from '../../contracts/models/sport.model';

export interface SportSelectionProps {
  sport: SportModel;
  level: number;
  onCloseDrawer?: (sport: SportModel, level: number) => void;
}
