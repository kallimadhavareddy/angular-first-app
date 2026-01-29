import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncService, Post ,ApiResponse} from './get-all-aggregations/async-service';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { GetAllAggregations } from './get-all-aggregations/get-all-aggregations';
import { GetAllCbusers } from "./get-all-cbusers/get-all-cbusers";
import { DragAndDrop } from './drag-and-drop/drag-and-drop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, AddUserComponent, GetAllAggregations, GetAllCbusers, DragAndDrop],
  providers: [AsyncService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = signal('Async Angular API');
  posts = signal<Post[]>([]);
  apiResponse = signal<ApiResponse| null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private asyncService: AsyncService) {}

  getKeys(obj: Record<string, any> | undefined): string[] {
    return obj ? Object.keys(obj) : [];
  }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.asyncService.getPosts().subscribe({
      next: (posts) => {
        console.log(posts)
        this.posts.set(posts);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });


    
  }
}
