# Проектная работа "Веб-ларек"

Это интернет-магазин, предлагающий товары для веб-разработчиков. Пользователи могут просматривать каталог продукции, добавлять товары в корзину и оформлять заказы.  

---------------------------------------------------------------------------------------------------------------------------------

## **Описание**  

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

---------------------------------------------------------------------------------------------------------------------------------

## **Описание базовых классов**

### **Класс Api имеет следующие свойства и методы.**

#### **Атрибуты**
- `baseUrl: string` - Базовый URL API. Все запросы используют его как корень для построения конечных точек.
- `options: RequestInit` - Настройки запросов по умолчанию для всех HTTP-вызовов. Содержит предустановленные заголовки, такие как `'Content-Type': 'application/json'`.

#### **Конструктор**
- `constructor(baseUrl: string, options: RequestInit = {})` - Инициализирует экземпляр `Api` с указанным базовым URL и настройками запросов.

#### **Методы:**
- `handleResponse(response: Response): Promise<object> `- обработчик ответа сервера.
- `get(uri: string)` - принимает изменяющеюся часть url-адреса, возвращает ответ от сервера.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - принимает изменяющеюся часть url-адреса, принимает данные в виде объекта для отправки на сервер, type ApiPostMethods = 'POST' | 'PUT' | 'DELETE'.


### **Класс EventEmitter - брокер событий, implements от IEvents и имеет следующие методы.**

Класс EventEmitter реализует паттерн «Observer/Наблюдатель» и обеспечивает работу событий, его методы позволяют устанавливать и снимать слушатели событий, вызвать слушатели при возникновении события.

#### **Методы:**
- `on`- для подписки на событие.
- `off`- для отписки от события.
- `emit` - уведомления подписчиков о наступлении события соответственно.
- `onAll` - для подписки на все события.
- `offAll` - сброса всех подписчиков.
- `trigger` - генерирует заданное событие с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса EventEmitter.

---------------------------------------------------------------------------------------------------------------------------------

## **Описание классов Model**  

Классы Model отвечают за хранение и обработку данных, полученных от сервера и пользователя.  

### **Класс ApiModel**  
Этот класс является наследником класса `Api`. Он выполняет взаимодействие с сервером, включая передачу и получение данных.  

#### **Атрибуты**
- `cdnUrl: string` - Базовый URL для загрузки изображений товаров. Используется для формирования полного пути к изображениям в карточках товаров.
- `total: number` - Общая сумма, связанная с заказом пользователя (сумма всех продуктов в заказе).
- `items: IProduct[]` - Массив объектов товаров. Содержит данные, загружаемые с сервера. 

#### **Конструктор**
- `constructor(cdnUrl: string, baseUrl: string, options?: RequestInit)` - Создает экземпляр `ApiModel` с указанием базового URL, CDN для изображений и дополнительных настроек для запросов.

#### **Методы:**  
- `getListProductCard` — загружает с сервера массив объектов, представляющих карточки товаров.  
- `postOrderLot` — отправляет данные заказа на сервер и возвращает ответ о его статусе. 

#### **Пользовательские события**
- `products:loaded:` Срабатывает, когда список карточек продуктов успешно загружен с сервера.
- `order:posted:` Срабатывает, когда заказ успешно отправлен на сервер.
- `order:error:` Срабатывает, если произошла ошибка при отправке заказа.


### **Класс BasketModel**  
Этот класс предназначен для управления данными, которые вводит пользователь, в частности, товарами, добавленными в корзину.  

#### **Атрибуты**
- `protected _basketProducts: IProduct[]` - Массив, который хранит список карточек товаров, добавленных в корзину. Этот атрибут является приватным и используется для внутреннего хранения данных.
- `basketProducts: IProduct[]` - Геттер и сеттер для работы с товарами в корзине. Сеттер позволяет установить новые товары в корзину, а геттер возвращает текущий список товаров.

#### **Конструктор**
- `constructor()` - Инициализирует новый экземпляр класса `BasketModel`, создавая пустую корзину.
При создании объекта корзина будет пустой, и товары в корзине будут храниться в виде массива.

#### **Методы:**  
- `getBasketCount` — возвращает текущее количество товаров в корзине.  
- `sumAllBasketItems` — подсчитывает и возвращает общую стоимость товаров в корзине в синапсах.  
- `setSelectedCard` — добавляет выбранный товар в корзину.  
- `deleteCardFromBasket` — удаляет конкретный товар из корзины.  
- `clearBasketItems` — очищает корзину, удаляя все товары.  

#### **Пользовательские события**
- `basket:updated` - Вызывается при любом изменении содержимого корзины (добавление, удаление или очистка).
- `basket:itemAdded` - Срабатывает при добавлении нового товара в корзину.
- `basket:itemRemoved` - Срабатывает при удалении товара из корзины.
- `basket:cleared` - Срабатывает, когда корзина полностью очищена.


