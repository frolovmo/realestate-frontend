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

## GitHub Actions

In the GitHub repository, open Settings > Secrets and variables > Actions >
Variables and create these repository variables:

| Variable | Example |
| --- | --- |
| `NEXT_PUBLIC_BASE_URL` | `https://sit.example.com` |
| `NEXT_PUBLIC_API_URL` | `https://api-sit.example.com` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API` (optional) | Browser Maps key restricted to SIT domains |

Replace the example addresses with actual deployment addresses, without trailing
slashes. `NEXT_PUBLIC_API_URL` must not include `/api`. Auth, file storage, and
socket URLs use the same API origin; the API prefix defaults to `/api`. Configure
cookie/CORS and routing as described above. Public variables are visible in the
browser bundle and must never contain backend secrets.

`.github/workflows/docker-image.yml` builds the production image, including
Next.js type checking, on pull requests targeting `main`. Pushes to `main` also
publish to `ghcr.io/frolovmo/realestate-frontend`, tagged `main` and
`sha-<full-commit-sha>`. Publishing fails early if required URL variables are
missing. Pull requests can build with localhost defaults and never publish.

Authentication uses GitHub's automatic `GITHUB_TOKEN`; no publishing PAT is
needed. New GHCR packages are private by default; keep the package private.
For private image pulls, configure GHCR credentials with package read access
in Dokploy (for example, a classic PAT with `read:packages`). Use a commit tag
or image digest to deploy a specific version.

Commit and push the workflow to activate it. Enable Actions and permit the
referenced actions in repository settings if restricted. Manual runs are under
Actions > Build and Publish Image > Run workflow; only `main` publishes.
Changing public URL variables requires another workflow run. Deployment to
Strettch remains a separate step.
