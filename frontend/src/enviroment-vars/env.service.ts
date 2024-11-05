import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  private envVariables: any;

  constructor(private http: HttpClient) {}

  loadEnv() {
    return this.http.get('/env').toPromise().then((env) => {
      this.envVariables = env;
      console.log('Environment variables:', this.envVariables);
    });
  }

  getEnvVar(key: string): string {
    return this.envVariables ? this.envVariables[key] : null;
  }
}
