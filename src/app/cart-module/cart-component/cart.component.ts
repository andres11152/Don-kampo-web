import { Component, OnInit } from '@angular/core';

interface CartItem {
  productName: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor() {}

  ngOnInit(): void {
    // Simulación de productos añadidos al carrito
    this.cartItems = [
      { productName: 'Producto 1', quantity: 2, price: 10.99 },
      { productName: 'Producto 2', quantity: 1, price: 19.99 },
      { productName: 'Producto 3', quantity: 3, price: 5.99 }
    ];
  }

  // Método para eliminar un producto del carrito
  removeItem(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  // Método para calcular el total del carrito
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Método para proceder al pago (simulado)
  checkout(): void {
    alert('Procediendo al pago. Total: ' + this.getTotal());
  }
}
