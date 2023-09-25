import { Injectable } from '@angular/core';
import { Errores } from 'app/Objetos/errores';
import { Observable } from 'rxjs';
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;   // Definiciòn de los servicios de base de datos

  constructor(private httpClient: HttpClient) { }

  actualizaError(error: Errores): Observable<any> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/CatalogoErrores/actualizaErrores.php`, error);
  }

  // *******************************
  // Esta consulta obtiene los datos de https://www.topmas.mx/#/catalogoproductos/
  // getErrores(idempresa: number,idcadena: number, PRODUCTO: string, CATEGORIA: string, UPC: string): Observable<CatProductos[]> {
  getErrores(FiltroErrores: any): Observable<any[]> {
    // return this.httpClient.get<CatProductos[]>(`${this.PHP_API_SERVER}/CatalogoProductos/getProductosServicio.php/?idempresa=${idempresa}&idcadena=${idcadena}&PRODUCTO=${PRODUCTO}&CATEGORIA=${CATEGORIA}&UPC=${UPC}`);    
    return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/CatalogoErrores/getErrores.php`, FiltroErrores);
  }

  getAtendido(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoErrores/getAtendido.php`);
  }

  getAtendidoPor(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoErrores/getAtendidoPor.php`);
  }

}
