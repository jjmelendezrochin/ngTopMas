import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatUsohorarioService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  getUsoHorarioservicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoUsoHorario/getUsoHorarioServicio.php`);
  }

}
