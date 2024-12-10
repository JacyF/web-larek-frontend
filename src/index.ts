// Importing
import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ApiModel } from './components/Model/ApiModel';

import { DataModel } from './components/Model/DataModel';
import { Card } from './components/ViewCard/Card';
import { CardPreview } from './components/ViewCard/CardPreview';

import { IOrderForm, IProductItem } from './types';
import { Modal } from './components/ViewCard/Modal';
import { ensureElement } from './utils/utils';

import { BasketModel } from './components/Model/BasketModel';
import { Basket } from './components/ViewCard/Basket';
import { BasketItem } from './components/ViewCard/BasketItem';

import { FormModel } from './components/Model/FormModel';
import { Order } from './components/ViewCard/FormOrder';
import { Contacts } from './components/ViewCard/FormContacts';
import { Success } from './components/ViewCard/Success';

// Templates
const templates = {
  cardCatalog: document.querySelector('#card-catalog') as HTMLTemplateElement,
  cardPreview: document.querySelector('#card-preview') as HTMLTemplateElement,
  basket: document.querySelector('#basket') as HTMLTemplateElement,
  cardBasket: document.querySelector('#card-basket') as HTMLTemplateElement,
  order: document.querySelector('#order') as HTMLTemplateElement,
  contacts: document.querySelector('#contacts') as HTMLTemplateElement,
  success: document.querySelector('#success') as HTMLTemplateElement,
};

// Instances
const apiModel = new ApiModel(CDN_URL, API_URL); 
const events = new EventEmitter(); 
const dataModel = new DataModel(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(templates.basket, events); 
const basketModel = new BasketModel();
const formModel = new FormModel(events);
const order = new Order(templates.order, events);
const contacts = new Contacts(templates.contacts, events);
const success = new Success(templates.success, events);

// Functions
const rendercatalogItems = () => {
  dataModel.catalogItems.forEach(item => {
    const card = new Card(templates.cardCatalog, events, { onClick: () => events.emit('card:select', item) });
    ensureElement<HTMLElement>('.gallery').append(card.render(item));
  });
};

const renderBasketModal = () => {
  basket.rendersumAllBasketItems(basketModel.sumAllBasketItems()); // sum all items in the cart
  basket.items = basketModel.basketProducts.map((item, index) => {
    const basketItem = new BasketItem(templates.cardBasket, events, { onClick: () => events.emit('basket:removeItem', item) });
    return basketItem.render(item, index + 1);
  });
  modal.viewContent = basket.render();
  modal.render();
};

const clearBasketAndUpdate = () => {
  basketModel.clearBasketItems();
  basket.rendershoppingBasketCounter(basketModel.getBasketCount()); // Quantity items in the cart
};

// Events

// Displaying cards
events.on('catalogItems:receive', rendercatalogItems);

// Receiving data objects from clicked item
events.on('card:select', (item: IProductItem) => dataModel.setPreview(item));

// Opening modal window cards
events.on('modalCard:open', (item: IProductItem) => {
  const cardPreview = new CardPreview(templates.cardPreview, events);
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
events.on('basket:open', renderBasketModal);

// Deleting item from the cart
events.on('basket:removeItem', (item: IProductItem) => {
  basketModel.deleteCardFromBasket(item);
  renderBasketModal();
});

// Opening modal ' payment methof and details delivery
events.on('order:open', () => {
  modal.viewContent = order.render();
  modal.render();
  formModel.items = basketModel.basketProducts.map(item => item.id);
});

// Passing payment method
events.on('order:paymentSelection', (button: HTMLButtonElement) => {
  formModel.payment = button.name;
});

// Tracking changes in the input ' adress delivery '
events.on('order:changeAddress', (data: { field: string, value: string }) => {
  formModel.addOrderAddress(data.field, data.value);
});

events.on('formErrors:address', (errors: Partial<IOrderForm>) => {
  const { address, payment } = errors;
  order.valid = !address && !payment;
  order.formErrors.textContent = Object.values(errors).filter(Boolean).join('; ');
});

events.on('contacts:open', () => {
  formModel.total = basketModel.sumAllBasketItems();
  modal.viewContent = contacts.render();
  modal.render();
});

events.on('contacts:changeInput', (data: { field: string, value: string }) => {
  formModel.setOrderInfo(data.field, data.value);
});

events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
  const { email, phone } = errors;
  contacts.valid = !email && !phone;
  contacts.formErrors.textContent = Object.values(errors).filter(Boolean).join('; ');
});

// Opening modal ' Order placed '
events.on('success:open', () => { 
  apiModel.postOrderLot(formModel.getOrderLot())
    .then(() => {
      modal.viewContent = success.render(basketModel.sumAllBasketItems());
      clearBasketAndUpdate(); // Cleaning cart
      modal.render();
    })
    .catch(console.error);
});

events.on('success:close', () => modal.close());
events.on('modal:open', () => { modal.wrapperLocked = true; });
events.on('modal:close', () => { modal.wrapperLocked= false; });

// Receiving data from server
apiModel.getListProductCard()
  .then(function (data: IProductItem[]) {
    dataModel.catalogItems = data;
  })
  .catch(error => console.log(error))