import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { HttpClient } from '@angular/common/http';
import { CatSupervisor } from 'app/Objetos/catsupervisor';
import { Observable } from 'rxjs';
import { PromotoresAsignadosASupervisor } from 'app/Objetos/promotores_asignados_a_supervisor';

@Injectable({
  providedIn: 'root'
})
export class CatSupervisorService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  getsupervisorservicios(idEmpresa:number): Observable<CatSupervisor[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<CatSupervisor[]>(`${this.PHP_API_SERVER}/CatalogoSupervisor/getSupervisorServicio.php?idEmpresa=${idEmpresa}`);
  }

  getsupervisorPorIdServicios(idpromotor: number): Observable<CatSupervisor[]> {
    return this.httpClient.get<CatSupervisor[]>(`${this.PHP_API_SERVER}/CatalogoSupervisor/getSupervisorPorIdServicio.php/?idpromotor=${idpromotor}`);
  }

  getsupervisorserviciosPorNombreOApellidos(campos: string, orden: number): Observable<CatSupervisor[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<CatSupervisor[]>(`${this.PHP_API_SERVER}/CatalogoSupervisor/getSupervisorServicio.php?campos=${campos}&orden=${orden}`);
  }


  getSupervisoresPromotoresServicios(orden: number = 0): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoSupervisor/getSupervisoresPromotoresServicio.php?orden=${orden}`);
  }

  getPromotoresAsignadosAlSupervisor(idsupervisor: number): Observable<PromotoresAsignadosASupervisor[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<PromotoresAsignadosASupervisor[]>(`${this.PHP_API_SERVER}/CatalogoSupervisor/getPromotoresAsginadosASupervisorServicio.php/?idsupervisor=${idsupervisor}`);
  }

  createSupervisorServicios(catsupervisor: CatSupervisor): Observable<CatSupervisor> {
    return this.httpClient.post<CatSupervisor>(`${this.PHP_API_SERVER}/CatalogoSupervisor/createSupervisorServicio.php`, catsupervisor);
  }

  createAsignacionPromotorASupervisorServicios(idsupervisor: number, idpromotor: number, uda: string): Observable<PromotoresAsignadosASupervisor> {
    return this.httpClient.get<PromotoresAsignadosASupervisor>(`${this.PHP_API_SERVER}/CatalogoSupervisor/asignaPromotorServicio.php?idsupervisor=${idsupervisor}&idpromotor=${idpromotor}&uda=${uda}`);
  }

  updateSupervisorServicios(catsupervisor: CatSupervisor) {
    return this.httpClient.put<CatSupervisor>(`${this.PHP_API_SERVER}/CatalogoSupervisor/updateSupervisorServicio.php`, catsupervisor);
  }

  updateEstatusSupervisorServicios(catsupervisor: CatSupervisor) {
    return this.httpClient.put<CatSupervisor>(`${this.PHP_API_SERVER}/CatalogoSupervisor/updateEstatusSupervisorServicio.php`, catsupervisor);
  }

  deleteSupervisorServicios(idsupervisor: number) {
    return this.httpClient.delete<CatSupervisor>(`${this.PHP_API_SERVER}/CatalogoSupervisor/deleteSupervisorServicio.php/?idpromotor=${idsupervisor}`);
  }

  deleteAsignacionPromotorASupervisorServicios(idpromotorasignado: number) {
    return this.httpClient.delete<PromotoresAsignadosASupervisor>(`${this.PHP_API_SERVER}/CatalogoSupervisor/desasignaPromotorServicio.php/?idpromotorasignado=${idpromotorasignado}`);
  }
}
