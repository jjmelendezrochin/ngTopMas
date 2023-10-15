import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteSclService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR; // Definiciòn de los servicios de base de datos

  constructor(private httpClient: HttpClient) { }

  reporteDesplazamientoMuestraEnPantalla(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/reporte_desplazamiento_muestra_en_pantalla.php`,
      filtro,
      { headers: headers }
    );
  }

  reporteDesplazamientoExcel(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/reporte_desplazamiento_excel.php`,
      filtro,
      { headers: headers }
    );
  }

}
