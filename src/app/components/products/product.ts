// producto.ts
export class Product {
    constructor(
      public id: number,
      public nombre: string,
      public precio: number,
      public cantidad: number = 1
    ) {}
  }
  