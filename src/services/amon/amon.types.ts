export type HorusRole = 'admi' | 'mngr' | 'soci' | 'equi' | 'lega' | 'coor' | 'tele' | 'agen';

export interface LoginDTO {
  username: string;
  password: string;
  horusRole?: HorusRole;
}

export interface AuthPayload {
  exp: number;
  iat: number;
  partnerId: string;
  officeId: string;
  userId: string;
  apps: string[];
  amonRole: string;
  horusRole: string;
  supportRole: string;
  driveId: string;
  env: string;
  sessionId: string;
}

export interface UserCredencial {
  username: string;
  arrRol: string[];
  password: string;
}

export interface UserSocial {
  facebook: string;
  instagram: string;
  linkedin: string;
  url: string;
}

export interface UserFacturacion {
  nombre: string;
  direccion: string;
  nif: string;
  iban: string;
}

export interface UserSmtp {
  name: string;
  host: string;
  port: number;
  secure: boolean;
  smtp_username: string;
  smtp_password: string;
  checked: boolean;
  privacy_policy: string;
  email_sign: string;
  isGoogleAccount: boolean;
  googleOauthEmail: string;
}

export interface UserAvatar {
  url: string;
  level: string;
}

export interface User {
  _id: string;
  credencial: UserCredencial;
  social: UserSocial;
  refInmovilla: string;
  activo: boolean;
  facturacion: UserFacturacion;
  smtp: UserSmtp;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  refSocio: string;
  refOficina: string;
  avatar: UserAvatar;
  nick: string;
  mobile_prefix: string;
  laboral_relationship: string;
  laboral_experience: string;
  apps: string;
  stripeId: string;
  driveFolderId: string;
  role: string;
  supportRole: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  payload: AuthPayload;
  user: User;
}
