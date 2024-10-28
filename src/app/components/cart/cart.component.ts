import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product'; // Asegúrate de importar el modelo Producto
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule]
})
export class CartComponent implements OnInit {

  cartItems: Product[] = [];

  constructor() {}

  ngOnInit(): void {
    // Simulación de productos añadidos al carrito
    this.cartItems = [
      new Product(1, 'Producto 1', 4.500, 2),
      new Product(2, 'Producto 2', 6.900, 1),
      new Product(3, 'Producto 3', 8.500, 3)
    ];
  }

  // Método para agregar un producto al carrito o incrementar su cantidad
  addItem(producto: Product): void {
    const existingItem = this.cartItems.find(item => item.id === producto.id);
    if (existingItem) {
      existingItem.cantidad += 1;  // Si el producto ya está, incrementa la cantidad
    } else {
      this.cartItems.push({ ...producto, cantidad: 1 });  // Si no está, lo añade al carrito
    }
  }

  // Método para eliminar un producto o reducir su cantidad
  removeItem(producto: Product): void {
    const index = this.cartItems.findIndex(item => item.id === producto.id);
    if (index !== -1) {
      if (this.cartItems[index].cantidad > 1) {
        this.cartItems[index].cantidad -= 1;  // Reduce la cantidad si es mayor que 1
      } else {
        this.cartItems.splice(index, 1);  // Elimina el producto si la cantidad es 1
      }
    }
  }

  // Método para calcular el total del carrito
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  // Método para proceder al pago (simulado)
  checkout(): void {
    alert('Procediendo al pago. Total: ' + this.getTotal());
  }
}
