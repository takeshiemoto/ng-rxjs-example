import { Injectable } from '@angular/core';

export interface MockResponse {
  status: number;
  callNumber?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  constructor() {}

  async getInfo(n: number): Promise<MockResponse> {
    if (n === 5) {
      return {
        status: 400,
        callNumber: n
      };
    }

    const status = n === 0 ? 200 : 300;
    return {
      status,
      callNumber: n
    };
  }
}
