class Logger {
  private provider = console;
  private context = '';

  constructor(context?: string) {
    if (context) {
      this.context = `[${context.toUpperCase()}]: `;
    }
  }

  public log(...data: unknown[]): void {
    return this.provider.log(this.context, ...data);
  }

  public info(...data: unknown[]): void {
    return this.provider.info(this.context, ...data);
  }

  public warn(...data: unknown[]): void {
    return this.provider.warn(this.context, ...data);
  }

  public error(...data: unknown[]): void {
    return this.provider.error(this.context, ...data);
  }

  public debug(...data: unknown[]): void {
    return this.provider.debug(this.context, ...data);
  }
}

export const makeLoggerWithContext = (context: string) => {
  return new Logger(context);
};

export default new Logger(); // The default logger
