import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerarPdf2Service {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";


  constructor(private httpClient: HttpClient) { }

  getGenerarPdfFotosServicio(fotos: any): Observable<any> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/DescargaFotos2/getGenerarPdfFotosServicio.php`, fotos);
  }

  generarPDF(form: any, datePipe: DatePipe) {
    let obj = Object.assign({}, form);
    obj.FechaInicial = datePipe.transform(obj.FechaInicial, 'yyyy-MM-dd');
    obj.FechaFinal = datePipe.transform(obj.FechaFinal, 'yyyy-MM-dd');
    this.getGenerarPdfFotosServicio(obj).subscribe((gDescargaFotos: any) => {
      location.href = gDescargaFotos.download_file;
      // console.log("Pdfs descargados");
      console.log(gDescargaFotos);
    });
  }
}
