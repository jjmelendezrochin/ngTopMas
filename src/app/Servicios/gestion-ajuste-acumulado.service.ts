import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionAjusteAcumuladoService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR; // Definiciòn de los servicios de base de datos

  constructor(
    private httpClient: HttpClient
  ) { }

  rango_fechas_semanal(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any>(
      `${this.PHP_API_SERVER}/rango_fechas_semanal.php`,
      filtro,
      { headers: headers }
    );
  }

  GuardarAjusteAcumulado(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any>(
      `${this.PHP_API_SERVER}/gestion_ajuste_acumulado.php`,
      filtro,
      { headers: headers }
    );

  }

  consultarReporteAcumuladoSemanalOMensual(filtro) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any>(
      `${this.PHP_API_SERVER}/consulta_reporte_acumulado_semanal_o_mensual.php`,
      filtro,
      { headers: headers }
    );

  }

  GenerarReporteAcumuladoSemanalOMensualExcel(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any>(
      `${this.PHP_API_SERVER}/generar_reporte_acumulado_semanal_o_mensual.php`,
      filtro,
      { headers: headers }
    );

  }

  ObtenerInformacionAjustesAcumulados(filtro) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any>(
      `${this.PHP_API_SERVER}/obtener_informacion_ajustes_acumulados.php`,
      filtro,
      { headers: headers }
    );

  }

}
