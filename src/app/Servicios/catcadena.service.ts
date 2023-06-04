import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catcadena } from '../Objetos/catcadena';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatcadenaService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  getcadenaservicios(idEmpresa:number): Observable<catcadena[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    //return this.httpClient.get<catcadena[]>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${environment.servidor.TAG_IDEMPRESA}`);
    return this.httpClient.get<catcadena[]>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
  }
  getcadenaserviciosPorCadena(cadena: string, orden: number): Observable<catcadena[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<catcadena[]>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?cadena=${cadena}&orden=${orden}?idEmpresa=${environment.servidor.TAG_IDEMPRESA}`);
  }

  createCadenaServicios(catcadena: catcadena): Observable<catcadena> {
    return this.httpClient.post<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/createCadenaServicio.php`, catcadena);
  }

  updateCadenaServicios(catcadena: catcadena) {
    return this.httpClient.put<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/updateCadenaServicio.php`, catcadena);
  }

  updateEstatusCadenaServicios(catcadena: catcadena) {
    return this.httpClient.put<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/updateEstatusCadenaServicio.php`, catcadena);
  }

  deleteCadenaServicios(idcadena: number) {
    return this.httpClient.delete<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/deleteCadenaServicio.php/?idcadena=${idcadena}`);
  }

  getTiendasPorCadena(idcadena: number) {
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/CatalogoCadena/getTiendasPorCadenaServicio.php/?idcadena=${idcadena}`);
  }

}
