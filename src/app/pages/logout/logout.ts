import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AmonService } from '../../../services/amon/amon.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
})
export class Logout implements OnInit {
  private router = inject(Router);
  private amonService = inject(AmonService);

  ngOnInit(): void {
    this.amonService.logout().subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: () => this.router.navigateByUrl('/login'),
    });
  }
}
