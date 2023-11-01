import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CatRutas } from 'app/Objetos/catrutas';
import { FiltradoFotos } from 'app/Objetos/filtradofotos';
import { Paginacion } from 'app/Objetos/paginacion';
import { CatRutasService } from 'app/Servicios/cat-rutas.service';
import { ToastrService } from 'ngx-toastr';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { GenerarReporteExcelService } from 'app/Servicios/generar-reporte-excel.service';
import { CatcadenaService } from 'app/Servicios/catcadena.service';
import { catcadena } from 'app/Objetos/catcadena';
import { MatOption, MatPaginator, MatSelect } from '@angular/material';
import { PromocionesTiendasService } from 'app/Servicios/promociones-tiendas.service';
import { Mapas } from 'app/Objetos/mapas';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-promociones-tiendas',
  templateUrl: './fotos.ubicacion3.component.html',
  styleUrls: ['./promociones-tiendas.component.scss']
})

export class FotosUbicacion3Component implements AfterViewInit {

  latitud_tienda: number;
  longitud_tienda: number;
  latitud_ubicacion: number;
  longitud_ubicacion: number;
  Tienda: string;
  Direccion: string;
  promotor: string;
  actividad: string;
  mapas = new Mapas();

  ngAfterViewInit() {

    this.latitud_tienda = parseFloat(this.getParameterByName("latitud_tienda"));
    this.longitud_tienda = parseFloat(this.getParameterByName("longitud_tienda"));
    this.latitud_ubicacion = parseFloat(this.getParameterByName("latitud_ubicacion"));
    this.longitud_ubicacion = parseFloat(this.getParameterByName("longitud_ubicacion"));
    this.Tienda = this.getParameterByName("Tienda");
    this.Direccion = this.getParameterByName("Direccion");
    this.promotor = this.getParameterByName("promotor");
    this.actividad = this.getParameterByName("actividad");
    this.mapas.Maps2();
    this.mapas.iniciarGMaps_ListaUbicaciones2(document.getElementById("map"), this.latitud_tienda, this.longitud_tienda, this.latitud_ubicacion, this.longitud_ubicacion, this.Tienda, this.Direccion, this.promotor, this.actividad);
  }

  getParameterByName(name: string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(document.location.href.substring(document.location.href.indexOf("?")));
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

}
@Component({
  selector: 'app-promociones-tiendas',
  templateUrl: './promociones-tiendas.component.html',
  styleUrls: ['./promociones-tiendas.component.scss'],
  providers: [
    DatePipe
  ]
})
export class PromocionesTiendasComponent implements OnInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild('listaTienda', { static: false }) listaTienda: MatSelect;
  @ViewChild('listaPromotor', { static: false }) listaPromotor: MatSelect;
  @ViewChild('listaPromocion', { static: false }) listaPromocion: MatSelect;
  @ViewChild('listaActividad', { static: false }) listaActividad: MatSelect;
  @ViewChild('listaCadena', { static: false }) listaCadena: MatSelect;
  encabezados = { "ruta": "Ruta Foto", "nombre": "Nombre", "canal": "Canal", "alcance": "Alcance", "actividad": "Actividad", "tienda": "Tienda", "aplica": "Aplica", "formato": "Formato", "cadena": "Cadena", "fecha": "Fecha" };
  encabezados1 = { "Fecha": "Fecha", "Nombre": "Nombre", "Tienda": "Tienda", "Cadena": "Cadena", "Formato": "Formato", "Objetivo": "El Objetivo", "Checkin": "Cta Checkin", "Checkout": "Cta Checkout" };
  promocionesTiendas: any[];
  promotores: any[];
  catrutas: CatRutas[];
  actividades: any[];
  cadenas: catcadena[];
  lista_promociones: any[];
  filtradofotos: any = { FechaInicial: "", FechaFinal: "", idoperacion: null, Tienda: 0, idpromotor: 0, idpromocion: 0, idcadena: 0, Actividad: 0, orden: 0 };
  selectAllItemsTienda: boolean = false;
  selectAllItemsPromotor: boolean = false;
  selectAllItemsPromocion: boolean = false;
  selectAllItemsActividad: boolean = false;
  selectAllItemsCadena: boolean = false;
  idempresa: number = Number(localStorage.getItem('idempresa'));

  paginacion = new Paginacion();

  constructor(
    private fotosService: PromocionesTiendasService,
    private catrutasService: CatRutasService,
    private catcadenasService: CatcadenaService,
    private toaster: ToastrService,
    private exportarExcel: ExportarExcelService,
    public generarReporteExcel: GenerarReporteExcelService,
    public datePipe: DatePipe) { }

