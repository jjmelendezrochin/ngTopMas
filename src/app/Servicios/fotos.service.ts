import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Fotos } from '../Objetos/fotos';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FotosService {

  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos
  idempresa: number = Number(localStorage.getItem('idempresa'));

  //PHP_API_SERVER = "http://localhost";


  constructor(private httpClient: HttpClient) { }

  getfotosservicios(/*idEmpresa:number*/): Observable<Fotos[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<Fotos[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getFotosServicio.php?idEmpresa=${this.idempresa}`);
  }
  getfotosserviciosMaxIdPromotor(/*idEmpresa:number*/): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getFotosServicioMaxIdPromotor.php?idEmpresa=${this.idempresa}`);
  }

  getrutasservicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getRutasServicio.php?idEmpresa=${this.idempresa}`);
  }

  getFotosEstanciaServicios(fotoestancia: any): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    fotoestancia.idEmpresa = this.idempresa;
    return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getFotosEstanciaServicio.php`, fotoestancia);
  }

  // *****************************************************
  // Enlista la distancia de acuerdo a fechas, promotor, tienda, actividad y cadena en http://www.topmas.mx/#/distancia
  getFotosDistanciaServicios(fotoestancia: any): Observable<any[]> {
    console.log('valor de variables ' + fotoestancia);
    fotoestancia.idEmpresa = this.idempresa;
    console.log('valor de idEmpresa ' + fotoestancia.idEmpresa);
    return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getFotosDistanciaServicio_Ajustes.php`, fotoestancia);
  }

  obtenerdatospanel(idEmpresa: number): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    //return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getCountUsuariosFotosServicio1.php?idEmpresa=${this.idempresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/obtenerdatospanel.php?idEmpresa=${idEmpresa}`);
  }

  getcountUsuariosEnActividadFotosServicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getCountUsuariosEnActividadFotosServicio.php?idEmpresa=${this.idempresa}`);
  }

  getcountUsuariosPuntosVisitadosFotosServicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getCountUsuariosPuntosVisitadosFotosServicio.php?idEmpresa=${this.idempresa}`);
  }

  getcountUsuariosSinActividadServicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getCountUsuariosSinActividadServicio.php?idEmpresa=${this.idempresa}`);
  }

  // *****************************************************
  // Enlista las fotos de acuerdo a fechas, promotor y cadena en http://www.topmas.mx/#/fotos
  getCatFotosServicios(catfotos: any): Observable<any[]> {
    catfotos.idEmpresa = this.idempresa;
    catfotos.Tienda = 0;
    console.log(catfotos);
    return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getCatFotosServicio_Ajustes.php`, catfotos);
  }

  getPromotorServicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getPromotorCmbServicio.php?idEmpresa=${this.idempresa}`);
  }

  getActividadServicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getActividadCmbServicio.php?idEmpresa=${this.idempresa}`);
  }

  getActividad1Servicios(/*idEmpresa:number*/): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getActividad1CmbServicio.php?idEmpresa=${this.idempresa}`);
  }

  getTiendasUbicacionYEstatus(/*idEmpresa:number*/): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getTiendasUbicacionYEstatusServicio.php?idEmpresa=${this.idempresa}`);
  }

  getSupervisoresPromotoresConCheckInOutServicios(operacion: number = 0): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getSupervisoresPromotoresConCheckInOutServicios.php?operacion=${operacion}&idEmpresa=${this.idempresa}`);
  }

  getRankingCapturasUsuarios() {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getRankingCapturasUsuarios.php?idEmpresa=${this.idempresa}`);
  }

  getRankingPromotorActividadHora() {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getRankingPromotorActividadHora.php?idEmpresa=${this.idempresa}`);
  }

  getReporte(filtro: any): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    filtro.idEmpresa = this.idempresa;
    return this.httpClient.post<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getReporteServicio.php`, filtro);
  }
  getvw_consuta_distanciachekin() {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getvw_consuta_distanciachekin.php?idEmpresa=${this.idempresa}`);
  }
  getvw_usuariossinactividad_hoy() {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getvw_usuariossinactividad_hoy.php?idEmpresa=${this.idempresa}`);
  }
  // Checkin sin Checkout
  getvw_checkinsincheckout(idempresa) {
    console.log("idEmpresa " + idempresa);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoFotos/getCheckinsinCheckout.php?idEmpresa=${idempresa}`);
  }

  createObservacionesServicio(observacion): Observable<any> {
    observacion.idEmpresa = this.idempresa;
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}//CatalogoFotos/createObservacionesServicio.php`, observacion);
  }

}
