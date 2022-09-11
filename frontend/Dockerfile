FROM node:14-alpine AS development
ENV NODE_ENV development
USER node

WORKDIR /home/app

COPY --chown=node:node ./frontend/package*.json /home/app/

COPY --chown=node:node ./frontend/ .

RUN npm i

EXPOSE 3000

CMD npm start
