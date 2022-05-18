export default class MapperError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor(mapperName: string, message: string) {
    this.name = 'MAPPER_ERROR';
    this.message = ` specifically in ${mapperName} mapperError: ${message}`;
  }
}
