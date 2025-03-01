FROM node:22-alpine

WORKDIR /app

COPY ./package ./package

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./turbo.json ./turbo.json

RUN npm install -g pnpm
RUN pnpm install

COPY ./apps/websocket ./apps/websocket

RUN pnpm run build:websocket
RUN pnpm run db:generate

EXPOSE 8080

CMD [ "pnpm", "run", "start:websocket" ]