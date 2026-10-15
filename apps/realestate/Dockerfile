# Build from the repository root with -f apps/realestate/Dockerfile.
FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV NX_DAEMON=false NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Public settings are compiled into the browser bundle.
ARG NEXT_PUBLIC_BASE_URL=http://localhost:3000
ARG NEXT_PUBLIC_API_URL=http://localhost:8080
ARG NEXT_PUBLIC_API_PREFIX=/api
ARG NEXT_PUBLIC_AUTH_BACKEND_API_URL=http://localhost:8080
ARG NEXT_PUBLIC_AUTH_LOGIN_PATH=/api/auth/login
ARG NEXT_PUBLIC_BACKEND_ORIGIN=http://localhost:3000
ARG NEXT_PUBLIC_FILE_STORAGE_API_URL=http://localhost:8080
ARG NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:8080
ARG NEXT_PUBLIC_GOOGLE_MAPS_API=
ARG NEXT_PUBLIC_NUMERIC_INPUT_MAX_LIMIT=10000000
ARG NEXT_PUBLIC_UPLOAD_IMAGES_MAX_SIZE=26214400
ARG NEXT_PUBLIC_UPLOAD_PDF_MAX_SIZE=26214400
ARG NEXT_PUBLIC_UPLOAD_VIDEOS_MAX_SIZE=26214400
ENV NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=false NEXT_PUBLIC_ENABLE_FACEBOOK_AUTH=false NEXT_PUBLIC_ENABLE_APPLE_AUTH=false
RUN NODE_ENV=production npx nx build realestate --skip-nx-cache

FROM node:22-bookworm-slim AS production
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 NEXT_TELEMETRY_DISABLED=1
COPY --from=build --chown=node:node /app/apps/realestate/.next/standalone ./
COPY --from=build --chown=node:node /app/apps/realestate/.next/static ./apps/realestate/.next/static
COPY --from=build --chown=node:node /app/apps/realestate/public ./apps/realestate/public
USER node
EXPOSE 3000
CMD ["node", "apps/realestate/server.js"]
