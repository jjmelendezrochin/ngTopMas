import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class PromocionUltSerService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR; // Definiciòn de los servicios de base de datos

  constructor(private httpClient: HttpClient) { }

  buscarPromociones(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/CatalogoPromociones/listapromociones.php`,
      filtro,
      { headers: headers }
    );
  }

  desactiva_todos_los_genera_ppt(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/CatalogoPromociones/desactiva_todos_los_genera_ppt.php`,
      filtro,
      { headers: headers }
    );

  }

  activa_desactiva_todos_los_generar_ppt_en_bloque(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/CatalogoPromociones/activa_desactiva_todos_los_generar_ppt_en_bloque.php`,
      filtro,
      { headers: headers }
    );

  }

  desactiva_todos_los_generar_ppt_en_bloque(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/CatalogoPromociones/desactiva_todos_los_generar_ppt_en_bloque.php`,
      filtro,
      { headers: headers }
    );

  }

  activa_desactiva_generar_ppt(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/CatalogoPromociones/activa_desactiva_generar_ppt.php`,
      filtro,
      { headers: headers }
    );
  }

  generarPptYZip(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/CatalogoPromociones/genera_powerpoint.php`,
      filtro,
      { headers: headers }
    );
  }

  generarCarpetaConFotosYZip(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/CatalogoPromociones/descargarFotosPromociones.php`,
      filtro,
      { headers: headers }
    );
  }

  descargarZip(url: string) {

    const headers = new HttpHeaders();
    headers.set('Accept', 'application/zip');
    headers.set('Cache-Control', 'no-cache');

    const req = new HttpRequest('GET', url, {
      headers: headers,
      responseType: 'blob', // Indica que la respuesta es un archivo binario
      reportProgress: true // Habilita el seguimiento del progreso de la descarga
    });

    return this.httpClient.request(req);
  }

  eliminarCarpetaYZipPpt(ruta_fisica_carpeta: string, ruta_fisica_zip: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/CatalogoPromociones/eliminarCarpetaYZipPptx.php`,
      { ruta_fisica_carpeta: ruta_fisica_carpeta, ruta_fisica_zip: ruta_fisica_zip },
      { headers: headers }
    );
  }

}
