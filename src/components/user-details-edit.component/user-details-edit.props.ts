import { UserViewModel } from '../../contracts/view-models/user-view.model';
import { SportModel } from '../../contracts/models/sport.model';

export interface UserDetailsEditProps {
  userDetails: UserViewModel;
  onValueChange: (name: any, value: any) => void;
  onDateChange?: (event: any) => void;
  onClose: (activities: Array<SportModel>) => void;
  handleChange: (event: any) => void;
}
