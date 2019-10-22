class ColorHelperClass {
  private static instance: ColorHelperClass;

  private constructor() {}

  public static getInstance() {
    if (!ColorHelperClass.instance) {
      ColorHelperClass.instance = new ColorHelperClass();
    }
    return ColorHelperClass.instance;
  }

  public generateRandomGradient(): string {
    const intR = Math.floor(Math.random() * 255) + 1;
    const intG = Math.floor(Math.random() * 255) + 1;
    const intB = Math.floor(Math.random() * 255) + 1;
    return `linear-gradient(rgba(${intR}, ${intG}, ${intB}, .01), rgba(${intR}, ${intG}, ${intB}, .08))`;
  }

  public generateUniqueGradient(text: string): string {
    if (!!text) {
      const result = this.stringToRgb(text);
      const intR = result.R;
      const intG = result.G;
      const intB = result.B;
      return `linear-gradient(rgba(${intR}, ${intG}, ${intB}, .01), rgba(${intR}, ${intG}, ${intB}, .08))`;
    }

    return this.generateRandomGradient();
  }

  public generateRgba(text: string, opacity: number) {
    if (!!text) {
      const result = this.stringToRgb(text);
      const intR = result.R;
      const intG = result.G;
      const intB = result.B;
      return `rgba(${intR}, ${intG}, ${intB}, ${opacity})`;
    }

    return this.generateRandomRgba(opacity);
  }

  private generateRandomRgba(opacity: number) {
    const intR = Math.floor(Math.random() * 255) + 1;
    const intG = Math.floor(Math.random() * 255) + 1;
    const intB = Math.floor(Math.random() * 255) + 1;
    return `rgba(${intR}, ${intG}, ${intB}, ${opacity})`;
  }

  public stringToRgb(text: string) {
    const value = this.stringToColor(text);
    return this.getRgbValue(value);
  }

  public stringToColor(text: string) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      // tslint:disable-next-line: no-bitwise
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    let colour = '#';
    for (let i = 0; i < 3; i++) {
      // tslint:disable-next-line: no-bitwise
      const value = (hash >> (i * 8)) & 0xff;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  public getRgbValue(hex: string) {
    return {
      R: this.hexToR(hex),
      G: this.hexToG(hex),
      B: this.hexToB(hex),
    };
  }

  private hexToR(hex: string) {
    return parseInt(this.cutHex(hex).substring(0, 2), 16);
  }

  private hexToG(hex: string) {
    return parseInt(this.cutHex(hex).substring(2, 4), 16);
  }

  private hexToB(hex: string) {
    return parseInt(this.cutHex(hex).substring(4, 6), 16);
  }

  cutHex(hex: string) {
    return hex.charAt(0) === '#' ? hex.substring(1, 7) : hex;
  }
}

const ColorHelper = ColorHelperClass.getInstance();
export default ColorHelper;
