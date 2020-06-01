import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  private url: string = environment.url
  constructor(private http: HttpClient) { }

  onlyAdmin() {
    return this.http.get(`${this.url}/example`);
  }
}