  ngOnInit() {
    this.filtradofotos.FechaInicial = (new Date()).toISOString();
    this.filtradofotos.FechaFinal = (new Date()).toISOString();
    this.exportarExcel.nombreArchivo = "distancias";
    this.catrutasService.getrutasservicios().subscribe((catrutas: CatRutas[]) => {
      this.catrutas = catrutas;
      // console.log("lista de rutas", this.catrutas);
    });
    this.fotosService.getPromotorServicios().subscribe((promotores: any[]) => {
      this.promotores = promotores;
      // console.log("lista de promotores, ", this.promotores);
    });
    this.fotosService.getPromocionServicios().subscribe((promociones: any[]) => {
      this.lista_promociones = promociones;
      // console.log("lista de promociones, ", this.lista_promociones);
    });
    this.fotosService.getActividadServicios().subscribe((actividades: any[]) => {
      this.actividades = actividades;
      // console.log("lista de actividades, ", this.actividades);
    });

    this.catcadenasService.getcadenaservicios(this.idempresa).subscribe((cadenas: catcadena[]) => {
      this.cadenas = cadenas;
      // console.log("lista de cadenas, ", this.cadenas);
    });

  }

  ngAfterViewInit() {
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }

    /* Espera a que se finilize la carga de los registros de todas las cajas desplegables */
    let wait = setInterval(() => {
      if (this.catrutas != null && this.promotores != null && this.actividades != null && this.cadenas != null) {
        this.listaTienda.options.first.deselect();
        this.listaPromotor.options.first.deselect();
        this.listaPromocion.options.first.deselect();
        this.listaCadena.options.first.deselect();
        clearInterval(wait);
      }
    }, 10);
  }

  consultar(form) {
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    /*if (form.value.FechaInicial != "") {*/
    let obj = Object.assign({}, form.value);
    obj.FechaInicial = this.datePipe.transform(obj.FechaInicial, 'yyyy-MM-dd');
    obj.FechaFinal = this.datePipe.transform(obj.FechaFinal, 'yyyy-MM-dd');
    this.fotosService.getPromocionesTiendasServicios(obj).subscribe((promocionesTiendas: any[]) => {
      this.promocionesTiendas = promocionesTiendas;
      // console.log("Lista de promocones por tienda: ", this.promocionesTiendas);
    });
    /* } else {
       this.toaster.warning("Debe establecer la fecha inicial y la fecha final", "", {
         timeOut: 3000,
         positionClass: 'toast-bottom-center'
       });
     }*/
  }


  exportarExcel1(form) {
    this.fotosService.getReporte(form).subscribe((reporte: any) => {
      this.exportarExcel.nombreArchivo = "Reporte1";
      this.exportarExcel.exportarExcel(reporte, this.encabezados1);
      // console.log("reporte generado: ", reporte);
    });
  }

  /* Selecciona y deselecciona todas las tiendas */
  toggleAllItemsTienda() {
    this.selectAllItemsTienda = !this.selectAllItemsTienda;  // to control select-unselect

    if (this.selectAllItemsTienda) {
      this.listaTienda.options.forEach((item: MatOption) => item.select());
    } else {
      this.listaTienda.options.forEach((item: MatOption) => { item.deselect() });
    }
    this.listaTienda.close();
  }

  /* Selecciona y deselecciona todos los promotores */
  toggleAllItemsPromotor() {
    this.selectAllItemsPromotor = !this.selectAllItemsPromotor;  // to control select-unselect

    if (this.selectAllItemsPromotor) {
      this.listaPromotor.options.forEach((item: MatOption) => item.select());
    } else {
      this.listaPromotor.options.forEach((item: MatOption) => { item.deselect() });
    }
    this.listaPromotor.close();
  }

  /* Selecciona y deselecciona todos los promocion */
  toggleAllItemsPromocion() {
    this.selectAllItemsPromocion = !this.selectAllItemsPromocion;  // to control select-unselect

    if (this.selectAllItemsPromocion) {
      this.listaPromocion.options.forEach((item: MatOption) => item.select());
    } else {
      this.listaPromocion.options.forEach((item: MatOption) => { item.deselect() });
    }
    this.listaPromocion.close();
  }

  /* Selecciona y deselecciona todas las actividades */
  toggleAllItemsActividad() {
    this.selectAllItemsActividad = !this.selectAllItemsActividad;  // to control select-unselect

    if (this.selectAllItemsActividad) {
      this.listaActividad.options.forEach((item: MatOption) => item.select());
    } else {
      this.listaActividad.options.forEach((item: MatOption) => { item.deselect() });
    }
    this.listaActividad.close();
  }

  /* Selecciona y deselecciona todas las cadenas */
  toggleAllItemsCadena() {
    this.selectAllItemsCadena = !this.selectAllItemsCadena;  // to control select-unselect

    if (this.selectAllItemsCadena) {
      this.listaCadena.options.forEach((item: MatOption) => item.select());
    } else {
      this.listaCadena.options.forEach((item: MatOption) => { item.deselect() });
    }
    this.listaCadena.close();
  }

  abrirVentanaModal(foto: string): void {
    $('#ventanaImagenes').on("shown.bs.modal", function () {
      $("#imagen").attr("src", foto);
    });
    $('#ventanaImagenes').on("hidden.bs.modal", function () {
      $("#imagen").removeAttr("src");
    });
    $('#ventanaImagenes').modal('show');
  }

}