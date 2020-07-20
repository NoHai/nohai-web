import { UserViewModel } from '../../contracts/view-models/user-view.model';

export interface UserDetailsEditProps {
  userDetails: UserViewModel;
  onValueChange: (name: any, value: any) => void;
  onDateChange?: (event: any) => void;
  onClose: (activities: Array<string>) => void;
  handleChange: (event: any) => void;
}
