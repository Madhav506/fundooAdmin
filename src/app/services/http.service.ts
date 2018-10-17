import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://34.213.106.173/api/'

  constructor(public  http: HttpClient) { }

  addDataService(url, body) {

    url = this.url + url;

    return this.http.post(url, body);

  }
  
}