### **Класс DataModel**  
Служит для хранения данных о продуктах, загруженных с сервера.  

#### **Атрибуты**
- `_catalogItems: IProduct[]` - Массив объектов карточек продуктов.
- `selectedItem: IProduct` - Выбранная карточка продукта, которая отображается в модальном окне.
- `events: IEvents` - Экземпляр объекта событий, который используется для управления пользовательскими событиями.

#### **Конструктор**
`constructor(protected events: IEvents)`
- `Параметры: events: IEvents` - Объект для управления пользовательскими событиями.

#### **Метод:**  
- `setPreview` — сохраняет данные о карточке товара, которую пользователь открыл для просмотра.  

#### **Пользовательские события**
- `productCards:receive` - Срабатывает после обновления массива карточек продуктов.
- `modalCard:open` - Срабатывает при выборе карточки продукта для предпросмотра.


### **Класс FormModel**  
Этот класс управляет данными, которые пользователь ввел для оформления заказа.  

#### **Атрибуты**
- `payment: string` - Тип оплаты, выбранный пользователем.  
- `email: string` -  Адрес электронной почты пользователя.  
- `phone: string` - Номер телефона пользователя.  
- `address: string` - Адрес доставки.  
- `total: number` - Итоговая сумма заказа.  
- `items: string[]` -  Список идентификаторов товаров, включённых в заказ.  
- `events: IEvents` -  Объект для управления пользовательскими событиями.

#### **Конструктор**
- `constructor(protected events: IEvents)`

#### **Методы:**  
- `addOrderAddress` - Получение адреса клиента
- `validateOrder` - Проверка заказа
- `setOrderInfo` - Обновляет данные формы заказа для указанных полей.
- `validateContactInfo` - Проверка информации о клиенте
- `fetchOrderDetails` - Возвращает объект, содержащий текущие данные формы заказа.

#### **Пользовательские события**
- `order:update` - обновления формы

---------------------------------------------------------------------------------------------------------------------------------

## **Описание классов View**  

Классы View отвечают за отображение элементов страницы, взаимодействие с пользователем и обработку событий.  

### **Класс Basket**  
Управляет отображением корзины на странице.  

#### **Атрибуты:**
- `basket (HTMLElement)` — Корневой элемент корзины.
- `title (HTMLElement)` — Заголовок корзины.
- `shoppingBasket (HTMLElement)` — Элемент списка товаров в корзине.
- `button (HTMLButtonElement)` — Кнопка для оформления заказа.
- `basketTotalPrice (HTMLElement)` — Элемент отображения общей стоимости товаров.
- `shoppingBasketButton (HTMLButtonElement)` — Кнопка в шапке для открытия корзины.
- `shoppingBasketCounter (HTMLElement)` — Элемент для отображения количества товаров в корзине.

#### **Конструктор**
- `constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions)`

#### **Методы:**  
- `rendershoppingBasketCounter` — отображает текущее количество товаров в корзине.  
- `rendersumAllBasketItems` — отображает общую стоимость всех товаров в корзине.  
- `render` — Рендерит корзину.

#### **Пользовательские события**
- `order:open` - Вызывается при нажатии кнопки оформления заказа.
- `basket:open` - Вызывается при нажатии кнопки открытия корзины в заголовке.


### **Класс BasketItens**  
Управляет отображением отдельных товаров в корзине.   

#### **Атрибуты**
- `basketItem: HTMLElement` - Основной контейнер карточки товара в корзине.
- `index: HTMLElement` - Элемент для отображения порядкового номера товара в списке корзины.
- `itle: HTMLElement` - Элемент для отображения названия товара.
- `price: HTMLElement` - Элемент для отображения цены товара.
- `buttonDelete: HTMLButtonElement` - Кнопка для удаления товара из корзины.
- `events: IEvents` - Объект для управления событиями.
- `actions?: IActions` - Дополнительные действия, передаваемые в конструктор.

#### **Конструктор**
- `constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions)`

#### **Метод:**  
- `setPrice` — принимает числовое значение цены товара и возвращает его в формате строки.  
- `render` - Заполняет DOM-элемент товара данными о нем и возвращает его для добавления в корзину.

#### **Пользовательские события**
- `onClick` - Вызывается при нажатии на кнопку удаления товара из корзины.


### **Класс Card**  
Отвечает за отображение карточки товара на странице.  

#### **Атрибуты**
- `_cardElement: HTMLElement` -  Основной контейнер карточки.
- `_cardItemCategory: HTMLElement` - Элемент для отображения категории товара.
- `_cardItemTitle: HTMLElement` - Элемент для отображения названия товара.
- `_cardItemImage: HTMLImageElement` - Элемент для отображения изображения товара.
- `_cardItemPrice: HTMLElement` - Элемент для отображения цены товара.
- `events: IEvents` - Объект для управления пользовательскими событиями.
- `actions?: IActions` - Объект действий, например обработчик нажатий.

