import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


export interface CbUserResponse {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CbUserService {
  private cbUsersUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getCbUsers(): Observable<CbUserResponse[]> {
      const headers = new HttpHeaders()
      .set('X-API-Key', 'test-key-abcde');

    return this.http.get<CbUserResponse[]>(this.cbUsersUrl,{ headers });
  }
}
