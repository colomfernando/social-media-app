FROM node:12-alpine AS development
ENV NODE_ENV development
USER node

WORKDIR /home/app

COPY --chown=node:node ./frontend/package*.json /home/app/

COPY --chown=node:node ./frontend/ .

RUN npm ci

EXPOSE 3000

CMD npm start
