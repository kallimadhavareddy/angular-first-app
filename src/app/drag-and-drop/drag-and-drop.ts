import { Component ,OnInit} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CbUserResponse, CbUserService } from '../get-all-cbusers/cb-user-service';
import { User } from '../get-all-aggregations/async-service';

@Component({
  selector: 'app-drag-and-drop',
  imports: [CommonModule, DragDropModule],
  templateUrl: './drag-and-drop.html',
  styleUrl: './drag-and-drop.css',
})
export class DragAndDrop implements OnInit{

constructor(private http: HttpClient,private cbUserService: CbUserService) {}

ngOnInit(): void {
  this.loadCbUsers();
}

   user = {  name: '' };

   cbUsers: CbUserResponse[] = [];
   done: string[] = [];

  
  todo = [
    'Madhava Admin',
    'Kalli Admin',
    'Aakash Admin',
    'Jaasritha Admin',
    'Bhargavi Admin'
  ];

  

  

loadCbUsers() {
    // 2. Subscribe and assign the values
    this.cbUserService.getCbUsers().subscribe({
      next: (data: any[]) => {
        // Assuming 'data' is an array of objects like [{name: 'John'}, {name: 'Jane'}]
        // We map it to get just the names for your drag-and-drop lists
        this.done = data.map(user => user.name);
        this.todo = this.todo.filter(task => !this.done.includes(task));
        this.cbUsers = data.map(user => user.name);
        console.log('New array assigned:', this.cbUsers);
        this.done = data.map(user => user.username || user.name);
      },
      error: (err) => console.error('Failed to load users', err)
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    if(event.container.data === this.done) {
      console.log('Item moved to done');
      const movedTask = event.container.data[event.currentIndex];
       this.submitUser(movedTask);
       window.location.reload();
       
    }
  }

  submitUser(taskDone: String) {
    const apiUrl = 'http://localhost:8080/api/users';
    const headers = new HttpHeaders({
      'X-API-Key': 'test-key-abcde',
      'Content-Type': 'application/json'
    });
    const user = {  name: taskDone };
  

    this.http.post(apiUrl, user, { headers }).subscribe({
      next: (response) => {
        console.log('User created:', response);
        //alert('User submitted successfully!');
        this.user = {  name: '' };
        window.location.reload(); 
      },
      error: (error) => {
        console.error('Error creating user:', error);
        alert('Error submitting user.');
      }
    });
  }


  

}

