class Metrics {
  private metrics: Record<string, number> = {};

  constructor() {}

  public addMetric(name: string, value: number): void {
    this.metrics[name] = value;
  }

  public getMetrics(): Record<string, number> {
    return this.metrics;
  }

  public incrementMetric(name: string): void {
    if (this.metrics[name]) {
      this.metrics[name] += 1;
    } else {
      this.metrics[name] = 1;
    }
  }
}

export const metrics = new Metrics();
