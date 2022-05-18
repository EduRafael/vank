export default class AuthError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor(message: string) {
    this.name = 'AUTH_ERROR';
    this.message = message;
  }
}
