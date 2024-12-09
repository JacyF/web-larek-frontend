// Importing
import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ApiModel } from './components/Model/ApiModel';

import { DataModel } from './components/Model/DataModel';
import { Card } from './components/View/Card';
import { CardPreview } from './components/View/CardPreview';

import { IOrderForm, IProductItem } from './types';
import { Modal } from './components/View/Modal';
import { ensureElement } from './utils/utils';

import { BasketModel } from './components/Model/BasketModel';
import { Basket } from './components/View/Basket';
import { BasketItem } from './components/View/BasketItem';

import { FormModel } from './components/Model/FormModel';
import { Order } from './components/View/FormOrder';
import { Contacts } from './components/View/FormContacts';
import { Success } from './components/View/Success';

// Instances
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

const apiModel = new ApiModel(CDN_URL, API_URL);
const events = new EventEmitter();
const dataModel = new DataModel(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(basketTemplate, events);
const basketModel = new BasketModel();
const formModel = new FormModel(events);

// Displaying cards
events.on('catalogItems:receive', () => {
  dataModel.catalogItems.forEach(item => {
    const card = new Card(cardCatalogTemplate, events, { onClick: () => events.emit('card:select', item) });
    ensureElement<HTMLElement>('.gallery').append(card.render(item));
  });
});

// Receiving data objects from clicked item
events.on('card:select', (item: IProductItem) => { dataModel.setPreview(item) });

// Opening modal window cards
events.on('modalCard:open', (item: IProductItem) => {
  const cardPreview = new CardPreview(cardPreviewTemplate, events)
  modal.viewContent = cardPreview.render(item);
  modal.render();
});

// Adding item to the cart
events.on('card:addBasket', () => {
  basketModel.setSelectedCard(dataModel.selectedItem); // Add item to the cart
  basket.rendershoppingBasketCounter(basketModel.getBasketCount()); // display quantity of product on cart icon
  modal.close();
});

// Opening cart modal window
events.on('basket:open', () => {
  basket.rendersumAllBasketItems(basketModel.sumAllBasketItems());  // Displaying total sum in the cart
  // locking and unlocking button 
  let i = 0;
  basket.items = basketModel.basketProducts.map((item) => {
    const basketItem = new BasketItem(cardBasketTemplate, events, { onClick: () => events.emit('basket:basketItemRemove', item) });
    i = i + 1;
    return basketItem.render(item, i);
  })
  modal.viewContent = basket.render();
  modal.render();
});

// Deleting item from the cart
events.on('basket:basketItemRemove', (item: IProductItem) => {
  basketModel.deleteCardFromBasket(item);
  basket.rendershoppingBasketCounter(basketModel.getBasketCount()); // Quantity items in the cart
  basket.rendersumAllBasketItems(basketModel.sumAllBasketItems()); // sum all items in the cart
  let i = 0;
  basket.items = basketModel.basketProducts.map((item) => {
    const basketItem = new BasketItem(cardBasketTemplate, events, { onClick: () => events.emit('basket:basketItemRemove', item) });
    i = i + 1;
    return basketItem.render(item, i);
  })
});

// Opening modal ' payment methof and details delivery
events.on('order:open', () => {
  const order = new Order(orderTemplate, events);
  modal.viewContent = order.render();
  modal.render();
  formModel.items = basketModel.basketProducts.map(item => item.id); // Passing ID product
});

events.on('order:paymentSelection', (button: HTMLButtonElement) => { formModel.payment = button.name }) // Passing payment method

// Tracking changes in the input ' adress delivery '
events.on(`order:changeAddress`, (data: { field: string, value: string }) => {
  formModel.setOrderInfo(data.field, data.value);
});


events.on(`contacts:changeInput`, (data: { field: string, value: string }) => {
  formModel.setOrderInfo(data.field, data.value);
});

// Opening modal ' Order placed '
events.on('success:open', () => {
  apiModel.postOrderLot(formModel.fetchOrderDetails())
    .then((data) => {
      console.log(data);
      
      const success = new Success(successTemplate, events);
      modal.viewContent = success.render(basketModel.sumAllBasketItems());
      basketModel.clearBasketItems(); // Cleaning cart
      basket.rendershoppingBasketCounter(basketModel.getBasketCount()); // Displaying quantity items in the cart icon
      modal.render();
    })
    .catch(error => console.log(error));
});

events.on('success:close', () => modal.close());

// Receiving data from server
apiModel.getListProductCard()
  .then(function (data: IProductItem[]) {
    dataModel.catalogItems = data;
  })
  .catch(error => console.log(error))