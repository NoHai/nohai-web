import { SportModel } from '../../contracts/models/sport.model';

export interface SportSelectionProps {
  sport: SportModel;
  onCloseDrawer?: (sport: SportModel, level: number) => void;
}
