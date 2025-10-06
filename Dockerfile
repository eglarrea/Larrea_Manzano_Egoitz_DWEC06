FROM node:18

WORKDIR /app
COPY gestionTiendaOnline/ .
RUN npm install

RUN chmod +x node_modules/.bin/ng

# Compilar la app Angular
RUN npx ng build --configuration=production --verbose
