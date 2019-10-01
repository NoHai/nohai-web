export default class LocalStorageHelper {
  public static SaveItemToLocalStorage(storageName: string, model: any) {
    localStorage.setItem(storageName, JSON.stringify(model));
  }
  public static GetItemFromLocalStorage(storageName: string, model: any) {
    if (localStorage.getItem(storageName) !== null) {
      return JSON.parse(localStorage.getItem(storageName) || '{}');
    } else return model;
  }
  public static DeleteItemFromLocalStorage(storageName: string) {
    localStorage.removeItem(storageName);
  }
}
