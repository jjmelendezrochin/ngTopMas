import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CatFormatos } from '../Objetos/catformatos';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatFormatoService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;   // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  /* Ejecuta la consulta que obtiene todos los formatos de la ruta: https://www.topmas.mx/#/catalogoformatos */
  getformatosservicios(idempresa : number, orden: number = 0): Observable<CatFormatos[]> {
    return this.httpClient.get<CatFormatos[]>(`${this.PHP_API_SERVER}/CatalogoFormatos/getFormatoServicio.php?idempresa=${idempresa}&orden=${orden}`);
  }

  /* Ejecuta la consulta que obtiene solamente busca los formatos solicitado por el filtro de formato */
  getformatosserviciosPorFormato(cadena: string, orden: number = 0): Observable<CatFormatos[]> {
    return this.httpClient.get<CatFormatos[]>(`${this.PHP_API_SERVER}/CatalogoFormatos/getFormatoServicio.php?cadena=${cadena}&orden=${orden}`);
  }

  /* Ejecuta la consulta que obtiene solamente busca los formatos solicitado por el filtro de cadena */
  getformatosserviciosPorCadena(idcadena: number): Observable<CatFormatos[]> {
    return this.httpClient.get<CatFormatos[]>(`${this.PHP_API_SERVER}/CatalogoFormatos/getFormatoServicioPorCadena.php?idcadena=${idcadena}`);
  }

  /* Inserta un nuevo formato */
  createFormatoServicios(catformato: CatFormatos): Observable<CatFormatos> {
    return this.httpClient.post<CatFormatos>(`${this.PHP_API_SERVER}/CatalogoFormatos/createFormatoServicio.php`, catformato);
  }

  /* Actualiza un formato */
  updateFormatoServicios(catformato: CatFormatos) {
    return this.httpClient.put<CatFormatos>(`${this.PHP_API_SERVER}/CatalogoFormatos/updateFormatoServicio.php`, catformato);
  }

  /* Actualiza el estatus de un formato */
  updateEstatusFormatoServicios(catformato: CatFormatos) {
    return this.httpClient.put<CatFormatos>(`${this.PHP_API_SERVER}/CatalogoFormatos/updateEstatusFormatoServicio.php`, catformato);
  }

  /* Da de baja un formato */
  deleteFormatoServicios(idformato: number) {
    return this.httpClient.delete<CatFormatos>(`${this.PHP_API_SERVER}/CatalogoFormatos/deleteFormatoServicio.php/?idformato=${idformato}`);
  }

}
