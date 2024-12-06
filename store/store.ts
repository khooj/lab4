import { action, makeAutoObservable, observable } from 'mobx';
import { createContext } from 'react';

export class Products {
  constructor() {
    makeAutoObservable(this);
  }

  prop1 = "";

  setProp1(newProp: string) {
    this.prop1 = newProp;
  }
}

export const ProductsContext = createContext<Products>(new Products());
