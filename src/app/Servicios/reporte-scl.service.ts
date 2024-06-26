import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteSclService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR; // Definiciòn de los servicios de base de datos

  constructor(private httpClient: HttpClient) { }

  reporteDesplazamientoMuestraEnPantalla(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/reporte_desplazamiento_muestra_en_pantalla.php`,
      filtro,
      { headers: headers }
    );
  }

  reporteDesplazamientoExcel(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/reporte_desplazamiento_excel.php`,
      filtro,
      { headers: headers }
    );
  }

  reporteAsistenciaEncabezadosMuestraEnPantalla() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.get<any>(
      `${this.PHP_API_SERVER}/Reportes_Scl/reporte_asistencia_encabezados_muestra_en_pantalla.php`);
  }

  reporteAsistenciaMuestraEnPantalla(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/reporte_asistencia_muestra_en_pantalla.php`,
      filtro,
      { headers: headers }
    );
  }

  reporteAsistenciaPdfExcel(filtro: any, tipo: number) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    let ruta_api = (tipo == 1) ? '/Reportes_Scl/reporte_asistencia_pdf.php' : '/Reportes_Scl/reporte_asistencia_excel.php';

    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}${ruta_api}`,
      filtro,
      { headers: headers }
    );
  }

  infoSlideMuestraEnPantalla(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/info_slide_muestra_en_pantalla.php`,
      filtro,
      { headers: headers }
    );
  }

  desactiva_todos_los_genera_slide(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/desactiva_todos_los_genera_slide.php`,
      filtro,
      { headers: headers }
    );

  }

  desactiva_todos_los_generar_slides_en_bloque(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/desactiva_todos_los_generar_slides_en_bloque.php`,
      filtro,
      { headers: headers }
    );

  }

  activa_desactiva_generar_slides_en_bloque(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/activa_desactiva_generar_slides_en_bloque.php`,
      filtro,
      { headers: headers }
    );

  }

  activa_desactiva_generar_slide(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/activa_desactiva_generar_slide.php`,
      filtro,
      { headers: headers }
    );
  }

  generarSlide(filtro: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/generar_slide.php`,
      filtro,
      { headers: headers }
    );
  }

  descargarZipSlide(url: string) {

    const headers = new HttpHeaders();
    headers.set('Accept', 'application/zip');
    headers.set('Cache-Control', 'no-cache');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Cache-Control, Accept');


    const req = new HttpRequest('GET', url, {
      headers: headers,
      responseType: 'blob', // Indica que la respuesta es un archivo binario
      reportProgress: true // Habilita el seguimiento del progreso de la descarga
    });

    return this.httpClient.request(req);
  }

  eliminarCarpetaYZipPptSlide(ruta_fisica_carpeta: string, ruta_fisica_zip: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<any[]>(
      `${this.PHP_API_SERVER}/Reportes_Scl/eliminarCarpetaYZipPptxSlide.php`,
      { ruta_fisica_carpeta: ruta_fisica_carpeta, ruta_fisica_zip: ruta_fisica_zip },
      { headers: headers }
    );
  }

}
