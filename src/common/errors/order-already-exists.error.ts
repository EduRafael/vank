export default class AlreadyExistsError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor(nameParam: string, param: string) {
    this.name = 'ALREADY_EXISTS_ERROR';
    this.message = `Ya existe un usuario registrado con el ${nameParam} ['${param}'], verifique la información presentada!`;
  }
}
