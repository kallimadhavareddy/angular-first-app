import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ApiResponse {
  exchangeRateResponse: ExchangeRateResponse;
  headerResponse: HeaderResponse;
  user: User;
}

export interface ExchangeRateResponse {
  provider: string;
  WARNING_UPGRADE_TO_V6: string;
  terms: string;
  base: string;
  date: string; // ISO date string
  time_last_updated: number;
  rates: Record<string, number>; // dynamic currency codes
  error: string | null;
}
export interface HeaderResponse {
  args: Record<string, any>;
  headers: HeadersMap;
  origin: string;
  url: string;
  error: string | null;
}

export interface HeadersMap {
  Accept: string;
  'Accept-Encoding': string;
  'Content-Type': string;
  Host: string;
  'User-Agent': string;
  'X-Amzn-Trace-Id': string;
  [key: string]: string;
}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  errorResponse: string | null;
}
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}


export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}


@Injectable({
  providedIn: 'root',
})
export class AsyncService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private asyncUrl ="http://localhost:8080/api/all"

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

    getAsyncAgregationResults(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.asyncUrl);
  }

}
