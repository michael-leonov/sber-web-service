# sber-web-service

## Задача

Необходимо разработать небольшой веб сервис.

### Функционал

1. Отображение на странице списка карточек, которые необходимо получать через restApi с сервера.

2. Карточка представляет собой блок с заголовком и описанием. Внешний вид карточки на усмотрение кандидата.

3. Реализовать возможность добавления новой карточки. Это должно производиться на отдельной странице с формой, в которой должны быть поля заголовок и описание.

4. Настроить маршрутизацию между страницей со спискоми формой. Для перехода между страницами в шапке страницы расположить двекнопки "Форма" и "Карточки".

### Ограничения

1. Максимальная длина заголовка карточки - 100 символов.

2. Максимальная длина описания карточки - без ограничений.

### Дополнительные требования(сделать один любой пункт):

- [x] Авторизация. Добавить сущность User, ограничив доступ к страницам “Список” и “Форма” неавторизованному пользователю. Тип авторизации выбирается по усмотрению кандидата. Сделать привязку пользователя к создаваемой им карточке.

- [] Динамический скрол карточек в списке. Необходимо ограничить количество отображаемых изначально карточек. Делать запрос на получение новых карточек только если пользователь проскролил до конца списка.

- [] Контейнеризация проекта с использованием Docker/Docker compose. Приложение и базу данных настроить для разворачивания в контейнере, атакже добавить seeds для заполнения таблицы cards тестовыми записями.

- [] Добавить документацию и тесты к проекту. Описание методов Api в swagger с описанием всех ответов и запросов. А также два-три теста для методов api и компонентов front’a

## Запуск приложения

### Запуск в development mode

Склонируйте репозиторий

#### Запуск бэкенда

1. Перейти в директорию с сервером:

```sh
cd server
```

2. Установите зависимости:

```sh
npm i
```

3. Создайте в директории с клиентом файл **.env** и настройте переменные окружения из файла **.env.example**

4. Запустите бэкенд командой:

```sh
npm run dev
```

#### Запуск фронденда

1. Перейти в директорию с клиентом:

```sh
cd client
```

2. Установите зависимости:

```sh
npm i
```

3. Создайте в директории с клиентом файл **.env** и настройте переменные окружения из файла **.env.example**

4. Запустите фронтенд командой:

```sh
npm run start
```

Приложение доступно по: [http://localhost:3000](http://localhost:3000)

## Технический стек приложения

# Frontend

1. [TypeScript](https://www.typescriptlang.org/)
2. [React](https://ru.reactjs.org/)
3. [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
4. [React Router DOM](https://reactrouter.com/en/main)
5. [React Hook Form](https://react-hook-form.com/)
6. [Tailwind CSS](https://tailwindcss.com/)

# Backend

1. [NodeJs](https://nodejs.org/en/about)
2. [Express](https://expressjs.com/ru/)
3. [Sequelize](https://sequelize.org/)

# Database

1. [MySQL](https://www.mysql.com/)
