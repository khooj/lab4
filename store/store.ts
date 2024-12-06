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
  count: number,
};

export class Products {
  constructor() {
    const dbConn = SQLite.openDatabaseSync('db.db');
    dbConn.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS checkout (
      id INTEGER PRIMARY KEY NOT NULL, 
      item_id INTEGER UNIQUE NOT NULL,
      count INTEGER NOT NULL);
    `);

    this.dbConn = dbConn;
    makeAutoObservable(this);
  }

  dbConn: SQLite.SQLiteDatabase | null;
  products = new Array<ProductData>();
  checkout = new Array<CheckoutItem>();

  dropDatabase() {
    this.dbConn?.closeSync();
    this.dbConn = null;
    SQLite.deleteDatabaseSync('db.db');
  }

  async fetchProducts() {
    const products = await fetch(apiUrl + '/products');
    const productsBody = await products.json();
    //const result = await this.dbConn.getAllAsync('SELECT * FROM test');

    runInAction(() => {
      this.products = productsBody;
    });
  }

  addCheckoutItem(itemId: number) {
    this.dbConn?.runSync('INSERT INTO checkout (item_id, count) VALUES (?, ?) ON CONFLICT(item_id) DO UPDATE SET count=count+1', itemId, 1);
    runInAction(() => {
      this.fetchCheckout();
    });
  }

  increaseCheckoutItem(id: number) {
    this.dbConn?.runSync('UPDATE checkout SET count=count+1 WHERE id = ?', id);
    runInAction(() => {
      this.fetchCheckout();
    });
  }

  decreaseCheckoutItem(id: number) {
    const item = this.checkout.find(el => el.id === id);
    if (!item)
      return;

    if (item.count === 1) {
      this.removeCheckoutItem(item.id);
    } else {
      this.dbConn?.runSync('UPDATE checkout SET count=count-1 WHERE id = ?', id);
    }
    runInAction(() => {
      this.fetchCheckout();
    });
  }

  removeCheckoutItem(id: number) {
    this.dbConn?.runSync('DELETE FROM checkout WHERE id = ?', id);
    runInAction(() => {
      this.fetchCheckout();
    });
  }

  fetchCheckout() {
    const checkout = this.dbConn?.getAllSync<CheckoutItem>('SELECT * FROM checkout');
    this.checkout = checkout || this.checkout;
  }
}

const products = new Products();

//autorun(() => {
//  products.dbConn = 
//});

export const ProductsContext = createContext<Products>(products);
