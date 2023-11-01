import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from "environments/environment";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GenerarZipFotosService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";


  constructor(private httpClient: HttpClient) { }

  getComprimirFotosServicio(fotos: any): Observable<any> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/DescargaFotos/getComprimirFotosServicio.php`, fotos);
  }

  generarZipFotos(form: any, datePipe: DatePipe) {
    let obj = Object.assign({}, form);
    obj.FechaInicial = datePipe.transform(obj.FechaInicial, 'yyyy-MM-dd');
    obj.FechaFinal = datePipe.transform(obj.FechaFinal, 'yyyy-MM-dd');
    this.getComprimirFotosServicio(obj).subscribe((gDescargaFotos: any) => {
      location.href = gDescargaFotos.download_file;
      // console.log("Imagenes descargadas");
    });
  }

}
