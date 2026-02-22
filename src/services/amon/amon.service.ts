import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import type { LoginDTO, AuthResponse, User } from './amon.types';

const RKPANEL_COOKIE_DOMAIN = '.rkpanel.com';

@Injectable({ providedIn: 'root' })
export class AmonService {
  private http = inject(HttpClient);
  private baseUrl = environment.amonBaseUrl;

  /**
   * Elimina todas las cookies accesibles para el dominio indicado (p. ej. .rkpanel.com).
   * Solo afecta a cookies no HttpOnly; las que setea el backend pueden seguir limpiándose vía respuesta Set-Cookie.
   */
  private clearCookiesForDomain(domain: string): void {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const eqIdx = cookie.indexOf('=');
      const name = (eqIdx > -1 ? cookie.slice(0, eqIdx) : cookie).trim();
      if (name) {
        document.cookie = `${name}=; path=/; domain=${domain}; max-age=0`;
      }
    }
  }

  /**
   * POST /api/auth/login
   */
  login(body: LoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/login`, body);
  }

  /**
   * GET /api/users/profile
   */
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/users/profile`);
  }

  /**
   * POST /api/auth/logout
   */
  logout(): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/api/auth/logout`, {})
      .pipe(tap(() => this.clearCookiesForDomain(RKPANEL_COOKIE_DOMAIN)));
  }
}
