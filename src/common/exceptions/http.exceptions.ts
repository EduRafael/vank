import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import ConflictError from './../errors/conflict.error';
import MapperError from './../errors/mapper.error';
import AlreadyExistsError from '../errors/already-exists.error';
import ResourceNotFound from './../errors/resouce-not-found.error';
import AuthError from '../errors/auth.error';

@Catch()
export class HttpErrorException implements ExceptionFilter {
  private readonly logger = new Logger(HttpErrorException.name);
  catch(error: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const request = ctx.getRequest();
    const response = ctx.getResponse();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = error.message;

    if (error instanceof ResourceNotFound) {
      statusCode = HttpStatus.NOT_FOUND;
    }

    if (error instanceof AuthError) {
      statusCode = HttpStatus.FORBIDDEN;
    }

    if (error instanceof ConflictError || error instanceof MapperError) {
      statusCode = HttpStatus.CONFLICT;
    }

    if (error instanceof AlreadyExistsError) {
      statusCode = HttpStatus.BAD_REQUEST;
    }

    if (error instanceof HttpException) {
      message = error['response']['message'];
      statusCode = HttpStatus.BAD_REQUEST;
    }

    if (error.message == 'Unauthorized') {
      message = 'No tiene permiso para ejecutar esta acción';
      statusCode = HttpStatus.FORBIDDEN;
    }

    //timestamp: new Date().toLocaleTimeString(), //Remuevo por definición del MVP
    const errorResponse = { message };

    this.logger.error(errorResponse.message);

    response.status(statusCode).json(errorResponse);
  }
}
