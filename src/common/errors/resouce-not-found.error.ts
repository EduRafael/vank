export default class ResourceNotFound implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor(resource: string) {
    this.name = 'RESOURCE_NOT_FOUND';
    this.message = `No se encontraron resultados en la busqueda para el ['${resource}']. Pruebe con valores distintos`;
  }
}
