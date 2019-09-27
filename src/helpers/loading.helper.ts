class LoadingHelperController {
  private static instance: LoadingHelperController;
  private loadingWrapper: any;

  private constructor() {
    this.init();
  }

  public static getInstance(): LoadingHelperController {
    if (!LoadingHelperController.instance) {
      LoadingHelperController.instance = new LoadingHelperController();
    }
    return LoadingHelperController.instance;
  }

  public showLoading(): void {
    this.loadingWrapper.classList.remove('active');
    this.loadingWrapper.classList.add('active');
  }

  public hideLoading(): void {
    this.loadingWrapper.classList.remove('active');
  }

  private init(): void {
    this.loadingWrapper = document.querySelector('#main-loading');

    document.addEventListener(
      'click',
      (e: any) => {
        const isActiveLink = e.target.classList.contains('link-active');
        const hasLink = e.target.href && !e.target.href.includes('#');
        const isLink = e.target.tagName == 'A' && hasLink;
        if (!isLink || isActiveLink) {
          return;
        }

        this.showLoading();
      },
      false
    );
  }
}

const LoadingHelper = LoadingHelperController.getInstance();
export default LoadingHelper;
