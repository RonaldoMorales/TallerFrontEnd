export interface ResponseAPIGetAll {
  total:        number;
  paginaActual: number;
  tamañoPagina: number;
  productos:    Producto[];
}

export interface Producto {
  id?:         number | null;
  nombre:     string;
  tipo:       string;
  precio:     number;
  stock:      number;
  linkImagen: string;
}
