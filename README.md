<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción

Se utilizó el framework [Nest](https://github.com/nestjs/nest), para dar solución al desarrollo de [Challenge](https://xepelin.notion.site/Test-Backend-P-blico-f15bf9ee3bde4ef6964e181790dddd39) propuesto por xepelin notion.

A nivel general, con esta api podrá crear nuevos usuarios, una vez tenga un usuario registrado, tendrá que realizar el login para generar un token que le permitirá realizar el resto de acciones dispuestas, como modificar algunos parámetros del usuario, crear nuevos registros de invoices y consultar los mismos a través de diferentes filtros, asi como seleccionar el tipo de moneda que desa utilizar basado en los datos brindados por [CurrencyConverterApi](https://free.currencyconverterapi.com/free-api-key).

## Configuración de entorno

Con el proposito de facilitar la ejecución de dicha API, se realizó un `Docker Compose` que permitirá de forma rápida crear todos los recursos necesario para su uso.

### Ejecución de docker-compose

```bash
#build compose
$ docker-compose build

#run compose
$ docker-compose up
```

### Accesos WEB para la prueba

Una vez haya preparado todo el entorno de desarrollo, utilizando el `Docker Compose` anterior, puede hacer uso de los recurso web fueron configurados con el propisito de facilitar las prueba.

#### PG Admin

> Si desea acceder al [PG Admin](http://localhost:8081/login?next=%2F) para visualizar los datos de la base de datos usada durante el ejercicio puede acceder al servicio local proporcionado, usando los datos de prueba para el inicio de sesión que se brindan a continuación.

```
  USER: admin@admin.com
  PASS: admin
```

> Una vez iniciada la sesión puede verificar si existe una conexión a la base de datos llamada `postgres`, de no existir, puede crear la nueva conexión usando los datos de prueba que se brindan a continuación.

```
HOST: postgres
PORT: 5432
DATABASE: postgres
USER: postgres
PASS: admin
```

#### Swagger Doc

> Si desea utilizar la interfáz web de swagger para probar de forma mas sencilla la api presentada, puede utilizar [Swagger Vank Api](http://localhost:3001/doc/) en el que encontrará la documentación para el uso de cada endpoint, así como las referencias y ejemplos para los diferentes casos de uso.

## Uso interno de la api

Si desea utilizar esta API sin el `Docker Compose` facilitado entre los archivos del repositorio, recuerde que puede correr la api utilizando los comandos de propios de node/nestjs. Sin embargo no contará con la conexión requerida hacia la base de datos utilizada para el ejercicio practico.

### Instalar dependencias de node

```bash
$ npm install
```

### Correr la api

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Ejecutar Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Documentación y Recursos

> Challenge propuesto [Challenge](https://xepelin.notion.site/Test-Backend-P-blico-f15bf9ee3bde4ef6964e181790dddd39)

> Conversor de monedas [CurrencyConverterApi](https://free.currencyconverterapi.com/free-api-key).

> Como hacer modulo de autenticación con JWT y passport-jwt [AuthNest](https://www.youtube.com/watch?v=2P-Bxrtser4)

> Como hacer un cron job usando nestjs [CronJobsNest](https://www.youtube.com/watch?v=FX5JySeL1WY)
