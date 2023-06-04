import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatUsuariosService {

  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  getUsuariosServicio(orden: number = 0, usuario: string = ""): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoUsuarios/getUsuariosServicio.php?orden=${orden}&usuario=${usuario}`);
  }

  getCmbPerfilesServicio(): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoUsuarios/getCmbPerfilesServicio.php`);
  }

  createUsuarioServicio(usuario: any): Observable<any> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/CatalogoUsuarios/createUsuarioServicio.php`, usuario);
  }

  updateUsuarioServicio(usuario: any): Observable<any> {
    return this.httpClient.put<any>(`${this.PHP_API_SERVER}/CatalogoUsuarios/updateUsuarioServicio.php`, usuario);
  }

  deleteUsuarioServicio(idUsuario: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.PHP_API_SERVER}/CatalogoUsuarios/deleteUsuarioServicio.php/?idUsuario=${idUsuario}`);
  }

}
