FROM node:14-alpine AS development

ENV NODE_ENV development
USER node

WORKDIR /home/server

COPY --chown=node:node ./backend/package*.json /home/server/

COPY --chown=node:node ./backend/ .

RUN npm i

EXPOSE 8080

CMD npm start