class ObjectHelperClass {
  private static instance: ObjectHelperClass;

  private constructor() {}

  public static getInstance() {
    if (!ObjectHelperClass.instance) {
      ObjectHelperClass.instance = new ObjectHelperClass();
    }
    return ObjectHelperClass.instance;
  }

  generateUniqueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
      // tslint:disable-next-line: no-bitwise
      const random = (Math.random() * 16) | 0;
      // tslint:disable-next-line: no-bitwise
      const value = character == 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}

const ObjectHelper = ObjectHelperClass.getInstance();
export default ObjectHelper;
