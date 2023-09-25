import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { usuario } from './Objetos/usuario';
import { environment } from "environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos


  constructor(private httpClient: HttpClient) { }

  login(usuario: usuario): Observable<usuario> {
    return this.httpClient.post<usuario>(`${this.PHP_API_SERVER}/Usuario/obtenusuario.php`, usuario);
  }

  login1a(usuario: usuario): Observable<usuario> {
    return this.httpClient.post<usuario>(`${this.PHP_API_SERVER}/Usuario/obtenusuario1a.php`, usuario);
  }
}