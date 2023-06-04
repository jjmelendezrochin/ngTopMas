import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatProductos } from 'app/Objetos/catproductos';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatProductosService {

  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;   // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  
  // *******************************
  // Esta consulta obtiene los datos de https://www.topmas.mx/#/catalogoproductos/
  getCatProductosServicio(idempresa: number,idcadena: number, PRODUCTO: string, CATEGORIA: string, UPC: string): Observable<CatProductos[]> {
    return this.httpClient.get<CatProductos[]>(`${this.PHP_API_SERVER}/CatalogoProductos/getProductosServicio.php/?idempresa=${idempresa}&idcadena=${idcadena}&PRODUCTO=${PRODUCTO}&CATEGORIA=${CATEGORIA}&UPC=${UPC}`);    
  }

  getCatProductosPorIdServicio(idproducto: number): Observable<CatProductos[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<CatProductos[]>(`${this.PHP_API_SERVER}/CatalogoProductos/getProductosServicio.php/?idproducto=${idproducto}`);
  }

  /* Agrega un nuevo producto */
  createProductosServicio(catproductos: CatProductos): Observable<CatProductos> {
    return this.httpClient.post<CatProductos>(`${this.PHP_API_SERVER}/CatalogoProductos/createProductoServicio.php`, catproductos);
  }

  /*Actualiza un producto */
  updateProductosServicio(catproductos: CatProductos) {
    return this.httpClient.put<CatProductos>(`${this.PHP_API_SERVER}/CatalogoProductos/updateProductoServicio.php`, catproductos);
  }

  /* Sube la imagen y registra la ruta a un producto */
  uploadImagenAProductoServicio(imagen: any, ruta_imagen: string, idproducto: number) {
    let formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("ruta", ruta_imagen);
    formData.append("idproducto", idproducto.toString());
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/subir_imagen.php`, formData);
  }

  /*Elimina la imagen a un producto */
  deleteImagenAProductoServicio(ruta_imagen: string, idproducto: number) {
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/borrar_imagen.php?ruta=${ruta_imagen}&idproducto=${idproducto}`);
  }

  /* Elimina un producto */
  deleteProductosServicio(idproducto: number) {
    return this.httpClient.delete<CatProductos>(`${this.PHP_API_SERVER}/CatalogoProductos/deleteProductoServicio.php/?idproducto=${idproducto}`);
  }

}
