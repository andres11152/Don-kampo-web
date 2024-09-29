import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart-component/cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule], // Importa CommonModule para usar el pipe currency
})
export class CartModule { }
