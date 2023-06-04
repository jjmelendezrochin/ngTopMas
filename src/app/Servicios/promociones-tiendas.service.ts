import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocionesTiendasService {

  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";


  constructor(private httpClient: HttpClient) { }


  // http://localhost:4200/#/promocionestiendas
  getPromocionesTiendasServicios(promociontienda: any): Observable<any[]> {
    //?FechaInicial=${promociontienda.FechaInicial}&FechaFinal=${promociontienda.FechaFinal}&Tienda=${promociontienda.Tienda}&idpromotor=${promociontienda.idpromotor}&idcadena=${promociontienda.idcadena}
    promociontienda.idEmpresa = environment.servidor.TAG_IDEMPRESA;
    return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/PromocionesTiendas/getPromocionesTiendasServicio.php`, promociontienda);
  }

  getPromotorServicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/PromocionesTiendas/getPromotorCmbServicio.php?idEmpresa=${environment.servidor.TAG_IDEMPRESA}`);
  }

  getPromocionServicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/PromocionesTiendas/getPromocionCmbServicio.php?idEmpresa=${environment.servidor.TAG_IDEMPRESA}`);
  }

  getActividadServicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/PromocionesTiendas/getActividadCmbServicio.php`);
  }

  getReporte(filtro: any): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/PromocionesTiendas/getReporteServicio.php`, filtro);
  }
}
