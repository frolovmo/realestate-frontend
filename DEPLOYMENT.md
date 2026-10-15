# Production Image

Run from the repository root:

```sh
docker build -f apps/realestate/Dockerfile -t realestate-frontend:local .
docker run --rm -p 3000:3000 realestate-frontend:local
```

The image serves the app at `/` on port 3000. It includes shared Nx libraries,
public assets, and the standalone Next.js server. Local `.env` files are excluded.

For SIT, pass public URLs as build arguments (replace `sit.example.com`):

```sh
docker build -f apps/realestate/Dockerfile -t realestate-frontend:sit \
  --build-arg NEXT_PUBLIC_BASE_URL=https://sit.example.com \
  --build-arg NEXT_PUBLIC_API_URL=https://sit.example.com \
  --build-arg NEXT_PUBLIC_AUTH_BACKEND_API_URL=https://sit.example.com \
  --build-arg NEXT_PUBLIC_BACKEND_ORIGIN=https://sit.example.com \
  --build-arg NEXT_PUBLIC_FILE_STORAGE_API_URL=https://sit.example.com \
  --build-arg NEXT_PUBLIC_SOCKET_SERVER_URL=https://sit.example.com .
```

`NEXT_PUBLIC_API_PREFIX` defaults to `/api`. Upload limits are in bytes and
default to 25 MiB. Google, Facebook, and Apple login are disabled in this image.
Google Maps can be configured using `NEXT_PUBLIC_GOOGLE_MAPS_API` at build time.
Public settings require rebuilding the image when changed; do not pass secrets
as public build arguments. Server-side requests also use these URLs, so the
frontend container must be able to reach the configured API address.

When configuring a shared domain, preserve frontend-owned `/api/me`,
`/api/auth/oauth-callback`, and any other Next route handlers. A blanket `/api`
route to NestJS would intercept them. Set explicit routing rules or use a
separate API hostname with the appropriate cookie/CORS configuration.
