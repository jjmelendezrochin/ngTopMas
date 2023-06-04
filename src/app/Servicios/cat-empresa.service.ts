import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CatEmpresa } from '../Objetos/catempresa';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatEmpresaService {

  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;   // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  getCatEmpresa(idEmpresa:number): Observable<CatEmpresa[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<CatEmpresa[]>(`${this.PHP_API_SERVER}/CatalogoEmpresa/getCatEmpresaServicio.php?idEmpresa=${idEmpresa}`);
  }

  getAllCatEmpresa(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoEmpresa/getAllCatEmpresaServicio.php`);
  }

}
