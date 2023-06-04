import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CatPromotor } from '../Objetos/catpromotor';
import { RutasAsignadasAPromotor } from '../Objetos/rutas_asignadas_a_promotor';
import { RutasPromotorDias } from 'app/Objetos/rutas_promotor_dias';
import { environment } from 'environments/environment';
import { PromotoresAsignadosASupervisor } from 'app/Objetos/promotores_asignados_a_supervisor';


@Injectable({
  providedIn: 'root'
})
export class CatPromotorService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  getpromotorservicios(idempresa:number): Observable<CatPromotor[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<CatPromotor[]>(`${this.PHP_API_SERVER}/CatalogoPromotor/getPromotorServicio.php?idEmpresa=${idempresa}`);
  }

  getpromotorPorIdServicios(idpromotor: number): Observable<CatPromotor[]> {
    return this.httpClient.get<CatPromotor[]>(`${this.PHP_API_SERVER}/CatalogoPromotor/getPromotorPorIdServicio.php?idpromotor=${idpromotor}`);
  }

  getpromotorserviciosPorNombreOApellidos(campos: string, dia: number, orden: number, idempresa: number): Observable<CatPromotor[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<CatPromotor[]>(`${this.PHP_API_SERVER}/CatalogoPromotor/getPromotorServicio.php?campos=${campos}&dia=${dia}&orden=${orden}&idEmpresa=${idempresa}`);
  }

  getPromotoresYaAsignadosAEsteSupervisorServicio(cadena: string, idsupervisor: number): Observable<PromotoresAsignadosASupervisor[]> {
    return this.httpClient.get<PromotoresAsignadosASupervisor[]>(`${this.PHP_API_SERVER}/CatalogoPromotor/getPromotoresJoinSupervisoresServicio.php?cadena=${cadena}&idsupervisor=${idsupervisor}`);
  }

  getRutasAsignadasAlPromotor(idpromotor: number): Observable<RutasAsignadasAPromotor[]> {
    return this.httpClient.get<RutasAsignadasAPromotor[]>(`${this.PHP_API_SERVER}/CatalogoPromotor/getRutasAsginadasAPromotorServicio.php?idpromotor=${idpromotor}`);
  }

  // ************************************************
  // https://www.topmas.mx/#/catalogopromotor rutas temporales
  getRutasTemporalesAsignadasAlPromotor(idpromotor: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoPromotor/getRutasTemporalesAsginadasAPromotorServicio.php?idpromotor=${idpromotor}`);
  }

  getDiasAsignadosRutaPromotor(idpromotor: number, idruta: number): Observable<RutasPromotorDias[]> {
    return this.httpClient.get<RutasPromotorDias[]>(`${this.PHP_API_SERVER}/CatalogoPromotor/getDiasAsignadosRutaPromotor.php?idpromotor=${idpromotor}&idruta=${idruta}`);
  }

  getRutaPromotorDiaYaEstablecido(idpromotor: number, dia: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoPromotor/getRutaPromotorDiasEstablecidosServicio.php?idpromotor=${idpromotor}&dia=${dia}`);
  }

  createPromotorServicios(catpromotor: CatPromotor): Observable<CatPromotor> {
    return this.httpClient.post<CatPromotor>(`${this.PHP_API_SERVER}/CatalogoPromotor/createPromotorServicio.php`, catpromotor);
  }

  createAsignacionRutaAPromotorServicios(idpromotor: number, idruta: number, uda: string): Observable<RutasAsignadasAPromotor> {
    return this.httpClient.get<RutasAsignadasAPromotor>(`${this.PHP_API_SERVER}/CatalogoPromotor/asignaRutasServicio.php?idpromotor=${idpromotor}&idruta=${idruta}&uda=${uda}`);
  }

  // ************************************************
  // https://www.topmas.mx/#/catalogopromotor asigna ruta temporal                 
  createAsignacionTemporalRutaAPromotorServicios(idpromotor: number, idruta: number, observaciones: string, dia: string, uda: string, asiste: number): Observable<any> {
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/CatalogoPromotor/asignaRutasTemporalServicio.php?idpromotor=${idpromotor}&idruta=${idruta}&observaciones=${observaciones}&dia=${dia}&uda=${uda}&asiste=${asiste}`);
  }

  createAsignacionDiasRutaAPromotorServicios(rutasPromotorDias: RutasPromotorDias): Observable<RutasPromotorDias> {
    return this.httpClient.post<RutasPromotorDias>(`${this.PHP_API_SERVER}/CatalogoPromotor/asignaDiasRutasPromotorServicio.php`, rutasPromotorDias);
  }

  updatePromotorServicios(catpromotor: CatPromotor) {
    return this.httpClient.put<CatPromotor>(`${this.PHP_API_SERVER}/CatalogoPromotor/updatePromotorServicio.php`, catpromotor);
  }

  updateEstatusPromotorServicios(catpromotor: CatPromotor) {
    return this.httpClient.put<CatPromotor>(`${this.PHP_API_SERVER}/CatalogoPromotor/updateEstatusPromotorServicio.php`, catpromotor);
  }

  updateAsignacionDiasRutaAPromotorServicios(rutasPromotorDias: RutasPromotorDias): Observable<RutasPromotorDias> {
    return this.httpClient.put<RutasPromotorDias>(`${this.PHP_API_SERVER}/CatalogoPromotor/asignaDiasRutasPromotorServicio1.php`, rutasPromotorDias);
  }

  deletePromotorServicios(idpromotor: number) {
    return this.httpClient.delete<CatPromotor>(`${this.PHP_API_SERVER}/CatalogoPromotor/deletePromotorServicio.php?idpromotor=${idpromotor}`);
  }

  deleteAsignacionRutaAPromotorServicios(idrutaasignada: number) {
    return this.httpClient.delete<RutasAsignadasAPromotor>(`${this.PHP_API_SERVER}/CatalogoPromotor/desasignaRutasServicio.php?idrutaasignada=${idrutaasignada}`);
  }

  deleteAsignacionRutaTemporalAPromotorServicios(idrutaasignada: number) {
    return this.httpClient.delete<any>(`${this.PHP_API_SERVER}/CatalogoPromotor/desasignaRutasTemporalServicio.php?idrutaasignada=${idrutaasignada}`);
  }
}