#### **Конструктор**
`constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions)`

#### **Методы:**
- `setText` — принимает HTML-элемент и текстовое значение, устанавливая содержимое элемента.
- `cardCategory` — принимает строку и добавляет соответствующий className к элементу.
- `setPrice` — преобразует числовую цену товара в строковый формат.
- `render(data: IProductItem): HTMLElement` - Заполняет карточку данными о товаре и возвращает её DOM-элемент.

#### **Пользовательские события**
- `onClick` - Срабатывает при нажатии на карточку товара


### **Класс Order**  
Управляет содержимым модального окна, где пользователь выбирает способ оплаты и вводит адрес доставки.  

#### **Атрибуты**
- `orderForm: HTMLFormElement` - HTML-элемент формы оформления заказа.
- `manageAllButton: HTMLButtonElement[]` - Массив кнопок для выбора способа оплаты.
- `address: HTMLElement` - Элемент ввода адреса доставки.
- `buttonSubmit: HTMLButtonElement` - Кнопка для подтверждения заказа.
- `events: IEvents` - Объект для управления пользовательскими событиями.

#### **Конструктор**
`constructor(template: HTMLTemplateElement, protected events: IEvents)`

#### **Метод:**  
- `paymentSelection` — визуально выделяет выбранный метод оплаты.  
- `render` - Возвращает HTML-элемент формы для отображения на странице.

#### **Пользовательские события**
- `order:paymentSelection` - Срабатывает при выборе способа оплаты. Передает выбранную кнопку
- `contacts:open` - Срабатывает при отправке формы. Используется для открытия контактов или завершения оформления заказа.
- `order:changeAddress` - Срабатывает при вводе или изменении адреса доставки. Передает данные о поле ввода и его значении.


### **Класс Contacts**  
Управляет модальным окном для ввода пользователем телефона и электронной почты.  

#### **Атрибуты**
- `userContactForm: HTMLFormElement` - HTML-форма для ввода контактной информации.
- `inputAll: HTMLInputElement[]` - Массив всех полей ввода в форме (например, email, телефон).
- `formSubmitButton: HTMLButtonElement` - Кнопка для подтверждения и отправки формы.
- `events: IEvents` - Объект для управления пользовательскими событиями.

#### **Конструктор**
- `constructor(template: HTMLTemplateElement, protected events: IEvents)`

#### **Метод:**  
- `render` - Возвращает HTML-элемент формы для отображения на странице.

#### **Пользовательские события**
- `contacts:changeInput` - Срабатывает при изменении значения в любом поле ввода. Передает имя и новое значение поля.
- `success:open` - Срабатывает при успешной отправке формы. Используется для открытия страницы или окна подтверждения.

### **Класс Modal**  
Управляет отображением и закрытием модальных окон.  

#### **Атрибуты**
- `modalWrapper: HTMLElement` - Корневой элемент модального окна.
- `modalCloseButton: HTMLButtonElement` - Кнопка для закрытия модального окна.
- `_modalContent: HTMLElement` - Элемент, представляющий содержимое модального окна.
- `events: IEvents` - Объект для управления пользовательскими событиями.

#### **Конструктор**
- `constructor(modalContainer: HTMLElement, protected events: IEvents)`

#### **Методы:**  
- `open` — открывает модальное окно.  
- `close` — закрывает модальное окно.  
- `render` - Открывает модальное окно и возвращает его элемент.

#### **Пользовательские события**
- `modal:open` - Событие, которое может быть вызвано для открытия модального окна.
- `modal:close` - Событие, которое может быть вызвано для закрытия модального окна.


### **Класс Success**  
Управляет отображением сообщения об успешно оформленном заказе в модальном окне.

#### **Атрибуты**
- `orderSuccess: HTMLElement` - Корневой элемент экрана успешного оформления заказа.
- `orderSuccessDescription: HTMLElement` - Элемент, отображающий описание с информацией о списанных средствах.
- `orderSucessClosebutton: HTMLButtonElement` - Кнопка для закрытия экрана успешного оформления заказа.
- `events: IEvents` - Объект для управления пользовательскими событиями.

#### **Конструктор**
- `constructor(template: HTMLTemplateElement, protected events: IEvents)`

#### **Методы:**  
- `render` - Устанавливает описание с суммой списанных средств и возвращает элемент экрана.

#### **Пользовательские события**
- `success:order` - Показывает сообщение об успешном оформлении заказа.  
- `success:close` - Событие, которое вызывается при нажатии на кнопку закрытия экрана.


---------------------------------------------------------------------------------------------------------------------------------

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
