import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


export interface CbUserResponse {
  id: number;
  name: string;
}
export interface TempCbUserResponse {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CbUserService {
  private cbUsersUrl = 'http://localhost:8080/api/users';
  private tempCbUsersUrl = 'http://localhost:8080/api/temp/users';

  constructor(private http: HttpClient) {}

  getCbUsers(): Observable<CbUserResponse[]> {
      const headers = new HttpHeaders()
      .set('X-API-Key', 'test-key-abcde');

    return this.http.get<CbUserResponse[]>(this.cbUsersUrl,{ headers });
  }

  getTempCbUsers(): Observable<TempCbUserResponse[]> {
      const headers = new HttpHeaders()
      .set('X-API-Key', 'test-key-abcde');

    return this.http.get<TempCbUserResponse[]>(this.tempCbUsersUrl,{ headers });
  }

private baseUrl = 'http://localhost:8080/api/temp/users';

deleteUser(name: string) {
  const headers = new HttpHeaders({
    'X-API-Key': 'test-key-abcde'
  });

  // Ensure 'name' is appended to the path to match @PathVariable String name
  return this.http.delete<void>(`${this.baseUrl}/${name}`, { headers });
}

}