# Figma → код: инвентарь экранов Perry

Файлы:
- Wireframe / экраны: [cF0bKFsmenH6rrshGV0yO7](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/)
- Цветные баннеры главной: [xFLIIfNIIiBHaMcijSE84I](https://www.figma.com/design/xFLIIfNIIiBHaMcijSE84I/?node-id=5412-45806) · **Group 1165**

Обновлено: 2026-09-30

**Scope:** Desktop-канон из Figma + **адаптив всех storefront-страниц** (не отдельные mobile-фреймы).

---

## Канон: Desktop - Main (главная)

| | |
|---|---|
| Ссылка | https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/?node-id=722-5792 |
| node-id | `722:5792` |
| размер | **1920×2782** |
| FE | `/` · `HomePage.tsx` |

### Секции верхнего уровня

| node-id | имя | размер | роль |
|---|---|---|---|
| `722:6618` | Header | 1920×64 | шапка |
| `722:5793` | Group 4 | 1600×352 | hero-карусель |
| `936:1917` | Group 505 | 1602×274 | категории ряд 1 (6×247) |
| `761:1863` | Trending deals | 219×40 | заголовок |
| `761:2045` | Frame 418 | 93×25 | See all |
| `761:1864` | Frame 414 | 1436×356 | товары Trending (6×226) |
| `763:2068` | Group 377 | 1600×56 | стрелки карусели |
| `2752:2409` | Group 506 | 1602×274 | категории ряд 2 |
| `763:2145` | Best sellers | 169×40 | заголовок Sale |
| `763:2328` | Frame 448 | 93×25 | See all |
| `763:2146` | Frame 447 | 1436×356 | товары Sale |
| `763:2321` | Group 380 | 1600×56 | стрелки |
| `2729:8646` | Frame 769 | 1600×308 | CTA Sign up / Log in |
| `722:6597` | Anchor Button | 62×62 | to-top |
| `722:5812` | Footer | 1920×262 | подвал |

### Токены

| токен | px |
|---|---|
| canvas | 1920 |
| content | 1600 |
| side pad | 160 |
| header h | 64 |
| hero | 1600×352 |
| category card | 247×274 |
| product card | 226×356 |
| product img | 178×178 |
| CTA | 1600×308 |
| footer | 1920×262 |
| search | 950×40 |
| arrow | 40×40 |

### Цветные баннеры (файл `xFLIIfNIIiBHaMcijSE84I`)

Пакет: [Group 1165](https://www.figma.com/design/xFLIIfNIIiBHaMcijSE84I/?node-id=5412-45806) · `5412:45806` · **2066×1092**

| node-id | имя | размер | роль |
|---|---|---|---|
| `5412:45779` | **Group 1163** | **1600×1092** | 3 desktop-баннера |
| `5412:45735` | Group 1160 | 1600×352 | Hero 1 — kitchenware Sale -50% |
| `5412:45745` | Group 1161 | 1600×352 | Hero 2 — Beach Ready |
| `5412:45755` | Group 1162 | 1600×308 | CTA — сундук / Abundance |
| `5412:45780` | Group 1142 | ~426×240 | mobile/compact kitchenware |
| `5412:45783` | Group 1164 | ~426×240 | mobile/compact beach |
| `5412:45786` | Group 887 | ~426×524 | mobile CTA chest |

На desktop-главной используем **только Group 1163** (три широких баннера).

---

## Каталог страниц проекта (канон → FE)

Дубликаты в Figma схлопнуты: один экран = один node.

### Storefront

| страница | канон node-id | размер | FE route |
|---|---|---|---|
| Main | `722:5792` | 1920×2782 | `/` |
| Product List | `722:2370` (V2) | 1920×2979 | `/products` |
| Product Page | `2548:9286` (without options) | 1920×5561 | `/products/:id` |
| Product — delivery | `905:3871` | 1920×1080 | tab |
| Product — payment | `920:3100` | 1920×1080 | tab |
| Product — security | `926:3494` | 1920×1080 | tab |
| Product — returns | `926:3802` | 1920×1080 | tab |
| Product — about seller | `926:4108` | 1920×1080 | tab |
| Product — create review | `4245:9684` | 1920×1080 | modal/flow |
| Cart | `2550:12481` (V2 full) | 1920×1900 | `/cart` |
| Cart empty | `2550:12482` | 1920×1080 | `/cart` |
| Cart guest | `2550:12483` | 1920×1080 | `/cart` |
| Log In | `2795:2174` / `1350:5004` | 1920×1080 | `/login` |
| Sign Up create | `1353:1912` | 1920×1080 | `/register` |
| Sign Up code | `1393:2003` | 1920×1080 | register flow |
| Sign Up finish | `1385:1909` | 1920×1080 | register flow |
| Forgot password | `2072:12437` | 1920×1080 | `/forgot-password` |
| Menu (guest) | `1860:2944` | 1920×1080 | menu |
| Menu (customer) | `1852:3311` | 1920×1080 | menu |
| Error 404 | `2548:8399` | 1920×1080 | `*` |
| Privacy | `3540:2754` | 1920×1080 | legal |
| License | `3558:2294` | 1920×1080 | legal |
| Terms | `3565:2906` | 1920×1080 | legal |

### Admin

| страница | канон node-id | FE |
|---|---|---|
| Admin Log in | `4152:5807` / `3448:3143` | `/admin/login` |
| Category default | `2720:4728` | `/admin/categories` |
| Category tree | `2720:5428` | `/admin/categories` |
| Category empty | `2601:4457` | |
| Create category | `3095:8878` | modal |
| Create subcategory | `3095:9190` | modal |
| Edit category | `3095:9518` | modal |
| Edit subcategory | `3095:9719` | modal |
| Delete category | `2506:3048` | modal |
| Delete selected | `2588:2249` | modal |
| Users default | `2720:5575` | `/admin/users` |
| Users empty | `2716:3824` | |
| Product default | `2720:4774` / `2145:3214` | `/admin/products` |
| Orders default | `4057:2281` / `2674:2644` | `/admin/orders` |
| Reviews default | `3448:3131` | `/admin/reviews` |

---

## Порядок работ (весь проект)

1. **Main** (`722:5792`) — точные размеры + цветной визуал из ассетов  
2. Shell: Header / Footer / Menu (общие на всех storefront)  
3. Product List → Product Page (+ tabs)  
4. Auth: Login / Sign up / Forgot  
5. Cart (3 состояния)  
6. Legal + 404  
7. Admin: Login → Categories → Users → Products → Orders → Reviews  

На каждой странице: выгрузка metadata → токены → вёрстка → сверка скриншотом Figma vs `localhost:3000`.

---

## Статус файла после чистки

- `Group 1162` (цветной CTA) — **удалён** (0 вхождений).  
- `Desktop - Main` `722:5792` — на месте, структура секций без изменений.  
- В файле всё ещё много **дубликатов** старых версий (Main ×19, Product ×15 и т.д.) — на вёрстку не влияют, если держимся канона из таблицы выше.

Если канон для какой-то страницы другой — пришли `node-id`, заменим в таблице.
