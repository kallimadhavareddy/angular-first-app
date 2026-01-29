
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncService, Post ,ApiResponse} from './async-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-all-aggregations',
  imports: [],
  templateUrl: './get-all-aggregations.html',
  styleUrl: './get-all-aggregations.css',
})
export class GetAllAggregations implements OnInit {
 
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

  this.asyncService.getAsyncAgregationResults().subscribe({
      next: (apiresponse) => {
        console.log(apiresponse)
        this.apiResponse.set(apiresponse);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }
}
