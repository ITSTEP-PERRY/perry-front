# Mobile ↔ Desktop backend + внутренние ссылки

**Дата:** 2026-10-01  
**Цель:** мобилка (`mobile/`) ходит в **тот же Product API**, что и desktop Vite, и все внутренние ссылки ведут на рабочие экраны.

---

## Backend (как у desktop)

| Слой | Desktop (Vite :3000) | Mobile Expo Web (:8081) | Mobile native |
|------|----------------------|-------------------------|---------------|
| Product | `/api` → **:5272** | Metro `/api` (+ `/uploads`) → **:5272** | `EXPO_PUBLIC_PRODUCT_URL` |
| Auth | `/auth-api` → Azure | Metro `/auth-api` → Azure | `EXPO_PUBLIC_AUTH_URL` |

Код:
- `mobile/metro.config.js` — прокси Product + Auth  
- `mobile/src/api/client.ts` — web: same-origin `/api`, native: absolute URL  
- `mobile/src/api/media.ts` — web: relative `/uploads`, native: Product origin  

Перед стартом mobile: **Perry.Api на :5272** (проверка: `http://localhost:5272/api/products?page=1&pageSize=1`).  
После смены `metro.config.js` — **перезапустить Expo**.

---

## Навигация

Единая точка: `navigateShop()` / `navigationRef` (`mobile/src/navigation/navigationRef.ts`).

Используется из:
- Header (search / cart)
- MenuDrawer (все пункты, включая Legal)
- SiteFooter (Contact / FAQ / Terms / License / Privacy)
- Account, Cart, Login, Register, Checkout, Wishlist, …

Legal-страницы: полный текст как на web (`LegalContent.tsx` + `LegalScreen.tsx`), переключатели Terms ↔ License ↔ Privacy.

---

## Чеклист ссылок

| Откуда | Куда | Статус |
|--------|------|--------|
| Footer Contact / FAQ / Terms / License / Privacy | Legal screens + полный текст | ✅ |
| Menu guest/customer Legal + Catalog + Account | `navigateShop` | ✅ |
| Account hub Legal / Orders / Wishlist / … | `navigateShop` | ✅ |
| Register Terms / Privacy | root Legal | ✅ |
| Login ↔ Register, Forgot password | root | ✅ |
| Cart → Catalog / Login / Checkout | ✅ |
| Wishlist → Product / Login | ✅ |
| Home footer | SiteFooter → `navigateShop` | ✅ |

---

*Обновлено вместе с правками mobile API proxy и Legal full text.*
