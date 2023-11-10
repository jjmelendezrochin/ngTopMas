import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerarZipFotos1Service {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";


  constructor(private httpClient: HttpClient) { }

  getComprimirFotosServicio(fotos: any): Observable<any> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/DescargaFotos1/getComprimirFotosServicio.php`, fotos);
  }

  generarZipFotos(form: any, idempresa: any, datePipe: DatePipe) {
    let obj = Object.assign({}, form);
    obj.FechaInicial = datePipe.transform(obj.FechaInicial, 'yyyy-MM-dd');
    obj.FechaFinal = datePipe.transform(obj.FechaFinal, 'yyyy-MM-dd');
    obj.idEmpresa = idempresa;
    this.getComprimirFotosServicio(obj).subscribe((gDescargaFotos: any) => {
      location.href = gDescargaFotos.download_file;
      // console.log("Imagenes descargadas");
    });
  }

}
