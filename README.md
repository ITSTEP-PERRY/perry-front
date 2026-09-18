# Perry React storefront (`perry-front`)

Vite + React 19 витрина маркетплейса **Perry**. Визуал по макету **Figma** (приоритет №1) и эталону Razor `site.css` / `auth.css`. Данные — из `Perry.Api` (proxy `/api` → `http://localhost:5272`).

Backend: [Back_end_for_our_poroject](https://github.com/ITSTEP-PERRY/Back_end_for_our_poroject)  
**Хроника всей работы:** [docs/ХРОНИКА-РАБОТЫ.md](./docs/ХРОНИКА-РАБОТЫ.md) · оглавление [docs/README.md](./docs/README.md)  
**Trello (карточки #1–#88):** [docs/TRELLO-TODO.md](./docs/TRELLO-TODO.md) · доска [ITSTEP-PERRY](https://trello.com/b/bwEYs3Kq/itstep-perry)  
**Спринт 19.09:** [docs/ИЗМЕНЕНИЯ-2026-09-19.md](./docs/ИЗМЕНЕНИЯ-2026-09-19.md) · скрины [docs/screenshots/sprint-2026-09-19/](./docs/screenshots/sprint-2026-09-19/README.md)  
Сводка (каталог/PDP/auth): [docs/ИЗМЕНЕНИЯ-2026-09-17.md](./docs/ИЗМЕНЕНИЯ-2026-09-17.md)  
**Account:** [docs/ACCOUNT-КАБИНЕТ.md](./docs/ACCOUNT-КАБИНЕТ.md) · [docs/ИЗМЕНЕНИЯ-Account-2026-09-17.md](./docs/ИЗМЕНЕНИЯ-Account-2026-09-17.md)  
Скриншоты: [docs/screenshots/README.md](./docs/screenshots/README.md)

---

## Спринт к защите — что сделано (19.09)

Закрыты оставшиеся карточки Trello (кроме Backlog #73): PDP reviews + инфо-модалки + notify + 404 · React-админка Categories / Products / Reviews / Users / Orders · Docker · Swagger · SMTP-гайд · mobile Done.

Текстовая сводка: [docs/ИЗМЕНЕНИЯ-2026-09-19.md](./docs/ИЗМЕНЕНИЯ-2026-09-19.md)

### 01 · 404 Product not found

![404 Product not found](./docs/screenshots/sprint-2026-09-19/01-404-product-not-found.png)

Товар не найден — Browse catalog / Go to home.

### 02 · Admin Products

![Admin Products](./docs/screenshots/sprint-2026-09-19/02-admin-products.png)

Список товаров + фильтр Category / Search.

### 03 · Admin Categories

![Admin Categories](./docs/screenshots/sprint-2026-09-19/03-admin-categories.png)

Корневые категории, Active, создание «+».

### 04 · Admin Reviews

![Admin Reviews](./docs/screenshots/sprint-2026-09-19/04-admin-reviews.png)

Модерация: All / Hidden / Visible.

### 05 · Admin Orders

![Admin Orders](./docs/screenshots/sprint-2026-09-19/05-admin-orders.png)

Список заказов Date / Customer / Status / Total.

### 07 · Admin Products — category dropdown

![Admin Products category dropdown](./docs/screenshots/sprint-2026-09-19/07-admin-products-category-dropdown.png)

Иерархия категорий в тулбаре.

### 08 · Admin Products — фильтр Streaming

![Admin Products filtered](./docs/screenshots/sprint-2026-09-19/08-admin-products-filter-streaming.png)

Отфильтрованный список (Roku Express 4K+).

### 09 · Admin Users — Active

![Admin Users Active](./docs/screenshots/sprint-2026-09-19/09-admin-users-filters.png)

Активные пользователи, ellipsis на длинных email.

### 10 · Admin Orders — детали

![Admin Order details](./docs/screenshots/sprint-2026-09-19/10-admin-orders-details.png)

Состав заказа + смена Status.

### 11 · Admin Reviews — Hide

![Admin Review Hide](./docs/screenshots/sprint-2026-09-19/11-admin-reviews-moderate-hide.png)

Скрыть отзыв с витрины (Hide / Delete).

### 12 · Account — My orders

![My orders](./docs/screenshots/sprint-2026-09-19/12-account-my-orders.png)

Кабинет: заказы Ordered / Ready for pickup.

### 13 · Admin Reviews — Approve

![Admin Review Approve](./docs/screenshots/sprint-2026-09-19/13-admin-reviews-approve.png)

Вернуть скрытый отзыв (Approve / Delete).

### 14 · Account — Order details

![Order details modal](./docs/screenshots/sprint-2026-09-19/14-account-order-details-modal.png)

Модалка: позиции, Total, How to cancel.

### 15 · Account — Order details #2

![Order details modal 2](./docs/screenshots/sprint-2026-09-19/15-account-order-details-modal-2.png)

Второй заказ (#918320), Total $178.

### 16 · Account — Change email

![Change email modal](./docs/screenshots/sprint-2026-09-19/17-account-change-email-modal.png)

Смена email: пароль + 6-digit code + Send code.

---

## Account — что сделано (17.09)

Личный кабинет по макетным скринам:

| Маршрут | Экран |
|---------|--------|
| `/account/orders` | My orders + модалка Details |
| `/account/wishlist` | Wishlist + Remove confirm |
| `/account/settings` | Settings + модалки name/password/email/logout/delete |

- Сайдбар: аватар, Customer/Admin, навигация Account
- Wishlist через API (`WishlistContext`)
- Смена email: пароль + 6-значный код
- Старые `/profile`, `/orders` → редирект на `/account/*`

![Account settings](./docs/screenshots/account/07-account-settings.png)

![Wishlist](./docs/screenshots/account/01-wishlist.png)

![My orders](./docs/screenshots/account/03-my-orders.png)

Полный набор из 14 фото с описаниями — в [docs/screenshots/README.md](./docs/screenshots/README.md).

---

## Что изменено (сводка)

### Витрина под Figma
- Полный порт UI: Home, каталог, PDP, корзина, заказы, профиль, legal-страницы.
- Стили перенесены из Razor: `src/styles/storefront.css`, `src/styles/auth.css`, `src/styles/admin.css`.
- Ant Design ConfigProvider с витрины убран — разметка и классы как в макете/Razor.
- Ассеты: `public/icons/*`, `public/images/home/*`, `SiginSignup.png`.

### Home
- Hero-слайдер, карусели категорий, **Trending deals**, **Sale**.
- CTA-блок **Abundance of goods** (Sign up / Log in) — как в кадре 26 / Figma.

### Каталог `/products` (Figma Product List V2)
- Сайдбар: **Brand**, **Fabric type**, **Size**, **Color**, **Price**, **Customer reviews**.
- Сортировка, grid/list, пагинация, breadcrumbs.
- Fallback-списки брендов/тканей/цветов из макета, если API ещё без facets.
- Адаптив: кнопка Filters на mobile.

### Product page `/products/:id`
- Галерея + бейдж скидки, About product, buy-box.
- Buy-box: Status, **Delivery**, **Payment methods**, **Security**, **Returns**, qty, Buy now / Add to cart, wish list.
- **Customer reviews**: сводка, bars, Frequent tags, Helpful / Translate, See more.
- Карусели по Figma: **You may also like**, **Best sellers in {category}**.

### Auth (экраны 12–25)
| Маршрут | Экран |
|---------|--------|
| `/login` | Welcome back |
| `/register` | Create account → `/finishing-touches` |
| `/verify-code` | Send code (после 3 неудачных логинов) |
| `/forgot-password` | Forgot password |
| `/reset-password` | Reset password |
| `/finishing-touches` | First / Last name |
| `/auth/success` | Congratulations! |

### Legal
- `/terms`, `/privacy`, `/license` — полные тексты + навигация Legal notice.

### Админка React `/admin/*` (обновлено 19.09)
- Login, Dashboard, Products (список + create/edit), Categories (CRUD + inactive), **Reviews** (Hide/Approve/Delete), Orders, Users (Active/Deleted + restore).

### API-клиент
- `src/api/` — categories, products (facets/filters), auth JWT, cart session, orders.
- Контексты: `AuthContext`, `CartContext`, `RequireAuth`.

### Инфра Vite
- Proxy `/api`, `/uploads` → `:5272`.
- `server.watch.ignored` для `My_Amazon2` / backend — чтобы `dotnet build` не ронял Vite (`EBUSY`).
- `.env.example` с `VITE_API_PROXY`.

---

## Запуск

```bash
# Terminal 1 — API (из backend-репо)
cd My_Amazon2/src/Perry.Api   # или клон Back_end_for_our_poroject
dotnet run --launch-profile http
# Swagger: http://localhost:5272/swagger

# Terminal 2 — React
npm install
npm run dev
# App: http://localhost:3000
```

### Демо
- Админ: `Admin` / `Admin` → `/admin/login`
- Покупатель: `/register`

### Маршруты

| Path | Описание |
|------|----------|
| `/` | Home |
| `/products` | Каталог + фильтры |
| `/products/:id` | PDP |
| `/cart` | Корзина |
| `/account/orders` | My orders (JWT) |
| `/account/wishlist` | Wishlist (JWT) |
| `/account/settings` | Account settings (JWT) |
| `/orders`, `/profile` | Редирект → `/account/*` |
| `/login` … `/auth/success` | Auth-поток |
| `/terms`, `/privacy`, `/license` | Legal |
| `/admin/*` | Админка |

### Notes
- Cart guest: `localStorage.perry_cart_session`
- JWT: `localStorage.perry_token`
- Приоритет дизайна: **Figma** → скриншоты backend README 26–33 → Razor CSS
