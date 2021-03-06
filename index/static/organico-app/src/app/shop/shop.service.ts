import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Headers, RequestOptions} from "@angular/http";

export interface CartItem {
  productId: number;
  image: string;
  name: string;
  description?: string;
  unitPrice: number;
  quantity: number;
  unit: string;
  subtotal?: number;
}

@Injectable()
export class ShopService {

  private cartObject: {
    totalItems: number,
    totalMoney: number,
    data: Array<CartItem>
  };

  private cartKey: string = "cartObject";

  public get cart() {
    return this.cartObject;
  }

  constructor(private http: Http) {
    this.cartObject = <any>$.jStorage.get(this.cartKey, {
      totalItems: 0,
      totalMoney: 0,
      data: []
    });
  }

  addCartItem(item: CartItem) {
    let existIndex: number = -1;
    for (let i = 0; i < this.cartObject.data.length; i++) {
      if (item.productId === this.cartObject.data[i].productId) {
        existIndex = i;
        break;
      }
    }

    if (existIndex !== -1) {
      // si existe se actualiza el objeto
      this.cartObject.data[existIndex].quantity += item.quantity;
      this.cartObject.data[existIndex].subtotal = this.cartObject.data[existIndex].quantity * this.cartObject.data[existIndex].unitPrice;
    } else {
      // si no existe se agrega el objeto
      item.subtotal = item.quantity * item.unitPrice;
      this.cartObject.data.push(item);
    }

    this.updateCartObject();
  }

  private updateCartObject() {
    this.cartObject.totalItems = 0;
    this.cartObject.totalMoney = 0;

    for (let i = 0; i < this.cartObject.data.length; i++) {
      this.cartObject.totalItems += this.cartObject.data[i].quantity;
      this.cartObject.totalMoney += this.cartObject.data[i].subtotal;
    }

    $.jStorage.set(this.cartKey, this.cartObject);
  }

  public updateItemQuantity(index: number, quantity: number) {
    this.cartObject.data[index].quantity = quantity;
    this.cartObject.data[index].subtotal = this.cartObject.data[index].quantity * this.cartObject.data[index].unitPrice;
    this.updateCartObject();
  }

  public removeItem(index: number) {
    this.cartObject.data.splice(index, 1);
    this.updateCartObject();
  }

  public clearCart() {
    this.cartObject = {
      totalMoney: 0,
      totalItems: 0,
      data: []
    };
  }

  getProducts(page: number): Observable<string[]> {
    return this.http.get("/shop/api/getproducts")
      .map(response => <string[]>response.json());
  }
}
