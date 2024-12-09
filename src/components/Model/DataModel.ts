// Importing
import { IProductItem } from "../../types";
import { IDataModel } from "../../types/Components/Model/DataModel";
import { IEvents } from "../base/events";

// Data interface
export class DataModel implements IDataModel {
  private _catalogItems: IProductItem[] = [];
  selectedItem: IProductItem | null = null;

  constructor(private events: IEvents) {}

  // Managing items
  set catalogItems(data: IProductItem[]) {
    this._catalogItems = data;
    this.events.emit('catalogItems:receive');
  }

  get catalogItems(): IProductItem[] {
    return this._catalogItems;
  }

  setPreview(item: IProductItem): void {
    this.selectedItem = item;
    this.events.emit('modalCard:open', item);
  }
}