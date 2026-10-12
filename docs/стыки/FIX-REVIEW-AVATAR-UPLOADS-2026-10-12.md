# Исправление: аватар в отзыве на PDP (prod)

**Дата:** 2026-10-12  
**Исполнитель:** Сергей Черныш  
**Прод-страница:** https://perrydev.space/products/ed0c71d1-b625-4af1-a983-976397ab0cbb  
**Репо:** [ITSTEP-PERRY/perry-front](https://github.com/ITSTEP-PERRY/perry-front)  
**PR:** https://github.com/ITSTEP-PERRY/perry-front/pull/9  

---

## Симптом

На карточке товара в блоке отзывов у комментария **Serhii Chernysh** («My opinion» / «So COOL») **не показывается аватар** — битая картинка / заглушка.

При этом:
- в боковом меню / профиле аватар **есть и отображается**;
- товар и отзыв на API **есть** (не проблема данных «отзыва нет»).

---

## Причина

Product API хранит фото автора отзыва как **относительный** путь:

```text
authorAvatarUrl = "/uploads/fcf6dcc6-7927-4e77-b8c2-99a41e5dea83.jpg"
```

Файл лежит на **Product API**:

```text
https://api.perrydev.space/uploads/...   → HTTP 200 ✅
```

Фронт на Azure Static Web Apps открывается с другого хоста:

```text
https://perrydev.space
```

Браузер подставлял относительный `/uploads/...` к **витрине**, а не к API:

```text
https://perrydev.space/uploads/...       → HTTP 404 ❌
```

Профиль в меню берёт аватар из **Auth** (другой URL) — поэтому там фото видно, а в отзыве нет.

Локально баг часто не заметен: Vite проксирует `/uploads` на API.

---

## Что исправлено

| Файл | Изменение |
|------|-----------|
| `src/api/media.ts` | `resolveMediaUrl` / `absoluteUploadsUrl`: в **prod** пути `/uploads/...` превращаются в `https://api.perrydev.space/uploads/...` (или `VITE_API_PROXY`) |
| `src/utils/reviewAuthor.ts` | `resolveReviewAvatar` прогоняет URL через `resolveMediaUrl` |

В **dev** поведение прежнее: относительный `/uploads` → Vite proxy.

---

## Для чего

Чтобы отзывы на **задеплоенной** витрине `perrydev.space` показывали те же фото авторов, что сохранены в Product `/uploads`, и совпадали с ожиданиями пользователя (аватар в профиле ≈ аватар в своём отзыве).

---

## Что нужно от деплоя

1. Смержить / задеплоить PR #9 на `perry-front` `main`.
2. После выката обновить PDP: аватар в первом отзыве должен грузиться с `api.perrydev.space`.

Проверка без фронта:

```bash
curl -I "https://api.perrydev.space/uploads/fcf6dcc6-7927-4e77-b8c2-99a41e5dea83.jpg"
# ожидается 200
curl -I "https://perrydev.space/uploads/fcf6dcc6-7927-4e77-b8c2-99a41e5dea83.jpg"
# ожидается 404 (на SWA файла нет — так и должно быть)
```

---

## Не путать с

- **404 на прямой ссылке `/products/{id}`** (Azure SWA без `navigationFallback`) — отдельная тема, не этот фикс.
- Отсутствием аватара у других авторов без `authorAvatarUrl` — там по дизайну инициалы.

---

*Документ для команды деплоя / журнала, 2026-10-12.*
