

import { Component, signal, OnInit } from '@angular/core';
import { CbUserService, CbUserResponse} from './cb-user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-all-cbusers',
  imports: [CommonModule],
  providers: [CbUserService],
  templateUrl: './get-all-cbusers.html',
  styleUrl: './get-all-cbusers.css',
})
export class GetAllCbusers implements OnInit {
 
  loading = signal(false);
  error = signal<string | null>(null);
  cbUsers = signal<CbUserResponse[]>([]);   

  constructor(private cbUserService: CbUserService) {}

  getKeys(obj: Record<string, any> | undefined): string[] {
    return obj ? Object.keys(obj) : [];
  }

  ngOnInit(): void {
    this.fetchCbUsers();
  }

  fetchCbUsers(): void {
    this.loading.set(true);
    this.error.set(null);

  this.cbUserService.getCbUsers().subscribe({
      next: (cbuserResponse: CbUserResponse[]) => {
        console.log(cbuserResponse)
        this.cbUsers.set(cbuserResponse);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }
}
