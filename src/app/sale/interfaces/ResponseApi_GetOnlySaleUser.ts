export interface ResponseAPIGetOnlySaleUser {
  id:          number;
  precioTotal: number;
  saleProduct: SaleProduct[];
}

export interface SaleProduct {
  nombre:              string;
  tipo:                string;
  precio:              number;
  stock:               number;
  linkImagen:          string;
  cantidad:            number;
  precioTotalProducto: number;
}

