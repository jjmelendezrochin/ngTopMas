import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CatRutas } from 'app/Objetos/catrutas';
import { FiltradoFotos } from 'app/Objetos/filtradofotos';
import { Paginacion } from 'app/Objetos/paginacion';
import { FotosService } from 'app/Servicios/fotos.service';
import { CatRutasService } from 'app/Servicios/cat-rutas.service';
import { ToastrService } from 'ngx-toastr';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { GenerarReporteExcelService } from 'app/Servicios/generar-reporte-excel.service';
import { CatcadenaService } from 'app/Servicios/catcadena.service';
import { catcadena } from 'app/Objetos/catcadena';
import { MatOption, MatPaginator, MatSelect } from '@angular/material';

@Component({
  selector: 'app-distancia',
  templateUrl: './distancia.component.html',
  styleUrls: ['./distancia.component.scss']
})
export class DistanciaComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild('listaTienda', { static: false }) listaTienda: MatSelect;
  @ViewChild('listaPromotor', { static: false }) listaPromotor: MatSelect;
  @ViewChild('listaActividad', { static: false }) listaActividad: MatSelect;
  @ViewChild('listaCadena', { static: false }) listaCadena: MatSelect;
  encabezados = { "Nombre": "Nombre", "Tienda": "Tienda", "Actividad": "Actividad", "FechaHora": "Fecha y Hora", "Distancia": "Distancia", "Actividad1": "Actividad 1", "FechaHora1": "Fecha y Hora 1", "Distancia1": "Distancia 1", "Estancia": "Estancia", "Estatus": "Estatus" };
  encabezados1 = { "Fecha": "Fecha", "Nombre": "Nombre", "Tienda": "Tienda", "Cadena": "Cadena", "Formato": "Formato", "Objetivo": "El Objetivo", "Checkin": "Cta Checkin", "Checkout": "Cta Checkout" };
  fotodistancia: any[];
  promotores: any[];
  catrutas: CatRutas[];
  actividades: any[];
  cadenas: catcadena[];
  filtradofotos: FiltradoFotos = { FechaInicial: "", FechaFinal: "", idoperacion: null, Tienda: 0, idpromotor: 0, idcadena: 0, Actividad: 0, orden: 0 };
  selectAllItemsTienda: boolean = false;
  selectAllItemsPromotor: boolean = false;
  selectAllItemsActividad: boolean = false;
  selectAllItemsCadena: boolean = false;
  idempresa: number = Number(localStorage.getItem('idempresa'));

  paginacion = new Paginacion();

  constructor(
    private fotosService: FotosService,
    private catrutasService: CatRutasService,
    private catcadenasService: CatcadenaService,
    private toaster: ToastrService,
    private exportarExcel: ExportarExcelService,
    public generarReporteExcel: GenerarReporteExcelService) { }

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
    this.fotosService.getActividad1Servicios().subscribe((actividades: any[]) => {
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
        this.listaActividad.options.first.deselect();
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
    this.fotosService.getFotosDistanciaServicios(form.value).subscribe((fotodistancia: any[]) => {
      this.fotodistancia = fotodistancia;
      console.log("Lista de distancias: ", this.fotodistancia);
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

}
