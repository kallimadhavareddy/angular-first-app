// add-user.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  imports: [FormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {   // <-- must match the export name
  user = {  name: '' };

  constructor(private http: HttpClient) {}

  submitUser() {
    const apiUrl = 'http://localhost:8080/api/users';
    const headers = new HttpHeaders({
      'X-API-Key': 'test-key-abcde',
      'Content-Type': 'application/json'
    });

    this.http.post(apiUrl, this.user, { headers }).subscribe({
      next: (response) => {
        console.log('User created:', response);
        alert('User submitted successfully!');
        this.user = {  name: '' };
      },
      error: (error) => {
        console.error('Error creating user:', error);
        alert('Error submitting user.');
      }
    });
  }
}

