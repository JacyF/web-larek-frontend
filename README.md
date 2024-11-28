# Проектная работа "Веб-ларек"

Это интернет-магазин, предлагающий товары для веб-разработчиков. Пользователи могут просматривать каталог продукции, добавлять товары в корзину и оформлять заказы.  

**Описание**  

В проекте реализован подход MVP (Model-View-Presenter), который обеспечивает строгое разделение задач между классами Model и View. Каждый из них имеет четкую зону ответственности:  

- **Model** — отвечает за загрузку данных через API, их сохранение и обработку информации, введенной пользователем.  
- **View** — отвечает за визуальное представление интерфейса, обеспечивает взаимодействие с пользователем и фиксирует события, происходящие в интерфейсе.  
- **EventEmitter** выполняет роль посредника (Presenter), соединяя модели данных и пользовательский интерфейс. Он обрабатывает события и управляет взаимодействием между слоями.  

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

**Описание базовых классов**

Класс Api имеет следующие свойства и методы.

Методы:

- handleResponse(response: Response): Promise<object> - обработчик ответа сервера.
get(uri: string) - принимает изменяющеюся часть url-адреса, возвращает ответ от сервера.
post(uri: string, data: object, method: ApiPostMethods = 'POST') - принимает изменяющеюся часть url-адреса, принимает данные в виде объекта для отправки на сервер, type ApiPostMethods = 'POST' | 'PUT' | 'DELETE'.
Класс EventEmitter - брокер событий, implements от IEvents и имеет следующие методы.

Класс EventEmitter реализует паттерн «Observer/Наблюдатель» и обеспечивает работу событий, его методы позволяют устанавливать и снимать слушатели событий, вызвать слушатели при возникновении события.

Методы:

on - для подписки на событие.
off - для отписки от события.
emit - уведомления подписчиков о наступлении события соответственно.
onAll - для подписки на все события.
offAll - сброса всех подписчиков.
trigger - генерирует заданное событие с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса EventEmitter.
## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
