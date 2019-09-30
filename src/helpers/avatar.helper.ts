class AvatarHelperController {
  private static instance: AvatarHelperController;

  private constructor() {}

  public static getInstance() {
    if (!AvatarHelperController.instance) {
      AvatarHelperController.instance = new AvatarHelperController();
    }
    return AvatarHelperController.instance;
  }

  public get(url: string, size: number = 64): string {
    return `${url}?s=${size}&d=mp`;
  }
}

const AvatarHelper = AvatarHelperController.getInstance();
export default AvatarHelper;
