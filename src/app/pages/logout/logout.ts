import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AmonService } from '../../../services/amon/amon.service';
import { AuthStateService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
})
export class Logout implements OnInit {
  private router = inject(Router);
  private amonService = inject(AmonService);
  private authState = inject(AuthStateService);

  ngOnInit(): void {
    this.amonService.logout().subscribe({
      next: () => {
        this.authState.clearAuth();
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.authState.clearAuth();
        this.router.navigateByUrl('/login');
      },
    });
  }
}
