import { ReduxRegisterActionType } from '../../contracts/enums/actions';

export const changeRegisterDetails = (registerDetails: any) => {
  return {
    type: ReduxRegisterActionType.ChangeRegisterDetails,
    result: registerDetails,
  };
};
