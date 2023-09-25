import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatPromotor } from 'app/Objetos/catpromotor';
import { environment } from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GraficasService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  idempresa: number = Number(localStorage.getItem('idempresa'));

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  // https://www.topmas.mx/#/graficas
  getCmbPromotorservicios(): Observable<CatPromotor[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<CatPromotor[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getPromotorCmbServicio.php?idEmpresa=${this.idempresa}`);
  }

  // ***************************************************
  // https://www.topmas.mx/#/graficas
  getGeneraDatosGraficaAsistensiasYEfectividadServicio(filtros: any, idempresa: number): Observable<any[]> {
    filtros.idEmpresa = idempresa;
    return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/Graficos/getGeneraDatosGraficasAsistenciasYEfectividadServicio.php`, filtros);
  }

  // ***************************************************
  // https://www.topmas.mx/#/graficas
  getGeneraDatosGraficaAsistensiasYEfectividadServicio1(filtros: any, idempresa: number): Observable<any[]> {
    filtros.idEmpresa = idempresa;
    return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/Graficos/getGeneraDatosGraficasAsistenciasYEfectividadServicio1.php`, filtros);
  }

  // ***************************************************
  // https://www.topmas.mx/#/graficas
  getDatosGraficaResumenVisitadasServicioServicio(idempresa: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/Graficos/getDatosGraficaResumenVisitadasServicio.php?idEmpresa=${idempresa}`);
  }

  // https://www.topmas.mx/#/graficas
  getDatosGraficaEfectividadResumenVisitadasServicio(idempresa: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/Graficos/getDatosGraficaEfectividadResumenVisitadasServicio.php?idEmpresa=${idempresa}`);
  }

  // **************************************
  // Lista de asistencia de promotores https://www.topmas.mx/#/graficas
  getDatosAsistenciasServicio(filtros: any, idempresa: number): Observable<any[]> {
    filtros.idEmpresa = idempresa;
    return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/Graficos/getDatosAsistenciasServicio.php`, filtros);
  }

  // Lista de asistencia de promotores https://www.topmas.mx/#/graficas
  getExportarGraficaAExcel(idempresa: number) {
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/Exporta/asistencia1.php?idEmpresa=${idempresa}`);
  }

}
