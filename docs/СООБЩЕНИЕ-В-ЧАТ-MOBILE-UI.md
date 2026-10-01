# Сообщение команде: Mobile UI — окна по Figma (Илона)

**Зачем файл:** продублировать в **Telegram** серию карточек Trello `#MU00–#MU11` (пиксель-перфект экранов).  
Внутри — таблица + готовый текст «скопировал → вставил».

Доска: [ITSTEP-PERRY](https://trello.com/b/bwEYs3Kq/itstep-perry) · колонка **To Do**  
Пакет-шапка: [#MU00](https://trello.com/c/pF82eP7L)  
Figma iPhone: [cF0bKFsmenH6rrshGV0yO7](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/)  
Код: [`mobile/`](../mobile/) · Login-эталон уже в `LoginScreen.tsx`  
План API: [СООБЩЕНИЕ-В-ЧАТ-MOBILE.md](./СООБЩЕНИЕ-В-ЧАТ-MOBILE.md) (`#M00–#M10`) · [РЕШЕНИЕ-MOBILE-С-КОДОМ.md](./РЕШЕНИЕ-MOBILE-С-КОДОМ.md)

**Не путать:**
- `#M00–#M10` — каркас Expo + API (логика)
- `#MU00–#MU11` — **UI окон** под Figma (для Илоны)
- `#77–#82` — адаптив **web**, не native

---

## Как пользоваться

1. Открой блок **«Текст для Telegram»** ниже.  
2. Скопируй в чат / тред Mobile (лучше адресно Илоне).  
3. Статус — комментарием в карточке Trello.

---

## Карточки (To Do) — окна

| # | Ссылка | Экран / окно | Figma | Приоритет |
|---|--------|--------------|-------|-----------|
| **#MU00** | https://trello.com/c/pF82eP7L | Пакет / эпик UI | — | P0 |
| **#MU01** | https://trello.com/c/SUSy1RLK | Login (эталон в коде — сверка) | `2446:3513` | P0 |
| **#MU02** | https://trello.com/c/RfMuLajv | Sign up | `2446:4342` | P0 |
| **#MU03** | https://trello.com/c/CMazCxTk | Send code | `2446:4913` | P0 |
| **#MU04** | https://trello.com/c/GpgqK08a | Forgot password | auth mobile | P1 |
| **#MU05** | https://trello.com/c/oNyeTar2 | Home / Main | `806:1722` | P0 |
| **#MU06** | https://trello.com/c/Q6DcbtHV | Product List | `839:1735` | P0 |
| **#MU07** | https://trello.com/c/2XbFfAYE | Product Page + slide up | `1376:1973` · `2006:7641` | P0 |
| **#MU08** | https://trello.com/c/2uuJUL1J | Menu guest / customer | `2006:9189` · `2004:5947` | P0 |
| **#MU09** | https://trello.com/c/yqQTnhOg | Cart full / empty / guest | Cart V2 → mobile | P0 |
| **#MU10** | https://trello.com/c/7XaHjQYJ | Checkout | mobile form | P0 |
| **#MU11** | https://trello.com/c/nb8f6fpc | Account hub / orders / wishlist / reviews | Menu customer | P1 |

### Важно для Илоны

- Репо / папка: `mobile/` (Expo). Каркас API уже есть — **не переписывать бэкенд**, только UI.  
- Эталон подхода: Login (`#MU01`) — модалка, floating labels, overlay.  
- Acceptance: 390px без overflow, safe-area, скрин эмулятор ≈ Figma.  
- API-логику не ломать (login / catalog / cart работают как сейчас).

### Рекомендуемый порядок

```text
MU01 (сверка) → MU02 → MU03 → MU05 → MU06 → MU07 → MU08 → MU09 → MU10
MU04 · MU11 — можно параллельно / после MVP checkout
```

---

## Текст для Telegram (скопировать)

```text
Илона (и команда Mobile) — завели на Trello серию по UI окон мобилки Perry под Figma iPhone.

📌 Пакет: https://trello.com/c/pF82eP7L
🎨 Figma: https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/
💻 Код: папка mobile/ (Expo). Login уже подогнан под кадр 2446:3513 — можно брать как эталон.
🗂 Доска → To Do: https://trello.com/b/bwEYs3Kq/itstep-perry

⚠️ Это НЕ #M00–#M10 (там каркас + API) и НЕ web-адаптив #77–#82.
Серия #MU* = пиксель-перфект экранов. Бэкенд не трогаем.

Окна:

#MU00 Пакет https://trello.com/c/pF82eP7L
#MU01 Login (сверка эталона) https://trello.com/c/SUSy1RLK
#MU02 Sign up https://trello.com/c/RfMuLajv
#MU03 Send code https://trello.com/c/CMazCxTk
#MU04 Forgot password https://trello.com/c/GpgqK08a
#MU05 Home / Main https://trello.com/c/oNyeTar2
#MU06 Product List https://trello.com/c/Q6DcbtHV
#MU07 PDP + slide up https://trello.com/c/2XbFfAYE
#MU08 Menu guest/customer https://trello.com/c/2uuJUL1J
#MU09 Cart states https://trello.com/c/yqQTnhOg
#MU10 Checkout https://trello.com/c/7XaHjQYJ
#MU11 Account hub https://trello.com/c/nb8f6fpc

Старт: #MU01 → #MU02 → #MU05/#MU06.
Статус — комментарием в карточке Trello (можно дублем сюда).
```

---

## Короткий вариант

```text
Илона — Mobile UI (Figma iPhone), Trello To Do:

Пакет #MU00 https://trello.com/c/pF82eP7L
Login #MU01 https://trello.com/c/SUSy1RLK (эталон уже в mobile/)
Sign up #MU02 https://trello.com/c/RfMuLajv · Send code #MU03 https://trello.com/c/CMazCxTk
Forgot #MU04 https://trello.com/c/GpgqK08a
Home #MU05 https://trello.com/c/oNyeTar2 · List #MU06 https://trello.com/c/Q6DcbtHV
PDP #MU07 https://trello.com/c/2XbFfAYE · Menu #MU08 https://trello.com/c/2uuJUL1J
Cart #MU09 https://trello.com/c/yqQTnhOg · Checkout #MU10 https://trello.com/c/7XaHjQYJ
Account #MU11 https://trello.com/c/nb8f6fpc

Figma: https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/
Не путать с API-серией #M* и web #77–#82.
```

---

## Связь с #M*

| Слой | Серия | Кто |
|------|-------|-----|
| Expo + API + SecureStore | `#M01–#M10` | Mobile / мы подмогаем |
| UI окон 1:1 Figma | `#MU01–#MU11` | **Илона** |
| BE точечные фиксы | `#M10` | Product |
