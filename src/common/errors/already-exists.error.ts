export default class AlreadyExistsError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor(nameParam: string, param: string | number) {
    this.name = 'ALREADY_EXISTS_ERROR';
    this.message = `Ya existe un registro con el ${nameParam} ['${param}'], verifique la información presentada!`;
  }
}
