# Мобильная версия на React под наш бэкенд

**Цель:** клиент для покупателя (витрина) на **React Native / Expo**, без переписывания Product API и Auth.  
**Бэкенд остаётся:** Perry Product API + Perry Auth Service (Azure).  
**Не в скоупе:** админка `/admin`, Razor, Internal Auth (#97).

Полная копия / канон также в Product-репо:  
[Teslyar75/My_Amazon2 — docs/МОБИЛЬНОЕ-ПРИЛОЖЕНИЕ-REACT.md](https://github.com/Teslyar75/My_Amazon2/blob/feature/categories-facets-figma-storefront/docs/МОБИЛЬНОЕ-ПРИЛОЖЕНИЕ-REACT.md)

Связанные: [AUTH-INTEGRATION.md](./AUTH-INTEGRATION.md) · [СТЫКИ-ЛОКАЛЬНО.md](./СТЫКИ-ЛОКАЛЬНО.md) · [ОТЧЁТ-2026-09-29.md](./ОТЧЁТ-2026-09-29.md)

---

## 1. Вывод

**Бэкенд уже готов как API для мобилки.** Работа = новый React Native (Expo) фронт + подгонка URL/JWT/медиа. Product/Auth не переписываем.

---

## 2. Что переиспользуем

| Сервис | Зачем |
|--------|--------|
| Auth Service | login / register / refresh / me → JWT |
| Product API | каталог, PDP, корзина, заказы, отзывы, wishlist |
| JWT | `sub`, `role` — как на web |

Админка — только web.

---

## 3. Стек

| Вариант | Когда |
|---------|--------|
| **Expo (React Native)** ★ | основной план |
| Capacitor вокруг Vite React | быстрый ярлык, web-like UX |
| PWA | без сторов |

---

## 4. Фазы работ

| Фаза | Содержание | Ориентир |
|------|------------|----------|
| 0 | Expo + env + api-клиент (порт с web) | 0.5–1 д |
| 1 | Auth (SecureStore, 401) | 1–2 д |
| 2 | Home / Catalog / PDP + медиа | 2–4 д |
| 3 | Cart / checkout / orders | 2–3 д |
| 4 | Reviews / wishlist / account | 2–3 д |
| 5 | Полировка, EAS, иконки | 2–5 д |

**MVP (Auth→Checkout):** ~10–15 чел/дней · **с аккаунтом/отзывами + сторы:** ~3–5 недель.

---

## 5. Бэкенд: что править

Обычно **ничего**. Точечно при smoke: абсолютные URL картинок, refresh у Auth, pageSize.  
Push — отдельная задача, не MVP. Internal (#97) мобилке не нужен.

---

## 6. Критерии MVP

- Логин → JWT  
- Каталог + PDP с фото  
- Корзина → заказ → My orders  
- Без админки и без Internal credential  

---

## 7. Старт недели 1

1. `create-expo-app` + TypeScript  
2. Порт `api/client` с web  
3. Auth screens  
4. Home + list + PDP  
5. Cart + checkout  
6. Smoke: эмулятор → Product `:5272` + Azure Auth  

Подробный чеклист API и рисков — в Product-репо (ссылка в шапке).
