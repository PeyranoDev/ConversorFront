import { iSubscripcion } from "./subscription";

export interface Usuario {
    id: number;
    username: string;
    email: string;
    subscriptionId: number;
    subscription: iSubscripcion;
    conversionsUsed: number;
    isAdmin: boolean;
    isActive: boolean;
  }