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

  GuardarAjusteAcumulado(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any>(
      `${this.PHP_API_SERVER}/gestion_ajuste_Acumulado.php`,
      filtro,
      { headers: headers }
    );

  }

}
