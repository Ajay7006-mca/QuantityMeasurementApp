# Quantity Measurement Frontend

React + Vite + Tailwind CSS frontend for the Spring Boot Quantity Measurement backend.

## Run

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:8080`

## Backend API Mapping

The API layer is centralized in `src/services/api.js`.

Current Spring Boot mappings:

- `POST /api/v1/quantities/convert`
- `POST /api/v1/quantities/compare`
- `POST /api/v1/quantities/add`
- `POST /api/v1/quantities/subtract`
- `POST /api/v1/quantities/multiply`
- `POST /api/v1/quantities/divide`
- `GET /api/v1/quantities/history`
- `DELETE /api/v1/quantities/history`

If the backend paths change, update the `ENDPOINTS` object in `src/services/api.js`.

## Google OAuth + JWT

The Login button redirects to:

```text
http://localhost:8080/oauth2/authorization/google
```

Opening `http://localhost:5173` shows the Welcome page. Use **Continue with Google** to start OAuth.

The backend OAuth success redirect should land on either route:

- `/oauth-success`
- `/login-success`

It extracts a JWT from `token`, `jwt`, or `access_token` query/hash params. If no token is present, it falls back to calling `GET http://localhost:8080/api/auth/success` with credentials and expects a response containing `jwt`, `email`, `name`, and optionally `picture`.

After login, the user is redirected to `/home`. Measurement routes remain protected and redirect unauthenticated users back to `/`.

The JWT is stored in `localStorage` with key `token` and sent on API calls as:

```text
Authorization: Bearer <token>
```

## CORS

The frontend calls the backend through `VITE_API_BASE_URL`, defaulting to `http://localhost:8080`.

If CORS blocks requests, configure the Spring Boot backend to allow:

- Origin: `http://localhost:5173`
- Methods: `GET`, `POST`, `PUT`, `DELETE`
- Headers: `*`

Do not merge this frontend into the backend project. It is intentionally a separate Vite app.
