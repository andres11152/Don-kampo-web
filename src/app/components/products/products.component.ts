import { Component, OnInit } from '@angular/core';
import { Product } from './product';  // Asegúrate de importar el modelo Producto
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [CommonModule]
})
export class ProductsComponent implements OnInit {

  productos: Product[] = [];
  carrito: Product[] = [];

  constructor() {}

  ngOnInit(): void {
    // Inicialización de la lista de productos
    this.productos = [
      new Product(1, 'Producto 1', 4.500),
      new Product(2, 'Producto 2', 6.900),
      new Product(3, 'Producto 3', 7.500)
    ];
  }

  // Método para agregar un producto al carrito
  agregarAlCarrito(producto: Product): void {
    const itemExistente = this.carrito.find(p => p.id === producto.id);
    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
  }

  // Método para quitar un producto del carrito
  quitarDelCarrito(producto: Product): void {
    const index = this.carrito.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      if (this.carrito[index].cantidad > 1) {
        this.carrito[index].cantidad -= 1;
      } else {
        this.carrito.splice(index, 1);
      }
    }
  }

  // Método para obtener el total del carrito
  obtenerTotal(): number {
    return this.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }
}
