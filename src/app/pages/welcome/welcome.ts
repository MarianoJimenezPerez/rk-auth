import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment';
import { AuthStateService } from '../../../services/auth/auth.service';

interface AppCard {
  icon: string;
  title: string;
  description: string;
  url: string;
  target: string;
  requiredSupportRoles?: string[];
}

const APP_CARDS: AppCard[] = [
  {
    icon: 'apartment',
    title: 'Horus',
    description: 'Gestión inmobiliaria',
    url: environment.appUrls.horus,
    target: '_self',
  },
  {
    icon: 'confirmation_number',
    title: 'Tickets',
    description: 'Gestión de incidencias',
    url: environment.appUrls.tickets,
    target: '_self',
  },
  {
    icon: 'leaderboard',
    title: 'Analítica',
    description: 'Análisis de actividad en RKPanel',
    url: environment.appUrls.analytics,
    target: '_self',
    requiredSupportRoles: ['mngr'],
  },
  {
    icon: 'schedule',
    title: 'Tiempo real',
    description: 'Usuarios y errores en línea',
    url: environment.appUrls.realtime,
    target: '_self',
    requiredSupportRoles: ['mngr'],
  },
];

@Component({
  selector: 'app-welcome',
  imports: [MatIconModule],
  templateUrl: './welcome.html',
})
export class Welcome {
  private authState = inject(AuthStateService);

  readonly cards = computed(() => {
    const user = this.authState.user();
    return APP_CARDS.filter(
      (card) =>
        !card.requiredSupportRoles || card.requiredSupportRoles.includes(user?.supportRole ?? ''),
    );
  });
}
