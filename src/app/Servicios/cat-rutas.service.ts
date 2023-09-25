import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CatRutas } from '../Objetos/catrutas';
import { catcadenaJoinCatRutas } from '../Objetos/catcadenajoincatrutas';
import { environment } from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CatRutasService {
  idempresa : number = Number(localStorage.getItem('idempresa'));
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;   // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) { }

  getrutasservicios(/*idEmpresa:number*/): Observable<CatRutas[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<CatRutas[]>(`${this.PHP_API_SERVER}/CatalogoRutas/getcmbrutas.php?idEmpresa=${this.idempresa}`);
  }

  getrutasPorIdServicios(idruta: number): Observable<CatRutas[]> {
    return this.httpClient.get<CatRutas[]>(`${this.PHP_API_SERVER}/CatalogoRutas/getRutasPorIdServicio.php?idruta=${idruta}`);
  }

  getrutasserviciosPorTiendaODireccion(Tienda_dir: string, orden: number): Observable<CatRutas[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<CatRutas[]>(`${this.PHP_API_SERVER}/CatalogoRutas/getRutasServicio.php?Tienda_dir=${Tienda_dir}&orden=${orden}`);
  }

  // **************************************************
  // Obtiene la lista de tiendas disponibles para asingación
  getrutasserviciosPorCadena(cadena: string, idpromotor: number): Observable<catcadenaJoinCatRutas[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<catcadenaJoinCatRutas[]>(`${this.PHP_API_SERVER}/CatalogoRutas/getCadenaJoinRutasServicio.php/?cadena=${cadena}&idpromotor=${idpromotor}`);
  }

  // **************************************************
  // Obtiene la lista de productos asignados a una tienda en una ruta (siempre es igual al numero de productos disponibles)
  getProductosAsignadosATienda(idruta: number): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoRutas/getProductosAsginadosATiendaServicio.php?idruta=${idruta}&idEmpresa=${this.idempresa}`);
  }

  // **************************************************
  // Obtiene la lista de productos asignados a una tienda y sus precios por fecha
  // http://localhost:4200/#/catalogorutas/Ver Precios Productos
  getProductosTiendaPreciosFecha(idproducto: number, idruta: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoRutas/getProductosTiendasFechas.php?idproducto=${idproducto}&idruta=${idruta}`);
  }

  // **************************************************
  // Enlista la lista de productos disponibles para cada ruta
  getProductosDisponiblesServicios(producto: string, idruta: number): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoRutas/getProductosDisponiblesServicio.php/?producto=${producto}&idruta=${idruta}`);
  }

  getCatIntensidadServicios(): Observable<any[]> {
    //return this.httpClient.get<catcadena>(`${this.PHP_API_SERVER}/CatalogoCadena/getCadenaServicio.php?idEmpresa=${idEmpresa}`);
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoRutas/getCatIntensidadServicio.php`);
  }

  createRutasServicios(catrutas: CatRutas): Observable<CatRutas> {
    let _catrutas: any = catrutas;
    _catrutas.idEmpresa = this.idempresa;
    return this.httpClient.post<CatRutas>(`${this.PHP_API_SERVER}/CatalogoRutas/createRutasServicio.php`, _catrutas);
  }

  createAsignacionProductoATiendaServicios(idruta: number, idproducto: number, resurtible: number, uda: string): Observable<any> {
    return this.httpClient.get<any>(`${this.PHP_API_SERVER}/CatalogoRutas/asignaProductosServicio.php?idruta=${idruta}&idproducto=${idproducto}&resurtible=${resurtible}&uda=${uda}`);
  }

  updateRutasServicios(catrutas: CatRutas) {
    return this.httpClient.put<CatRutas>(`${this.PHP_API_SERVER}/CatalogoRutas/updateRutasServicio.php`, catrutas);
  }

  updateEstatusRutasServicios(catrutas: CatRutas) {
    return this.httpClient.put<CatRutas>(`${this.PHP_API_SERVER}/CatalogoRutas/updateEstatusRutasServicio.php`, catrutas);
  }

  updateLatitudLongitudGMapsServicios(latitud: number, longitud: number, direccion: string) {
    return this.httpClient.delete<CatRutas>(`${this.PHP_API_SERVER}/CatalogoRutas/updateLatitudLongitudGMapsServicio.php/?latitud=${latitud}&longitud=${longitud}&direccion=${direccion}`);
  }

  deleteRutasServicios(idruta: number) {
    return this.httpClient.delete<CatRutas>(`${this.PHP_API_SERVER}/CatalogoRutas/deleteRutasServicio.php/?idruta=${idruta}`);
  }

  deleteAsignacionProductoATiendaServicios(idproductoruta: number) {
    return this.httpClient.delete<any>(`${this.PHP_API_SERVER}/CatalogoRutas/desasignaProductoServicio.php?idproductoruta=${idproductoruta}`);
  }

  // **************************************************
  // Obtiene la lista de precios por formato y producto utilizado en el apartado de productos en la tercer pestaña
  getProductoFormatoPrecio(idproducto: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.PHP_API_SERVER}/CatalogoProductos/getProductosFormatoPrecio.php?idproducto=${idproducto}`);
  }

  // **************************************************
  // Establece el precio de un producto
  EstablecePrecio(datos: any): Observable<any[]> {
    return this.httpClient.put<any[]>(`${this.PHP_API_SERVER}/CatalogoProductos/EstablecePrecio.php`, datos);
  }


}
