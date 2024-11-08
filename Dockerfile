FROM node:19-alpine3.15 as build-step

RUN mkdir -p /app

WORkDIR /app

COPY package.json /app

RUN npm install

RUN npm run build --prod

#segunda etapa

FROM nginx:1.17.1-alpine        

COPY --from=build-step /app/dist/PokeApp /usr/share/nginx/html