# Чеклист: перепись страниц под Figma

Файлы макета:
- Экраны (канон Prototype): [`xFLIIfNIIiBHaMcijSE84I` · Prototype `3129:2254`](https://www.figma.com/design/xFLIIfNIIiBHaMcijSE84I/?node-id=3129-2254)
- Wireframe (вспомогательный): [`cF0bKFsmenH6rrshGV0yO7`](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/)

Правила: один канон на экран · desktop-размеры из Figma · адаптив на всех страницах · mobile-фреймы Figma не отдельно.

---

## Порядок работ

| # | Страница / состояние | FE route | Figma node (Prototype) | Статус |
|---|---|---|---|---|
| 0 | Shell: Header + Footer + Menu | все storefront | `3782:684` / Menu | 🟢 |
| 1 | Home | `/` | `3782:684` | 🟢 |
| 2 | Product List | `/products` | `4071:3550` | 🟢 |
| 3 | Product Page | `/products/:id` | `4458:20617` | 🟢 |
| 3a | PDP tabs (delivery/payment/…) | tabs/modals | Product Page overlays | 🟢 |
| 3b | Create review | modal | `4533:27903` | 🟢 |
| 4 | Log In | `/login` | `4191:48443` | 🟢 |
| 5 | Sign Up | `/register` | Log In variants | 🟢 |
| 5a | Sign Up code | `/verify-code` | Log In variants | 🟢 |
| 5b | Sign Up finish | `/finishing-touches` | `4251:33099` | 🟢 |
| 6 | Forgot password | `/forgot-password` | Log In variants | 🟢 |
| 6a | Reset password | `/reset-password` | `4251:8816` | 🟢 |
| 7 | Cart full | `/cart` | `4651:35502` | 🟢 |
| 7a | Cart empty | `/cart` | Cart variants | 🟢 |
| 7b | Cart guest | `/cart` | Cart variants | 🟢 |
| 7c | Checkout | `/checkout` | `4577:28174` | 🟢 |
| 8 | Terms | `/terms` | legal | 🟢 |
| 9 | Privacy | `/privacy` | legal | 🟢 |
| 10 | License | `/license` | legal | 🟢 |
| 11 | 404 | `*` | `4605:32924` | 🟢 |
| 12 | Account orders | `/account/orders` | `4273:17336` | 🟢 |
| 13 | Wishlist | `/account/wishlist` | Account | 🟢 |
| 14 | Account reviews | `/account/reviews` | Account | 🟢 |
| 15 | Settings | `/account/settings` | Account | 🟢 |
| 16 | Admin login | `/admin/login` | `4611:53113` | 🟢 |
| 17 | Admin categories | `/admin/categories` | `4611:36436` | 🟢 |
| 18 | Admin users | `/admin/users` | `4611:48973` | 🟢 |
| 19 | Admin products | `/admin/products` | `4836:46110` | 🟢 |
| 20 | Admin product edit | `/admin/products/:id` | `4611:53960` | 🟢 |
| 21 | Admin orders | `/admin/orders` | Orders | 🟢 |
| 22 | Admin reviews | `/admin/reviews` | Reviews | 🟢 |

**Итого уникальных экранов к переписи: ~22** (+ состояния/модалки PDP и Cart).

---

## Следующий шаг

Чеклист закрыт (включая Checkout, Contact, FAQ).
