import {
  ApiParam,
  ApiOperation,
  ApiBody,
  ApiHeader,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

import { ApiInfoType, DataInfoType } from './apiInfo.iterface';

import { applyDecorators } from '@nestjs/common';

export const ApiInfo = (Data: DataInfoType) => {
  const { ParamName, type, desc, isParams, response, example } = Data;
  const params: ApiInfoType = {
    name: ParamName,
    type: type,
    example,
  };

  const res = response || { status: 200 };

  return isParams
    ? applyDecorators(
        ApiParam(params),
        ApiOperation({ description: desc }),
        ApiResponse(res),
      )
    : applyDecorators(ApiOperation({ description: desc }), ApiResponse(res));
};
