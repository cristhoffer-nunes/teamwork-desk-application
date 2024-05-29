# Use a imagem base do Node.js
FROM node:20.12.0-alpine

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV WEBHOOK_TEAMS_URL = ${WEBHOOK_TEAMS_URL}

EXPOSE ${PORT}

CMD [ "node", "dist/main" ]