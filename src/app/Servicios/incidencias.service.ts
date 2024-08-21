import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR; // Definiciòn de los servicios de base de datos

  constructor(
    private httpClient: HttpClient
  ) { }

  muestraIncidencias(filtro: any, fechainicial: string, fechafinal: string) {

    let _filtro = Object.assign({}, filtro);
    _filtro.fechainicial = fechainicial;
    _filtro.fechafinal = fechafinal;

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Incidencias/obtieneIncidencias.php`,
      _filtro,
      { headers: headers }
    );
  }

  darRespuesta(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any>(
      `${this.PHP_API_SERVER}/Incidencias/darRespuesta.php`,
      filtro,
      { headers: headers }
    );
  }

}
