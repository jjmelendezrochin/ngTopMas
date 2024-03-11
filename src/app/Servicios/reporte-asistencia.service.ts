import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteAsistenciaService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR; // Definiciòn de los servicios de base de datos

  constructor(private httpClient: HttpClient) { }

  getCmbPromotor(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reporte_Asistencia/getCmbPromotor.php`, filtro,
      { headers: headers }
    );
  }

  reporteAsistenciaEncabezadosMuestraEnPantalla() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.get<any>(
      `${this.PHP_API_SERVER}/Reporte_Asistencia/reporte_asistencia_encabezados_muestra_en_pantalla.php`);
  }

  reporteAsistenciaMuestraEnPantalla(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reporte_Asistencia/reporte_asistencia_muestra_en_pantalla.php`,
      filtro,
      { headers: headers }
    );
  }

  reporteAsistenciaExcel(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    let ruta_api = '/Reporte_Asistencia/reporte_asistencia_excel.php';

    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}${ruta_api}`,
      filtro,
      { headers: headers }
    );
  }

}
