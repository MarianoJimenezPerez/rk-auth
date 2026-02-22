import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AmonService } from '../../../services/amon/amon.service';
import { AuthStateService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private amonService = inject(AmonService);
  private authState = inject(AuthStateService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  loginForm: FormGroup;

  /** URL a la que redirigir tras login exitoso (query param returnUrl). Acepta valor URL-encoded. */
  private get returnUrl(): string | null {
    const raw = this.route.snapshot.queryParamMap.get('returnUrl');
    if (!raw) return null;
    let url: string;
    try {
      url = decodeURIComponent(raw);
    } catch {
      return null;
    }
    if (url.startsWith('/')) return null;
    try {
      const parsed = new URL(url);
      if (parsed.hostname.endsWith('rkpanel.com')) return url;
    } catch {
      /* invalid URL */
    }
    return null;
  }

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  features = signal([
    { icon: 'assignment', text: 'Seguimiento centralizado de todas las incidencias' },
    { icon: 'calendar_today', text: 'Priorización y asignación eficiente de tickets' },
  ]);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.errorMessage.set(null);
    this.loading.set(true);

    const body = this.loginForm.getRawValue();

    this.amonService.login(body).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.authState.handleLoginSuccess(response);
        const url = this.returnUrl;
        if (url) {
          window.location.href = url;
        } else {
          this.router.navigateByUrl('/welcome');
        }
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.message ?? err?.message ?? 'Error al iniciar sesión';
        this.errorMessage.set(msg);
      },
    });
  }
}
