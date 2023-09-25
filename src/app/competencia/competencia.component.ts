import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { CatFotos } from '../Objetos/catfotos';
import { CatcadenaService } from '../Servicios/catcadena.service';
import { catcadena } from '../Objetos/catcadena';
import { CatRutasService } from '../Servicios/cat-rutas.service';
import { CatRutas } from '../Objetos/catrutas';
import { Paginacion } from '../Objetos/paginacion';
import { FiltradoFotos } from '../Objetos/filtradofotos';
import { Mapas } from '../Objetos/mapas';
import { ToastrService } from 'ngx-toastr';
import { MatOption, MatPaginator, MatSelect } from '@angular/material';
import { GenerarPdf1Service } from 'app/Servicios/generar-pdf1.service';
import { GenerarZipFotosService } from 'app/Servicios/generar-zip-fotos.service';
import { environment } from "environments/environment";
import { CompetenciaService } from 'app/Servicios/competencia.service';
import { GenerarZipFotos1Service } from 'app/Servicios/generar-zip-fotos1.service';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';

declare var $: any;

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.ubicacion1.component.html',
  styleUrls: ['./competencia.component.scss']
})

export class FotosUbicacion1Component implements AfterViewInit {
  idempresa : number = Number(localStorage.getItem('idempresa'));
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
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
  styleUrls: ['./competencia.component.scss']
})
export class CompetenciaComponent implements OnInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild('listaTienda', { static: false }) listaTienda: MatSelect;
  @ViewChild('listaPromotor', { static: false }) listaPromotor: MatSelect;
  @ViewChild('listaActividad', { static: false }) listaActividad: MatSelect;
  @ViewChild('listaCadena', { static: false }) listaCadena: MatSelect;

  encabezados = { "foto": "Ruta Foto", "competencia": "Info. Competencia", "precio":"Precio", "presentacion":"Presentación" ,"demo": "Demo", "empaque": "Empaque", "emplaye": "Emplaye", "promotor": "Promotor", "Tienda": "Tienda", "FechaHora": "Fecha y Hora", "exhib": "Exhib." };
  form: any;
  mapas = new Mapas();
  catfotos: any[];
  cadenas: catcadena[];
  catrutas: CatRutas[];
  promotores: any[];
  actividades: any[];
  filtradofotos: FiltradoFotos = { FechaInicial: "", FechaFinal: "", idoperacion: 0, Tienda: 0, idpromotor: 0, idcadena: 0, Actividad: 0, orden: 0 };
  selectAllItemsTienda: boolean = false;
  selectAllItemsPromotor: boolean = false;
  selectAllItemsActividad: boolean = false;
  selectAllItemsCadena: boolean = false;
  idempresa : number = Number(localStorage.getItem('idempresa'));

  paginacion = new Paginacion();

  constructor(private fotosService: CompetenciaService,
    private catcadenasService: CatcadenaService,
    private catrutasService: CatRutasService,
    private generarPdf: GenerarPdf1Service,
    private generarZipFotos: GenerarZipFotos1Service,
    private exportarExcel: ExportarExcelService, private toaster: ToastrService) { }

  ngOnInit() {
    this.filtradofotos.FechaInicial = (new Date()).toISOString();
    this.filtradofotos.FechaFinal = (new Date()).toISOString();
    this.catcadenasService.getcadenaservicios(this.idempresa).subscribe((gcadenas: catcadena[]) => {
      this.cadenas = gcadenas;
      // console.log("lista de cadenas, ", this.cadenas);
    });
    this.catrutasService.getrutasservicios().subscribe((catrutas: CatRutas[]) => {
      this.catrutas = catrutas;
      // console.log("lista de rutas", this.catrutas);
    });
    this.fotosService.getPromotorServicios().subscribe((promotores: any[]) => {
      this.promotores = promotores;
      // console.log("lista de promotores, ", this.promotores);
    });
    this.fotosService.getActividadServicios().subscribe((actividades: any[]) => {
      this.actividades = actividades;
      // console.log("lista de actividades, ", this.actividades);
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
        this.listaActividad.options.first.select();
        this.listaCadena.options.first.deselect();
        clearInterval(wait);
      }
    }, 10);

  }

  consultar(form) {
    this.form = form;
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    if (form.value.FechaInicial != "" && form.value.FechaFinal != "") {
      this.fotosService.getCatFotosServicios(form.value).subscribe((catfotos: any[]) => {
        this.catfotos = catfotos;
        console.log("lista de fotos, ", this.catfotos);
      });
    } else {
      this.toaster.warning("Debe establecer la fecha inicial y la fecha final", "", {
        timeOut: 3000,
        positionClass: 'toast-bottom-center'
      });
    }
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

  verMapaUbicacion(latitud_tienda: number, longitud_tienda: number, latitud_ubicacion: number, longitud_ubicacion: number, Tienda: string, Direccion: string, promotor: string, actividad: string) {
    window.open(`${environment.servidor.TAG_SERVIDOR_W}/#/fotosUbicacion?latitud_tienda=${latitud_tienda}&longitud_tienda=${longitud_tienda}&latitud_ubicacion=${latitud_ubicacion}&longitud_ubicacion=${longitud_ubicacion}&Tienda=${Tienda}&Direccion=${Direccion}&promotor=${promotor}&actividad=${actividad}`, "_blank", "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=no");
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

  /* Selecciona y deselecciona todas las actividades */
  toggleAllItemsActividad() {
    this.selectAllItemsActividad = !this.selectAllItemsActividad;  // to control select-unselect

    if (this.selectAllItemsActividad) {
      this.listaActividad.options.forEach((item: MatOption) => item.select());
    } else {
      this.listaActividad.options.forEach((item: MatOption) => { item.deselect(); });
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
}
