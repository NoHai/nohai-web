class StoreUtilityController {
  private static instance: StoreUtilityController;
  public store: any;

  private constructor() {}

  public static getInstance() {
    if (!StoreUtilityController.instance) {
      StoreUtilityController.instance = new StoreUtilityController();
    }
    return StoreUtilityController.instance;
  }

  public init(store: any) {
    this.store = store;
  }
}

const StoreUtility = StoreUtilityController.getInstance();
export default StoreUtility;
