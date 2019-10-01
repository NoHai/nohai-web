import { ReduxCommonActionType } from '../../contracts/enums/actions';

const initialTestState = {};

const testReducer = (state: any = initialTestState, action: any) => {
  switch (action.type) {
    case ReduxCommonActionType.Default:
    default:
      return state;
  }
};

export default testReducer;
