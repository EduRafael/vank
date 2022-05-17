import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//const
import { DocumentApi } from '../enums/api.enum';

export const swaggerConfig = (app, env) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(DocumentApi.title)
    .setDescription(DocumentApi.desc)
    .setVersion(DocumentApi.version)
    .addTag(env)
    .build();

  const documentations = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('doc', app, documentations);
};
