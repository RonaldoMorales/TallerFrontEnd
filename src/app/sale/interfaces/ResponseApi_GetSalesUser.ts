export interface ResponseAPIGetSalesUser {
  totalSales:   number;
  paginaActual: number;
  tamañoPagina: number;
  sales:        Sale[];
}

export interface Sale {
  fechaCompra: Date;
  precioTotal: number;
  saleProduct: SaleProduct[];
}

export interface SaleProduct {
  nombre:              string;
  tipo:                string;
  precio:              number;
  cantidad:            number;
  precioTotalProducto: number;
}
