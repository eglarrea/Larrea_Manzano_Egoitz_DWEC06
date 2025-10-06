FROM node:18

WORKDIR /app
COPY gestionTiendaOnline/ .
RUN npm install
RUN npx ng build --configuration=production --verbose
