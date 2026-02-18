import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AmonService } from '../../services/amon/amon.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private amonService = inject(AmonService);
  loginForm: FormGroup;

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
      next: () => {
        this.loading.set(false);
        // TODO: redirigir
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.message ?? err?.message ?? 'Error al iniciar sesión';
        this.errorMessage.set(msg);
      },
    });
  }
}
