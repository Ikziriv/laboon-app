import type { User } from 'firebase/auth';
import type { DocumentReference } from 'firebase/firestore';

export interface iResponse {
  status: number;
  message?: string;
  data?: DocumentReference<unknown> | DocumentReference<unknown>[] | User;
}

export interface iResearch {
  name: string;
}