import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  loginForm: FormGroup;

  features = signal([
    {
      icon: 'assignment',
      text: 'Seguimiento centralizado de todas las incidencias',
    },
    {
      icon: 'calendar_today',
      text: 'Priorización y asignación eficiente de tickets',
    },
  ]);

  constructor() {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado:', this.loginForm.value);
      // Aquí iría la llamada al servicio en el futuro
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
