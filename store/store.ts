import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { createContext } from 'react';
import * as SQLite from 'expo-sqlite';

const apiUrl = 'https://fakestoreapi.com';

export type RatingData = {
  count: number,
  rate: number,
};

export type ProductData = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  rating: RatingData,
  title: string,
};

export type CheckoutItem = {
  id: number,
  item_id: number,
};

export class Products {
  constructor() {
    const dbConn = SQLite.openDatabaseSync('db');
    dbConn.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS checkout (
      id INTEGER PRIMARY KEY NOT NULL, 
      item_id INTEGER NOT NULL);
    `);

    this.dbConn = dbConn;
    makeAutoObservable(this);
  }

  dbConn;
  products = new Array<ProductData>();
  checkout = new Array<CheckoutItem>();

  async fetchProducts() {
    const products = await fetch(apiUrl + '/products');
    const productsBody = await products.json();
    //const result = await this.dbConn.getAllAsync('SELECT * FROM test');

    runInAction(() => {
      this.products = productsBody;
    });
  }

  addCheckoutItem(itemId: number) {
    const ret = this.dbConn.runSync('INSERT INTO checkout (item_id) VALUES (?)', itemId);
    this.checkout = [...this.checkout, { id: ret.lastInsertRowId, item_id: itemId }];
  }

  removeCheckoutItem(id: number) {
    this.dbConn.runSync('DELETE FROM checkout WHERE id = ?', id);
    this.checkout = this.checkout.filter(el => el.id !== id);
  }

  fetchCheckout() {
    const checkout = this.dbConn.getAllSync<CheckoutItem>('SELECT * FROM checkout');
    this.checkout = checkout;
  }
}

const products = new Products();

//autorun(() => {
//  products.dbConn = 
//});

export const ProductsContext = createContext<Products>(products);
