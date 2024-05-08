FROM node:20

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY turbo.json ./

COPY apps/web/package.json ./apps/web/package.json
COPY apps/webhook/package.json ./apps/webhook/package.json
COPY packages/database/package.json ./apps/packages/database/package.json
COPY packages/database/prisma       ./apps/packages/database/prisma

RUN npm install

COPY apps ./apps
COPY packages ./packages

RUN cd packages/database && npx prisma generate && cd ../..

EXPOSE 3000

CMD ["npm","run","dev:docker"]
