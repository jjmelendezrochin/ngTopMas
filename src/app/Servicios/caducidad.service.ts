import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaducidadService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";
  idempresa: number = Number(localStorage.getItem('idempresa'));


  constructor(private httpClient: HttpClient) { }

  // *****************************************************
  // Enlista las fotos de acuerdo a fechas, promotor y cadena en https://www.topmas.mx/#/caducidad
  getCatFotosServicios(catfotos: any): Observable<any[]> {
    catfotos.idEmpresa = this.idempresa;
    return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/CatalogoCaducidad/getCatFotosServicio_Ajustes.php`, catfotos);
  }

  getPromotorServicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoCaducidad/getPromotorCmbServicio.php?idEmpresa=${this.idempresa}`);
  }

  getActividadServicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoCaducidad/getActividadCmbServicio.php`);
  }
}
