# Сообщение команде: Mobile (Expo) ↔ Auth / Product

**Зачем файл:** продублировать в **Telegram** серию карточек Trello `#M00–#M10`, если кто-то не смотрит доску.  
Внутри — таблица заданий + готовый текст «скопировал → вставил».

Доска: [ITSTEP-PERRY](https://trello.com/b/bwEYs3Kq/itstep-perry) · колонка **To Do**  
Пакет-шапка: [#M00](https://trello.com/c/ix5hiTSu)  
План: [МОБИЛЬНОЕ-ПРИЛОЖЕНИЕ-REACT.md](./МОБИЛЬНОЕ-ПРИЛОЖЕНИЕ-REACT.md)  
Figma (iPhone): [cF0bKFsmenH6rrshGV0yO7](https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/)

**Не путать с** Epic K `#77–#82` — это адаптив **web**-витрины. Серия `#M*` = **Expo / React Native** + наш Auth/Product API.

---

## Как пользоваться

1. Открой блок **«Текст для Telegram»** ниже.  
2. Скопируй целиком в общий чат (или в тред Mobile / perry-mobile).  
3. По желанию допиши, кто берёт `#M01` / `#M02` первым.  
4. Ответы и статус лучше дублировать **комментарием в карточке** на Trello.

---

## Карточки (To Do)

| # | Ссылка | Что сделать | Кому | Приоритет |
|---|--------|-------------|------|-----------|
| **#M00** | https://trello.com/c/ix5hiTSu | Пакет / эпик: скоуп MVP, критерии, порядок фаз | всем читать | P0 |
| **#M01** | https://trello.com/c/63QzjZYo | Expo + env + api-клиент (порт с web) | Mobile | P0 |
| **#M02** | https://trello.com/c/ceIOmXtY | Auth: SecureStore, login / me / 401 | Mobile (+ Auth контракт) | P0 |
| **#M03** | https://trello.com/c/ArWBOdJJ | Shell: navigation + Menu guest/customer | Mobile | P0 |
| **#M04** | https://trello.com/c/LopRXSxI | Home (iPhone Main) + категории / блоки | Mobile | P0 |
| **#M05** | https://trello.com/c/LLUi9Nek | Catalog: Product List + фильтры | Mobile | P0 |
| **#M06** | https://trello.com/c/vI0plLBa | PDP: галерея / buy-box / see more + медиа URL | Mobile | P0 |
| **#M07** | https://trello.com/c/lXL3TXqt | Cart + Checkout + My orders | Mobile | P0 |
| **#M08** | https://trello.com/c/vjeEXsXJ | Reviews + Wishlist + Account | Mobile | P1 (после MVP checkout) |
| **#M09** | https://trello.com/c/KX2tUN1q | Полировка + EAS + smoke MVP | Mobile | P1 |
| **#M10** | https://trello.com/c/OTpA35fF | Product BE: точечные фиксы URL / pageSize / refresh | Product | P1 |

### Вне скоупа мобилки

- админка `/admin`
- Razor
- Internal Auth `#97`
- Push-уведомления (не MVP)

### MVP (минимальный демо-путь)

Login → JWT → каталог + PDP с фото → корзина → checkout → My orders.

Оценка: MVP ~10–15 чел/дней · полный клиент ~3–5 недель.

---

## Текст для Telegram (скопировать)

```text
Команда, завели на Trello серию по мобильному клиенту Perry (Expo / React Native) под наш Auth + Product API. Бэкенд не переписываем — пристёгиваем API.

📌 Пакет: https://trello.com/c/ix5hiTSu
📄 План: docs/МОБИЛЬНОЕ-ПРИЛОЖЕНИЕ-REACT.md
🎨 Figma iPhone: https://www.figma.com/design/cF0bKFsmenH6rrshGV0yO7/
🗂 Доска → To Do: https://trello.com/b/bwEYs3Kq/itstep-perry

⚠️ Это НЕ старые #77–#82 (адаптив web). Новая серия #M00–#M10 = native-приложение.

Скоуп MVP:
• Login → JWT в SecureStore
• Каталог + PDP с фото
• Корзина → checkout → My orders
• Без админки и без Internal (#97)

Карточки (по порядку):

#M00 Пакет https://trello.com/c/ix5hiTSu
#M01 Expo + env + api-клиент https://trello.com/c/63QzjZYo
#M02 Auth SecureStore / login / me / 401 https://trello.com/c/ceIOmXtY
#M03 Shell + Menu guest/customer https://trello.com/c/ArWBOdJJ
#M04 Home (iPhone Main) https://trello.com/c/LopRXSxI
#M05 Catalog + фильтры https://trello.com/c/LLUi9Nek
#M06 PDP + медиа URL https://trello.com/c/vI0plLBa
#M07 Cart + Checkout + Orders https://trello.com/c/lXL3TXqt
#M08 Reviews + Wishlist + Account (P1) https://trello.com/c/vjeEXsXJ
#M09 Полировка + EAS + smoke https://trello.com/c/KX2tUN1q
#M10 Product BE точечные фиксы под mobile https://trello.com/c/OTpA35fF

Кто берёт Mobile — начните с #M01 → #M02.
Product (#M10) — только если на smoke всплывут URL картинок / pageSize / refresh.

Статус лучше писать комментарием в карточке Trello (можно дублем сюда).
```

---

## Короткий вариант (если чат не любит длинные посты)

```text
Mobile Perry (Expo) ↔ наш Auth/Product — серия на Trello To Do:

Пакет #M00 https://trello.com/c/ix5hiTSu
#M01 https://trello.com/c/63QzjZYo · #M02 https://trello.com/c/ceIOmXtY · #M03 https://trello.com/c/ArWBOdJJ
#M04 https://trello.com/c/LopRXSxI · #M05 https://trello.com/c/LLUi9Nek · #M06 https://trello.com/c/vI0plLBa
#M07 https://trello.com/c/lXL3TXqt · #M08 https://trello.com/c/vjeEXsXJ · #M09 https://trello.com/c/KX2tUN1q
#M10 (BE) https://trello.com/c/OTpA35fF

MVP: login → каталог/PDP → cart → checkout → orders. Без админки/#97.
План: docs/МОБИЛЬНОЕ-ПРИЛОЖЕНИЕ-REACT.md
Не путать с web-адаптивом #77–#82.
```

---

## Кратко по фазам (для устного / follow-up)

| Фаза | Карточки | Содержание |
|------|----------|------------|
| 0 | #M01 | Expo, env, api-клиент |
| 1 | #M02 | Auth + SecureStore |
| 2 | #M03–#M06 | Shell, Home, Catalog, PDP |
| 3 | #M07 | Cart / Checkout / Orders |
| 4 | #M08 | Reviews / Wishlist / Account |
| 5 | #M09 | EAS, smoke |
| BE | #M10 | точечные фиксы API |
