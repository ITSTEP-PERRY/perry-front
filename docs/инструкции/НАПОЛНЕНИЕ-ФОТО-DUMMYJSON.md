# Как загрузить фото витрины (DummyJSON)

Канон (полный текст): репозиторий Product —  
`docs/инструкции/НАПОЛНЕНИЕ-ФОТО-DUMMYJSON.md`  
([My_Amazon2](https://github.com/Teslyar75/My_Amazon2) / [Back_end](https://github.com/ITSTEP-PERRY/Back_end_for_our_poroject)).

Отчёт дня: [журнал/2026-10-02.md](../журнал/2026-10-02.md)

---

## Зачем

В git нет файлов картинок — только сидер Product API. После `pull` каждый поднимает API в **Development**, и БД наполняется URL с `cdn.dummyjson.com` (~194 товара `DJ-*` + разделы Beauty / Home & Kitchen).

## Минимум шагов (своя БД)

1. `git pull` Product API (`main`).
2. `docker compose up -d postgres`.
3. В `.env`: локальный Postgres + `ASPNETCORE_ENVIRONMENT=Development`.
4. `cd src/Perry.Api` → `dotnet run --launch-profile http` (:5272).
5. Проверка: `GET /api/products` → `imageUrl` с `cdn.dummyjson.com`.
6. Витрина: http://localhost:3000 (perry-front).

Общая Supabase: тот же Development-старт допишет недостающие `DJ-*` без дублей.

Подробности, troubleshooting и «чего не делать» — в каноне Product (ссылка выше).
