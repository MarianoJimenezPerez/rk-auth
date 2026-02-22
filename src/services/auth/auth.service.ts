import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { AmonService } from '../amon/amon.service';
import { environment } from '../../environments/environment';
import type { User, AuthResponse } from '../amon/amon.types';

function isLocalhost(): boolean {
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private amonService = inject(AmonService);

  private readonly cookieKey = `${environment.cookiePrefix}_token`;

  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());

  getToken(): string | null {
    const memoryToken = this._token();
    if (memoryToken) return memoryToken;

    return this.readCookie(this.cookieKey);
  }

  handleLoginSuccess(response: AuthResponse): void {
    this._user.set(response.user);
    this._token.set(response.token);

    if (isLocalhost()) {
      this.setCookie(this.cookieKey, response.token);
    }
  }

  /**
   * Verifica la sesión llamando al endpoint de profile.
   * Si ya hay usuario en memoria, devuelve true sin llamar al backend.
   */
  checkAuth(): Observable<boolean> {
    if (this._user()) return of(true);

    if (isLocalhost() && !this.getToken()) {
      return of(false);
    }

    return this.amonService.getProfile().pipe(
      tap((user) => this._user.set(user)),
      map(() => true),
      catchError(() => {
        this.clearAuth();
        return of(false);
      }),
    );
  }

  clearAuth(): void {
    this._user.set(null);
    this._token.set(null);

    if (isLocalhost()) {
      this.deleteCookie(this.cookieKey);
    }
  }

  private readCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  }

  private setCookie(name: string, value: string): void {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/;`;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=; path=/; max-age=0;`;
  }
}
