# Отчёт: перепись FE под Figma — 30.09.2026

## Цель

Привести витрину и админку Perry к канону макета Figma: **один экран = один канон**, desktop-размеры из Prototype, адаптив на всех storefront-страницах (отдельные mobile-фреймы Figma не верстались).

## Итог

**Переписано 22 уникальных экрана** (+ состояния Cart, модалки/табы PDP, Contact / FAQ).  
Чеклист закрыт: [FIGMA-REWRITE-CHECKLIST.md](../продукт/FIGMA-REWRITE-CHECKLIST.md).

### Макеты (source of truth)

| Роль | Файл | Ссылка |
|------|------|--------|
| **Канон экранов** | Prototype | [xFLIIfNIIiBHaMcijSE84I · `3129:2254`](https://www.figma.com/design/xFLIIfNIIiBHaMcijSE84I/?node-id=3129-2254) |
| Вспомогательный wireframe | структура / размеры | [cF0bKFsmenH6rrshGV0yO7](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/) |
| Инвентарь нод | — | [FIGMA-PAGE-INVENTORY.md](../продукт/FIGMA-PAGE-INVENTORY.md) |

---

## 22 уникальных экрана

| # | Экран | Route | Статус |
|---|--------|-------|--------|
| 0 | Shell: Header + Footer + Menu | все storefront | ✅ |
| 1 | Home | `/` | ✅ |
| 2 | Product List | `/products` | ✅ |
| 3 | Product Page | `/products/:id` | ✅ |
| 4 | Log In | `/login` | ✅ |
| 5 | Sign Up | `/register` | ✅ |
| 5a | Sign Up — код | `/verify-code` | ✅ |
| 5b | Sign Up — finish | `/finishing-touches` | ✅ |
| 6 | Forgot password | `/forgot-password` | ✅ |
| 6a | Reset password | `/reset-password` | ✅ |
| 7 | Cart | `/cart` | ✅ |
| 7c | Checkout | `/checkout` | ✅ |
| 8–10 | Terms / Privacy / License | `/terms`, `/privacy`, `/license` | ✅ |
| 11 | 404 | `*` | ✅ |
| 12–15 | Account: orders / wishlist / reviews / settings | `/account/*` | ✅ |
| 16 | Admin login | `/admin/login` | ✅ |
| 17 | Admin categories | `/admin/categories` | ✅ |
| 18 | Admin users | `/admin/users` | ✅ |
| 19–20 | Admin products + edit | `/admin/products`, `/admin/products/:id` | ✅ |
| 21 | Admin orders | `/admin/orders` | ✅ |
| 22 | Admin reviews | `/admin/reviews` | ✅ |

**Дополнительно закрыто (не в счёт «22», но по макету):**

- PDP: tabs Delivery / Payment / Security / Returns / About seller + Create review  
- Cart: empty / guest  
- Support: Contact (`/contact`), FAQ (`/faq`)

---

## Что сделано по сути

1. **Layout и токены** — `--figma-*` в `storefront.css`, контент 1600 / canvas 1920, единый shell.  
2. **Витрина** — Home (hero / категории / deals / CTA), каталог, PDP, карточка товара, карусели, футер.  
3. **Auth-flow** — login / register / verify / finishing / forgot / reset по макету.  
4. **Cart → Checkout** — полная / пустая / гость; оформление заказа с API checkout.  
5. **Legal + 404** — Terms, Privacy, License, Not Found.  
6. **Account** — orders, wishlist, reviews, settings.  
7. **Admin** — login, categories (дерево / модалки), users, products (+ edit), orders, reviews.  
8. **Полировка Home-баннеров** — убраны тёмные рамки экспорта PNG; лёгкая тень `0 2px 4px` под hero и CTA.

### Ключевые зоны кода

| Зона | Файлы |
|------|--------|
| Роутинг | `src/app/router.tsx` |
| Витрина | `src/pages/HomePage.tsx`, `ProductsPage.tsx`, `ProductPage.tsx`, `CartPage.tsx`, `CheckoutPage.tsx`, `SupportPages.tsx`, `LegalPage.tsx`, `NotFoundPage.tsx` |
| Auth | `src/pages/auth/*`, `src/widgets/auth/*` |
| Account | `src/widgets/layout/AccountShell.tsx`, account pages |
| Admin | `src/pages/admin/*`, `src/widgets/admin/*`, `src/styles/admin.css` |
| Стили | `src/styles/storefront.css`, `auth.css` |
| Ассеты | `public/images/home/*`, `public/icons/*`, `figma-assets/` |

---

## Правила, которых держались

- Канон — **Prototype**, не устаревшие дубликаты wireframe.  
- Desktop-размеры из Figma; адаптив — CSS, без отдельных mobile-кадров.  
- Один канон на экран (дубликаты Main × N в файле игнорировали).  
- Сверка по чеклисту; для admin categories/users — скрины в `docs/screenshots/figma-parity/admin/`.

---

## Статус

| | |
|--|--|
| Перепись экранов | **Завершена** |
| Открытых страниц в чеклисте | **0** |
| Следующий шаг по Figma-вёрстке | не требуется |

Вне scope этой переписи (см. [ХРОНИКА-РАБОТЫ.md](../ХРОНИКА-РАБОТЫ.md)): JWT/#95, SMTP на защиту, variants каталога, слайды #92.
