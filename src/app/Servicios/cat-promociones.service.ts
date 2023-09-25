import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatPromocionesService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  getpromocionesservicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoPromociones/getPromocionesServicio.php`);
  }

  getpromocionesserviciosPorNombre(idempresa: number, nombre: string, orden: number): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoPromociones/getPromocionesServicio.php?idempresa=${idempresa}&nombre=${nombre}&orden=${orden}`);
  }

  createAsignacionFormatoAPromocioServicios(idpromocion: number, idempresa: number, idcadena: number, idformato: number, uda: string): Observable<any> {
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/CatalogoPromociones/asignaFormatosServicio.php?idpromocion=${idpromocion}&idempresa=${idempresa}&idcadena=${idcadena}&idformato=${idformato}&uda=${uda}`);
  }

  createPromocionServicios(catpromocion: any): Observable<any> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/CatalogoPromociones/createPromocionServicio.php`, catpromocion);
  }

  updatePromocionServicios(catpromocion: any) {
    return this.httpClient.put<any>(`${this.PHP_API_SERVER}/CatalogoPromociones/updatePromocionServicio.php`, catpromocion);
  }

  deletePromocionServicios(idpromocion: number) {
    return this.httpClient.delete<any>(`${this.PHP_API_SERVER}/CatalogoPromociones/deletePromocionServicio.php/?idpromocion=${idpromocion}`);
  }

  deleteAsignacionFormatoAPromocionServicios(idpromocionformato: number) {
    return this.httpClient.delete<any>(`${this.PHP_API_SERVER}/CatalogoPromociones/desasignaFormatosServicio.php/?idpromocionformato=${idpromocionformato}`);
  }

  getFormatosDisponiblesParaAsignarAPromocionServicios(promocion: string, idpromocion: number) {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoPromociones/getFormatosDisponiblesParaAsignarAPromocionServicio.php/?idpromocion=${idpromocion}&promocion=${promocion}`);
  }

  getFormatosPorPromocionServicios(idpromocion: number) {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoPromociones/getFormatosAsignadosAPromocionesServicio.php/?idpromocion=${idpromocion}`);
  }

  /* Sube la imagen y registra la ruta a una promocion */
  uploadImagenAPromocionServicio(imagen: any, ruta_imagen: string, idpromocion: number) {
    let formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("ruta", ruta_imagen);
    formData.append("idpromocion", idpromocion.toString());
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/subir_imagen1.php`, formData);
  }

  /*Elimina la imagen a una promocion */
  deleteImagenAPromocionServicio(ruta_imagen: string, idpromocion: number) {
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/borrar_imagen1.php?ruta=${ruta_imagen}&idpromocion=${idpromocion}`);
  }

}
