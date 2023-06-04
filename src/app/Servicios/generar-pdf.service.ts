import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GenerarPdfService {

  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";


  constructor(private httpClient: HttpClient) { }

  getGenerarPdfFotosServicio(fotos: any): Observable<any> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/DescargaFotos/getGenerarPdfFotosServicio.php`, fotos);
  }

  generarPDF(form: any) {
    this.getGenerarPdfFotosServicio(form).subscribe((gDescargaFotos: any) => {
      location.href = gDescargaFotos.download_file;
      // console.log("Pdfs descargados");      
    });
  }

}
