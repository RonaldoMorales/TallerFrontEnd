export interface ResponseAPIAddProductToSale {
  id:           number;
  usuarioId:    string;
  finalizado:   boolean;
  pais:         string;
  cuidad:       string;
  comuna:       string;
  calle:        string;
  fechaCompra:  Date;
  precioTotal:  number;
  saleProducts: SaleProduct[];
}

export interface SaleProduct {
  saleId:    number;
  productId: number;
  product:   Product;
  cantidad:  number;
}

export interface Product {
  id:         number;
  nombre:     string;
  tipo:       string;
  precio:     number;
  stock:      number;
  linkImagen: string;
}
