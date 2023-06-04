import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatEmpresasService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;   // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  getEmpresasservicios(orden: number = 0): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoEmpresa/getCatEmpresasServicio.php?orden=${orden}`);
  }
  getEmpresasserviciosPorNombre(empresa: string, orden: number): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoEmpresa/getCatEmpresasServicio.php?empresa=${empresa}&orden=${orden}`);
  }

  getConfigServicios() {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/config.php?con=true`);
  }

  createEmpresaServicios(catempresas: any): Observable<any> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/CatalogoEmpresa/createEmpresaServicio.php`, catempresas);
  }

  updateEmpresaServicios(catempresas: any) {
    return this.httpClient.put<any>(`${this.PHP_API_SERVER}/CatalogoEmpresa/updateEmpresaServicio.php`, catempresas);
  }

  updateConfigServicios(idconfig: number, valor: string) {
    let json = { idconfig: idconfig, valor: valor };
    return this.httpClient.put<any>(`${this.PHP_API_SERVER}/CatalogoEmpresa/updateConfigServicio.php`, json);
  }

  deleteEmpresaServicios(idempresa: number) {
    return this.httpClient.delete<any>(`${this.PHP_API_SERVER}/CatalogoEmpresa/deleteEmpresaServicio.php/?idempresa=${idempresa}`);
  }

}
