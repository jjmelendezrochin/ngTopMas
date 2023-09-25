import { Injectable } from '@angular/core';
import { CatZonas } from 'app/Objetos/catzonas';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CatZonasService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  getZonasservicios(orden: number = 0): Observable<CatZonas[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<CatZonas[]>(`${this.PHP_API_SERVER}/CatalogoZonas/getZonasServicio.php?orden=${orden}`);
  }
  getzonasserviciosPorLZDesc(cadena: string, orden: number): Observable<CatZonas[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<CatZonas[]>(`${this.PHP_API_SERVER}/CatalogoZonas/getZonasServicio.php?cadena=${cadena}&orden=${orden}`);
  }

  createZonaServicios(catzonas: CatZonas): Observable<CatZonas> {
    return this.httpClient.post<CatZonas>(`${this.PHP_API_SERVER}/CatalogoZonas/createZonaServicio.php`, catzonas);
  }

  updateZonaServicios(catzonas: CatZonas) {
    return this.httpClient.put<CatZonas>(`${this.PHP_API_SERVER}/CatalogoZonas/updateZonaServicio.php`, catzonas);
  }

  deleteZonaServicios(idzona: number) {
    return this.httpClient.delete<CatZonas>(`${this.PHP_API_SERVER}/CatalogoZonas/deleteZonaServicio.php/?idzona=${idzona}`);
  }

}
