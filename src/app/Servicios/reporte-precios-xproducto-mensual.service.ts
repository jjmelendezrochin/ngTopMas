import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportePreciosXproductoMensualService {

  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  getCmbMesesservicios(): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/ReportePreciosXProductosMensualConGrafica/getCmbMesesServicio.php`);
  }

  getCmbProductosservicios(idempresa: number): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    //return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/ReportePreciosXProductosMensualConGrafica/getCmbProductosServicio.php?idEmpresa=${environment.servidor.TAG_IDEMPRESA}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/ReportePreciosXProductosMensualConGrafica/getCmbProductosServicio.php?idEmpresa=${idempresa}`);
  }

  // ***************************************************************
  // Reporte de precios por producto http://localhost:4200/#/reporteprecioxproductomensual
  // Reporte de precios por producto https://www.topmas.mx/#/reporteprecioxproductomensual
  getReportePreciosXProductoMensualservicios(filtros: any, pidEmpresa: number, E: any = 0): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    //filtros.idEmpresa = environment.servidor.TAG_IDEMPRESA;
    filtros.idEmpresa = pidEmpresa;
    if (E == 0) {
      return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/ReportePreciosXProductosMensualConGrafica/getReportePreciosXProductoMensualServicio.php`, filtros);
    } else if (E == 1) {
      return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/ReportePreciosXProductosMensualConGrafica/getReportePreciosXProductoMensualExcelServicio.php`, filtros);
    }
  }

}
