# Perry React storefront

Vite + React 19 storefront, визуал по **Figma** / Razor `site.css`. API: `Perry.Api` (proxy `/api` → `http://localhost:5272`).

Полный список изменений: [docs/ИЗМЕНЕНИЯ-2026-09-17.md](./docs/ИЗМЕНЕНИЯ-2026-09-17.md).

## Run locally

Terminal 1 — API:

```bash
cd My_Amazon2/src/Perry.Api
dotnet run --launch-profile http
```

Swagger: http://localhost:5272/swagger

Terminal 2 — React:

```bash
cd D:/Perry
npm install
npm run dev
```

App: http://localhost:3000

## Demo accounts

- Admin: `Admin` / `Admin` → `/admin/login`
- Register a customer at `/register`

## Routes

| Path | Description |
|------|-------------|
| `/` | Home + categories |
| `/products` | Catalog (filters, adaptive) |
| `/products/:id` | Product page |
| `/cart` | Cart + checkout |
| `/orders` | Customer orders (JWT) |
| `/login`, `/register` | Auth |
| `/admin/*` | Admin Products / Categories / Orders / Users |

## Notes

- Cart guest session: `localStorage.perry_cart_session`
- JWT: `localStorage.perry_token`
- Category create fields: `description`, `imageUrl`, `iconUrl`, `isActive`
- Product images: JSON `imageUrls` / `images` on create/update
