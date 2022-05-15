FROM node:16

# Create app directory, this is in our container/in our image
WORKDIR /vank/src

COPY package*.json ./

RUN npm install

RUN npm audit fix --force

COPY . .

RUN npm run build

EXPOSE 8082

CMD [ "node", "dist/main" ]