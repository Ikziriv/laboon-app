import type { User } from 'firebase/auth';
import type { iResponse } from './interfaces';
import { UserStore, isLoggedIn, userId } from '../stores/user';

/**
 * Custom AuthError for better handling
 *
 * @class AuthError
 * @extends {Error}
 */
 class AuthError extends Error {
    code: string;
    ocurredAt: Date;
    constructor(code: string, message: string, ...params: never[]) {
      super(...params);
      this.name = 'AuthError';
      this.code = code;
      this.message = message;
      this.ocurredAt = new Date();
    }
  
    toString = () => {
      return `\n<===============\n${this.name}:\nCode: ${this.code}\nMessage: ${this.message}\nOcurred at: ${this.ocurredAt}\n================>`;
    };
  }