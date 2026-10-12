# Исправление: аватар в отзыве на PDP (prod)

**Дата:** 2026-10-12  
**Исполнитель:** Сергей Черныш  
**Прод-страница:** https://perrydev.space/products/ed0c71d1-b625-4af1-a983-976397ab0cbb  
**Репо:** [ITSTEP-PERRY/perry-front](https://github.com/ITSTEP-PERRY/perry-front)  
**PR:** [#9](https://github.com/ITSTEP-PERRY/perry-front/pull/9) → **merged** в `main` (`8bc05cd`)  
**Коммит фикса:** `5c4251a` — `fix(reviews): resolve /uploads avatars against Product API on prod`

---

## Симптом

На карточке товара в блоке отзывов у комментария **Serhii Chernysh** («My opinion» / «So COOL») **не показывался аватар** — битая картинка / заглушка.

При этом:
- в боковом меню / профиле аватар **был и отображался**;
- товар и отзыв на API **были** (не проблема данных «отзыва нет»).

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

## Что исправлено (код)

| Файл | Изменение | Зачем |
|------|-----------|--------|
| `src/api/media.ts` | `productMediaOrigin()`, `absoluteUploadsUrl()`, обновлён `resolveMediaUrl` | В **prod** любой путь `/uploads/...` становится `https://api.perrydev.space/uploads/...` (или origin из `VITE_API_PROXY` / `VITE_PRODUCT_API_URL`) |
| `src/utils/reviewAuthor.ts` | `resolveReviewAvatar` прогоняет URL через `resolveMediaUrl` | Аватар в отзыве (и fallback «свой» аватар) не остаётся относительным на SWA |

В **dev** поведение прежнее: относительный `/uploads` → Vite proxy (origin пустой).

---

## Для чего

Чтобы на **задеплоенной** витрине `perrydev.space` отзывы показывали те же фото авторов, что лежат в Product `/uploads`, и совпадали с ожиданием пользователя: аватар в профиле ≈ аватар в своём отзыве.

Без этого фикса API отдаёт корректный относительный путь, но браузер на SWA запрашивает файл с неверного хоста → 404 только в отзывах.

---

## Статус и что нужно от деплоя

1. ~~Смержить PR #9~~ — **сделано** (`main` = `8bc05cd`).
2. **Redeploy** front с org `perry-front` / `main`.
3. После выката открыть PDP и проверить: `<img>` аватара в отзыве → `https://api.perrydev.space/uploads/...` (Network 200).

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
