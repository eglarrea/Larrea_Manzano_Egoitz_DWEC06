# 🧱 Etapa 1: Build de Angular
FROM node:18 AS build-stage

WORKDIR /app

# Copiar solo la carpeta del proyecto Angular
COPY gestionTiendaOnline/ .

# Ir al directorio del proyecto
WORKDIR /app

# Instalar dependencias
RUN npm install
RUN chmod +x node_modules/.bin/ng

# 🏗️ Compilar la app Angular
RUN npx ng build --configuration=production

# 🚀 Etapa 2: Servir con Nginx
FROM nginx:stable-alpine AS production-stage

# Elimina la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos compilados de Angular
COPY --from=build-stage /app/dist/gestion-tienda-online /usr/share/nginx/html


# Copia configuración personalizada de Nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
