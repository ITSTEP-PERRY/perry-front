# Решение Mobile (Expo) ↔ Auth / Product — гайд для помощи Илоне

**Для кого:** мы (Product / Front), если Илона не успевает по карточкам `#M*`  
**Карточки на Trello (не трогаем — только локальный план):**  
[#M00](https://trello.com/c/ix5hiTSu) · [#M01](https://trello.com/c/63QzjZYo) · [#M02](https://trello.com/c/ceIOmXtY) · [#M03](https://trello.com/c/ArWBOdJJ) · [#M04](https://trello.com/c/LopRXSxI) · [#M05](https://trello.com/c/LLUi9Nek) · [#M06](https://trello.com/c/vI0plLBa) · [#M07](https://trello.com/c/lXL3TXqt) · [#M08](https://trello.com/c/vjeEXsXJ) · [#M09](https://trello.com/c/KX2tUN1q) · [#M10](https://trello.com/c/OTpA35fF)

**Контекст:** [МОБИЛЬНОЕ-ПРИЛОЖЕНИЕ-REACT.md](./МОБИЛЬНОЕ-ПРИЛОЖЕНИЕ-REACT.md) · [СООБЩЕНИЕ-В-ЧАТ-MOBILE.md](./СООБЩЕНИЕ-В-ЧАТ-MOBILE.md) · [AUTH-INTEGRATION.md](./AUTH-INTEGRATION.md)  
**Эталон API на web:** `D:\Perry\src\api\*` (perry-front)  
**Figma iPhone:** [cF0bKFsmenH6rrshGV0yO7](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/)  
**Репо мобилки:** [perry-mobile](https://github.com/ITSTEP-PERRY/perry-mobile) (создать/взять у Илоны)

**Принцип:** бэкенд **не переписываем**. Помогаем кодом Expo / портом `api/` / точечными фиксы Product.  
**Секреты в git не кладём.** Значения `…` — плейсхолдеры.

**Не путать с** Epic K `#77–#82` = адаптив **web**. Серия `#M*` = **Expo / React Native**.

---

## 0. Кто что делает + чем можем помочь

| # | Суть | Основной исполнитель | Чем можем помочь быстро |
|---|------|----------------------|-------------------------|
| **#M00** | Скоуп / MVP | всем читать | этот документ + Telegram-текст |
| **#M01** | Expo + api-клиент | Mobile | отдать готовый порт `src/api` (ниже §1) |
| **#M02** | Auth + SecureStore | Mobile | экраны + token store (§2) |
| **#M03** | Nav + Menu | Mobile | структура навигации + Figma nodes (§3) |
| **#M04** | Home | Mobile | те же запросы, что web Home (§4) |
| **#M05** | Catalog | Mobile | `productsApi.list` + facets (§5) |
| **#M06** | PDP + медиа | Mobile | gallery + `resolveMediaUrl` absolute (§6) |
| **#M07** | Cart / Checkout / Orders | Mobile | sessionId + merge + checkout body (§7) |
| **#M08** | Reviews / Wishlist / Account | Mobile | endpoints web (§8) · резать если срок |
| **#M09** | EAS + smoke | Mobile | чеклист smoke (§9) |
| **#M10** | BE URL / pageSize | **мы (Product)** | §10 — наша зона |

### Порядок закрытия MVP

```text
M01 → M02 → M03 → (M04 ∥ M05) → M06 → M07 → M09
M08 — после MVP или параллельно, если есть силы
M10 — по мере smoke (фото/401)
```

### Где код лежит у нас (чтобы вставить в perry-mobile)

| Web (эталон) | Mobile (куда переносить) |
|--------------|--------------------------|
| `src/api/client.ts` | `src/api/client.ts` |
| `src/api/media.ts` | `src/api/media.ts` |
| `src/api/types.ts` | `src/api/types.ts` |
| `src/api/index.ts` | `src/api/index.ts` (без admin / usersApi) |
| `src/theme/colors.ts` | `src/theme/colors.ts` |
| `src/app/AuthContext.tsx` | `src/auth/AuthContext.tsx` |
| `src/app/CartContext.tsx` | `src/cart/CartContext.tsx` |

На мобилке **не** переносим: admin pages, `usersApi`, Dev `Admin/Admin`, Vite proxy.

---

## Figma — канон iPhone (390×844)

Файл: `cF0bKFsmenH6rrshGV0yO7`

| Экран | node-id | Ссылка |
|-------|---------|--------|
| Main | `806:1722` | [открыть](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/?node-id=806-1722) |
| Product List | `839:1735` | [открыть](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/?node-id=839-1735) |
| Product Page | `1376:1973` | [открыть](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/?node-id=1376-1973) |
| PDP slide up / see more | `2006:7641` | [открыть](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/?node-id=2006-7641) |
| Menu customer | `2004:5947` | [открыть](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/?node-id=2004-5947) |
| Menu guest | `2006:9189` | [открыть](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/?node-id=2006-9189) |
| Sign up & Log in - Mobile | `2446:4341` | [открыть](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/?node-id=2446-4341) |
| Log in | `2446:3513` | — |
| Sign up | `2446:4342` | — |
| Send code | `2446:4913` | — |

Compact banners (цветной файл `xFLIIfNIIiBHaMcijSE84I`): Group 1142 / 1164 / 887 — для Home hero на 390px.

Cart/Checkout: отдельных iPhone-кадров мало → поведение как web Cart V2 + узкий layout.

---

## 1. [#M01] Expo + env + api-клиент

### Старт

```bash
npx create-expo-app perry-mobile -t blank-typescript
cd perry-mobile
npx expo install expo-secure-store @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
```

### `.env` / `app.config` (публичные URL только)

```env
EXPO_PUBLIC_PRODUCT_URL=http://10.0.2.2:5272
EXPO_PUBLIC_AUTH_URL=https://perry-auth-service.orangeplant-910928aa.swedencentral.azurecontainerapps.io
EXPO_PUBLIC_APP_ENV=development
```

| Среда | Product URL |
|-------|-------------|
| Android emulator | `http://10.0.2.2:5272` |
| iOS simulator | `http://localhost:5272` |
| Физический телефон | `http://<LAN-IP-машины>:5272` (firewall!) |
| Prod | Azure / опубликованный Product origin |

Auth — Azure origin как на web (без Vite proxy). CORS для **native fetch не нужен**.

### Тема (из web `src/theme/colors.ts`)

```ts
export const colors = {
  primary: "#B8EA48",
  darkText: "#0E2042",
  secondary: "#4A7BD9",
  objects: "#F4FAFF",
  destructive: "#EA4848",
  inputBorder: "#0E204280",
};
```

### `src/api/client.ts` — порт с web (ключевые отличия)

Web хранит JWT в `localStorage` и ходит через `/api` proxy.  
Mobile: **абсолютные origin** + **SecureStore**.

```ts
// src/api/token.ts
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "perry_access_token";
const REFRESH_KEY = "perry_refresh_token";
const SESSION_KEY = "perry_cart_session";

export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}
export async function setToken(token: string | null) {
  if (token) await SecureStore.setItemAsync(TOKEN_KEY, token);
  else await SecureStore.deleteItemAsync(TOKEN_KEY);
}
export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(REFRESH_KEY);
}
export async function setRefreshToken(token: string | null) {
  if (token) await SecureStore.setItemAsync(REFRESH_KEY, token);
  else await SecureStore.deleteItemAsync(REFRESH_KEY);
}

export async function getCartSessionId(): Promise<string> {
  let id = await SecureStore.getItemAsync(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    await SecureStore.setItemAsync(SESSION_KEY, id);
  }
  return id;
}
```

```ts
// src/api/client.ts (суть)
import { getToken } from "./token";

const PRODUCT = (process.env.EXPO_PUBLIC_PRODUCT_URL || "").replace(/\/$/, "");
const AUTH = (process.env.EXPO_PUBLIC_AUTH_URL || "").replace(/\/$/, "");

export function productUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  // Product controllers: /api/...
  return `${PRODUCT}/api${p.startsWith("/api/") ? p.slice(4) : p}`;
}

export function authUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p.startsWith("/api/")) return `${AUTH}${p}`;
  return `${AUTH}/api${p}`;
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public body?: unknown) {
    super(message);
  }
}

type Base = "product" | "auth";

export async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit & { base?: Base } = {},
): Promise<T> {
  const { base = "product", ...rest } = init;
  const headers = new Headers(rest.headers);
  const method = (rest.method || "GET").toUpperCase();
  let body = rest.body;
  if (!body && (method === "POST" || method === "PUT" || method === "PATCH")) {
    body = "{}";
  }
  if (body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const token = await getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const url =
    path.startsWith("http") ? path : base === "auth" ? authUrl(path) : productUrl(path);

  let res: Response;
  try {
    res = await fetch(url, { ...rest, method, headers, body });
  } catch {
    throw new ApiError(
      0,
      base === "auth"
        ? "Network — Auth unreachable (EXPO_PUBLIC_AUTH_URL)"
        : "Network — Product unreachable (EXPO_PUBLIC_PRODUCT_URL / :5272)",
    );
  }

  const text = await res.text();
  const data = text ? (() => { try { return JSON.parse(text); } catch { return text; } })() : null;
  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && ("error" in data || "message" in data || "title" in data)
        ? String((data as any).error || (data as any).message || (data as any).title)
        : "") || `HTTP ${res.status}`;
    throw new ApiError(res.status, msg, data);
  }
  return data as T;
}
```

### Smoke #M01

```text
1. Запустить Product :5272
2. Эмулятор → GET {PRODUCT}/api/health → 200
3. Приложение открывается без красного экрана
```

### Чем помочь Илоне

Скопировать из `D:\Perry\src\api\` файлы `types.ts`, куски `index.ts` (categories/products/cart/orders/reviews/wishlist/auth **без** admin) и адаптировать `client` под SecureStore + absolute URL (выше).

---

## 2. [#M02] Auth (SecureStore, login / me / 401)

### Figma

Секция [Sign up & Log in - Mobile](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/?node-id=2446-4341): Log in / Sign up / Send code.

### Контракт (как web `authApi`)

| Действие | Метод | Base | Body / заметки |
|----------|-------|------|----------------|
| Login | `POST /api/auth/login` | Auth | `{ email, login, password }` — web шлёт оба |
| Register | `POST /api/auth/register` | Auth | `{ email, password, name, login }` |
| Me | `GET /api/auth/me` | Auth | Bearer |
| Forgot | `POST /api/auth/forgot-password` | Auth | `{ email }` |
| Refresh | уточнить у Auth (`/api/auth/refresh`) | Auth | если есть refreshToken |

Ответ login нормализовать как web:

```ts
// token: raw.token ?? raw.accessToken ?? raw.access_token
// user: raw.user ?? raw.data?.user ?? raw
```

**Не делать на мобилке:** Dev `Admin/Admin` → Product `/dev/admin-login` (только web DEV).

### AuthContext (скелет)

```ts
// после login:
await setToken(res.token);
if (refresh) await setRefreshToken(refresh);
setUser(res.user);
// merge корзины — см. #M07
await cartApi.merge(await getCartSessionId());

// на старте:
const token = await getToken();
if (token) {
  try { setUser(await authApi.me()); }
  catch (e) {
    if (e instanceof ApiError && e.status === 401) {
      // TODO: refresh → иначе clear tokens + Login
      await setToken(null);
    }
  }
}
```

### 401 pipeline

1. Поймать `ApiError` status 401 на Product/Auth.  
2. Если есть refresh — один retry.  
3. Иначе очистить SecureStore → экран Login.

### Acceptance

- [ ] Login тестовым User → `me` ок  
- [ ] Токен в SecureStore, не AsyncStorage  
- [ ] UI ближе к iPhone Log in / Sign up  

### Чем помочь

Отдать `normalizeAuthResponse` / `normalizeAuthUser` из `src/api/index.ts` (строки ~351–392) + простые экраны Login/Register на RN `TextInput` + кнопки Perry green.

---

## 3. [#M03] Shell: Navigation + Menu

### Структура

```text
RootStack
├── AuthStack (Login, Register, Forgot) — если !user и нужен gated flow
└── MainTabs
    ├── Home
    ├── Catalog (stack → ProductList → Product)
    ├── Cart (stack → Checkout)
    └── Account (stack → Orders / Wishlist / Reviews / Settings)
+ Modal/Drawer: Menu (guest | customer)
```

### Меню (Figma)

| Состояние | node | Пункты |
|-----------|------|--------|
| Guest | `2006:9189` | Sign up, Log in, каталог, Terms/Privacy |
| Customer | `2004:5947` | Profile/Orders/Wishlist/Reviews, Logout, каталог |

### Acceptance

- [ ] Два состояния по `user`  
- [ ] SafeAreaView / notch  
- [ ] Закрытие: back / overlay  

### Чем помочь

Набросать `AppNavigator.tsx` + `MenuSheet.tsx` без пиксель-перфекта — Илона подтянет стили по Figma.

---

## 4. [#M04] Home (iPhone Main)

### Данные — как web `HomePage.tsx`

```ts
await Promise.all([
  categoriesApi.tree(),
  productsApi.list({ pageSize: 12, sort: "newest" }),  // Trending
  productsApi.list({ pageSize: 12, sort: "rating" }),  // Best / Sale block
]);
```

### UI блоки (Figma Main `806:1722`)

1. Hero / banners (compact Groups из цветного файла или локальные ассеты)  
2. Категории (горизонтальный scroll / 2 ряда)  
3. Trending deals → See all → Catalog  
4. Best sellers / Sale → See all  
5. CTA Sign up / Log in (если гость)

### Acceptance

- [ ] Данные с Product, не моки  
- [ ] ~390px без горизонтального overflow  
- [ ] Error banner, если Product down  

### Чем помочь

Порт разметки секций + `FlatList`/`ScrollView`; ассеты hero можно временно из `figma-assets` / web public.

---

## 5. [#M05] Catalog: Product List + фильтры

### API

```ts
productsApi.list({
  categoryId, brand, brands[], fabrics[], sizes[], colors[],
  minPrice, maxPrice, minRating, search, sort,
  page: 1,
  pageSize: 20, // на mobile не 100+
});
// ответ: { items, total, facets: { brands, fabrics, sizes, colors } }
categoriesApi.tree() // выбор категории
```

### UI (Figma `839:1735`)

- Сетка 2 колонки  
- Кнопка Filters → bottom sheet (как web `useIsMobile`)  
- Empty state  

### Acceptance

- [ ] Список с API  
- [ ] Фильтры большим пальцем  
- [ ] Тап → PDP (`#M06`)  

### Чем помочь

Скопировать `ProductQuery` + нормализацию `imageUrl` из `src/api/index.ts`.

---

## 6. [#M06] PDP + медиа URL

### API

```ts
const p = await productsApi.byId(id);
// images[], attributes[], aboutItems[], reviews?, related?, saleRelated?
await cartApi.add(null, sessionId, productId, 1);
await wishlistApi.add(productId); // если залогинен
```

### UI (Figma `1376:1973` + slide up `2006:7641`)

1. Галерея swipe (`FlatList` horizontal / paging)  
2. Цена / oldPrice / rating  
3. Sticky Add to cart  
4. About + attributes  
5. Bottom sheet «see more» / delivery-payment-returns (контент как web `PdpInfoModal`)  

### Медиа — критично для эмулятора

Web `resolveMediaUrl` только достаёт строку. На native нужен **абсолютный** URL:

```ts
// src/api/media.ts
const PRODUCT = (process.env.EXPO_PUBLIC_PRODUCT_URL || "").replace(/\/$/, "");

export function resolveMediaUrl(value: unknown): string | null {
  let url: string | null = null;
  if (typeof value === "string") url = value;
  else if (value && typeof value === "object" && "url" in value) {
    const u = (value as { url?: unknown }).url;
    url = typeof u === "string" && u ? u : null;
  }
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  // относительные /uploads/... → Product origin
  if (url.startsWith("/")) return `${PRODUCT}${url}`;
  return `${PRODUCT}/${url}`;
}
```

Если картинки всё равно 404 — карточка **#M10** (Product отдаёт абсолютные URL).

### Acceptance

- [ ] Фото на эмуляторе  
- [ ] Add to cart  
- [ ] Нет горизонтального скролла страницы  

### Чем помочь

Готовый `resolveMediaUrl` + простой PDP read-only; sticky CTA отдельно.

---

## 7. [#M07] Cart + Checkout + My orders

### API (web `cartApi` / `ordersApi`)

```ts
const sessionId = await getCartSessionId();

cartApi.get(null, sessionId)
cartApi.add(null, sessionId, productId, qty)
cartApi.setQty(null, sessionId, productId, qty)
cartApi.remove(null, sessionId, productId)
cartApi.merge(sessionId) // POST /api/cart/merge { sessionId } — после login, с Bearer

ordersApi.checkout(sessionId, {
  shippingAddress: "...",
  paymentType: "Cash", // default как web
  recipientName: "...",
})
ordersApi.mine()
ordersApi.byId(id)
```

Query к корзине: `?sessionId=...` (см. web `cartQs`).

### Поток

```text
Guest: sessionId в SecureStore → add/get
Login (#M02): merge(sessionId) → дальше Bearer+session
Checkout: форма address/payment → POST checkout → Orders list
```

### UI

- Cart full / empty / guest CTA → Login  
- Checkout fields  
- Orders list + details (status read-only)  

Отдельных iPhone Cart кадров мало → верстать узко по web Cart V2.

### Acceptance

- [ ] Гость собирает корзину  
- [ ] Merge после логина не теряет позиции  
- [ ] Checkout → заказ в My orders  

### Чем помочь

Порт `CartContext` логики (без DOM) + экраны Cart/Checkout/OrdersList. Это **MVP-критичный** кусок — если Илона застряла, берём `#M07` в первую очередь после `#M01–M02`.

---

## 8. [#M08] Reviews + Wishlist + Account (P1)

Резать при нехватке срока — **после** `#M07`.

### API

```ts
// reviews на PDP уже в ProductDetail.reviews
reviewsApi.create(productId, { rating, title, body, tags?, imageUrls? })
reviewsApi.mine() // GET /api/reviews/me?...

wishlistApi.mine()
wishlistApi.ids()
wishlistApi.add(productId)
wishlistApi.remove(productId)

authApi.updateMe({ name }) // Auth может не уметь PUT — web делает fallback
authApi.forgot / changePassword — по готовности Auth
```

### Экраны

- Account hub (из Menu customer)  
- My orders (уже #M07)  
- Wishlist  
- My reviews  
- Settings (имя)  

### Acceptance

- [ ] Create review с JWT  
- [ ] Wishlist sync  
- [ ] Guest → Login на write  

### Чем помочь

Минимальные списки + форма рейтинга 1–5; без фото в отзыве на MVP.

---

## 9. [#M09] Полировка + EAS + smoke MVP

### Чеклист smoke (эмулятор / устройство)

```text
[ ] Product :5272 up · Auth Azure reachable
[ ] EXPO_PUBLIC_* верные для среды
[ ] GET /api/health
[ ] Register или Login → JWT в SecureStore
[ ] GET /api/auth/me
[ ] Home: категории + товары
[ ] Catalog → PDP: фото видны
[ ] Add to cart → Cart totals
[ ] Login merge (если гость копил корзину)
[ ] Checkout → My orders видит заказ
[ ] (желательно) POST /api/reviews
[ ] Нет экранов /admin · нет Internal #97
```

### EAS (по возможности)

```bash
npm i -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

Иконки / splash / имя `Perry`. Deep link опционально: `perry://product/{id}`.

### Чем помочь

Пройти smoke самим и завести баги списком Илоне; сборку EAS можно взять на себя.

---

## 10. [#M10] Product BE — точечные фиксы (наша зона)

**Обычно ничего.** Делаем только если smoke `#M06/#M09` красный.

| Симптом | Действие |
|---------|----------|
| `Image` не грузит `/uploads/...` | Клиентский `resolveMediaUrl` (§6) **сначала**; если мало — Product отдаёт абсолютный URL в DTO |
| Огромный list медленный | Default `pageSize` ≤ 20–24 на list endpoints / документировать для mobile |
| 401 после login | Стыки `#96/#98` JWT iss/aud/claims — см. [РЕШЕНИЕ-СТЫКОВ-С-КОДОМ.md](./РЕШЕНИЕ-СТЫКОВ-С-КОДОМ.md) |
| Refresh не работает | Уточнить контракт Auth; не блокер MVP если access живёт достаточно для демо |
| Expo Web CORS | Только если гоняют web-target Expo — native не нужен |
| Push | **Не делаем** в этой серии |

**Не делать:** переписывать домен, Internal `#97`, admin API под мобилку.

### Acceptance #M10

- [ ] Фото + JWT с эмулятора ок  
- [ ] Фикс описан комментарием в карточке / короткий абзац в docs  

---

## 11. Карта API для perry-mobile (без admin)

| Область | Endpoints |
|---------|-----------|
| Health | `GET /api/health` |
| Auth | `POST /api/auth/login`, `register`, `GET me`, `forgot-password`, (+ refresh) |
| Categories | `GET /api/categories` |
| Products | `GET /api/products`, `GET /api/products/{id}` |
| Cart | `GET /api/cart?sessionId`, `POST add`, `PUT quantity`, `DELETE item/{id}`, `POST merge` |
| Orders | `POST /api/orders/checkout`, `GET /api/orders`, `GET /api/orders/{id}` |
| Reviews | `POST /api/reviews`, `GET /api/reviews/me` (+ reviews в PDP) |
| Wishlist | `GET /api/wishlist`, `GET ids`, `POST`, `DELETE /{productId}` |

Эталон реализации: `D:\Perry\src\api\index.ts`.

---

## 12. Как быстро «подхватить» карточку у Илоны

1. Спросить: репо `perry-mobile` есть? ветка? что уже зелёное из smoke §9?  
2. Брать в порядке: **M01 → M02 → M07** (каркас + auth + покупка) — максимальный эффект для демо.  
3. UI пиксель-перфект Figma можно добить позже; сначала данные с API.  
4. Результат — PR в `perry-mobile` + комментарий в карточке Trello (карточку **не двигаем**, пока Илона/команда не попросит).  
5. Секреты Auth/JWT **не** в чат и **не** в git.

---

## 13. Итог

| Вопрос | Ответ |
|--------|--------|
| Переписывать бэкенд? | **Нет** (кроме точечного #M10) |
| Откуда брать контракты? | Web `src/api/*` + этот файл |
| Макеты? | iPhone frames в таблице Figma выше |
| Что вне скоупа? | Admin, Razor, #97, Push |
| MVP done когда? | Login → каталог/PDP с фото → cart → checkout → My orders |

Связанные: [МОБИЛЬНОЕ-ПРИЛОЖЕНИЕ-REACT.md](./МОБИЛЬНОЕ-ПРИЛОЖЕНИЕ-REACT.md) · [СООБЩЕНИЕ-В-ЧАТ-MOBILE.md](./СООБЩЕНИЕ-В-ЧАТ-MOBILE.md) · [AUTH-INTEGRATION.md](./AUTH-INTEGRATION.md)
