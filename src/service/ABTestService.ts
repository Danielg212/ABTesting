class ABTestService {
  public async getTest(test: any): Promise<any> {
    return Promise.resolve(test);
  }
}

export const abTestService = new ABTestService();
