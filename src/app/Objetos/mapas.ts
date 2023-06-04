import { CatRutas_Map } from './catrutas_mapa';
import { ListaUbicaciones_Mapa } from './listaubicaciones_mapa';
import { ListaUbicaciones_Mapa1 } from './listaubicaciones_mapa1';
import { ListaUbicaciones_Mapa2 } from './listaubicaciones_mapa2';
import { ListaUbicacionesTiendas_Mapa } from './listaubicacionesTiendas_mapa';

export class Mapas {

    catrutas_map: CatRutas_Map;
    listaubicaciones_map: ListaUbicaciones_Mapa;
    listaubicaciones_map1: ListaUbicaciones_Mapa1;
    listaubicaciones_map2: ListaUbicaciones_Mapa2;
    listaubicacionestienda_map: ListaUbicacionesTiendas_Mapa;

    /*Inicializacion de maps para el catalogo de rutas*/
    CatRutas(maps: any, rutasservice: any) {
        this.catrutas_map = new CatRutas_Map(maps, rutasservice);
    }

    /*Inicializacion de maps para la lista de ubicaciones*/
    Maps(fotosservice: any) {
        this.listaubicaciones_map = new ListaUbicaciones_Mapa(fotosservice);
    }

    /*Inicializacion de maps para la lista de ubicaciones1*/
    Maps1(fotosservice: any) {
        this.listaubicaciones_map1 = new ListaUbicaciones_Mapa1(fotosservice);
    }

    /*Inicializacion de maps para la lista de ubicaciones2*/
    Maps2() {
        this.listaubicaciones_map2 = new ListaUbicaciones_Mapa2();
    }

    /*Inicializacion de maps para la lista de ubicaciones de tiendas*/
    Maps_Tiendas(fotosservice: any) {
        this.listaubicacionestienda_map = new ListaUbicacionesTiendas_Mapa(fotosservice);
    }

    /*Funciones invocadas desde el catalogo de rutas*/
    iniciarGMaps_CatRutas() {
        this.catrutas_map.iniciarGMaps();
    }

    setCatRutas(selectedCatRutas: any) {
        this.catrutas_map.selectedCatRutas = selectedCatRutas;
    }

    setMap(lat: number, lng: number, direccion: string) {
        this.catrutas_map.setMap(lat, lng, direccion);
    }
    /*Fin de funciones invocadas desde el catalogo de rutas */

    /*Funcion invocada desde maps de la lista de ubicaciones*/
    iniciarGMaps_ListaUbicaciones(element: any) {
        this.listaubicaciones_map.initGMaps(element);
    }
    /*Fin de la funcion invocadas desde maps de la lista de ubicaciones*/

    /*Funcion invocada desde maps de la lista de ubicaciones1*/
    iniciarGMaps_ListaUbicaciones1(element: any) {
        this.listaubicaciones_map1.initGMaps(element);
    }
    /*Fin de la funcion invocadas desde maps de la lista de ubicaciones1*/

    /*Funcion invocada desde maps de la lista de ubicaciones2*/
    iniciarGMaps_ListaUbicaciones2(element: any, latitud_tienda: number, longitud_tienda: number, latitud_ubicacion: number, longitud_ubicacion: number, Tienda: string, Direccion: string, promotor: string, actividad: string) {
        this.listaubicaciones_map2.initGMaps(element, latitud_tienda, longitud_tienda, latitud_ubicacion, longitud_ubicacion, Tienda, Direccion, promotor, actividad);
    }
    /*Fin de la funcion invocadas desde maps de la lista de ubicaciones2*/

    /*Funcion invocada desde maps de la lista de ubicaciones de las tiendas*/
    iniciarGMaps_ListaUbicacionesTiedas(element: any) {
        this.listaubicacionestienda_map.initGMaps(element);
    }
    /*Fin de la funcion invocadas desde maps de la lista de ubicaciones de las tiendas*/

}
