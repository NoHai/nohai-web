import { createBrowserHistory } from 'history';

class HistoryHelperClass {
  private static instance: HistoryHelperClass;

  public history: any;
  private paths: string[];

  private constructor() {
    this.paths = new Array<string>();
    this.history = createBrowserHistory();
  }

  public static getInstance() {
    if (!HistoryHelperClass.instance) {
      HistoryHelperClass.instance = new HistoryHelperClass();
    }
    return HistoryHelperClass.instance;
  }

  public push(path: string, state: any = null) {
    if (this.isHome(path)) {
      this.goHome();
    } else if (this.isNewPath(path)) {
      this.optimizationCearPaths();
      this.paths.push(path);
      this.history.push(path, state);
    }
  }

  public goBack() {
    if (this.hasPaths()) {
      this.popFromPath();
      this.history.goBack();
    } else {
      this.goHome();
    }
  }

  public goHome() {
    this.paths = new Array<string>();
    this.history.replace('/', {});
  }

  public hasPaths() {
    return this.paths && this.paths.length > 0;
  }

  public isMainPage() {
    return this.isHome(this.history.location.pathname);
  }

  private popFromPath() {
    if (this.hasPaths) {
      this.paths.pop();
    }
  }

  private isHome(path: string) {
    return path === '/';
  }

  private isNewPath(path: string): boolean {
    return this.paths && (this.paths.length === 0 || this.paths[this.paths.length - 1] !== path);
  }

  private optimizationCearPaths() {
    if (this.paths.length > 20) {
      this.paths = this.paths.splice(1);
    }
  }
}

const HistoryHelper = HistoryHelperClass.getInstance();
export default HistoryHelper;
