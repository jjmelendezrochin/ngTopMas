import { Component, OnInit } from '@angular/core';
import { CatcadenaService } from 'app/Servicios/catcadena.service';
import { CatRutasService } from 'app/Servicios/cat-rutas.service';
import { GenerarReporteExcelService } from 'app/Servicios/generar-reporte-excel.service';
import { CatFotos } from 'app/Objetos/catfotos';
import { catcadena } from 'app/Objetos/catcadena';
import { CatRutas } from 'app/Objetos/catrutas';
import { FiltradoFotos } from 'app/Objetos/filtradofotos';
import { FotosService } from 'app/Servicios/fotos.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-generar-reporte-excel',
  templateUrl: './generar-reporte-excel.component.html',
  styleUrls: ['./generar-reporte-excel.component.scss'],
  providers: [
    DatePipe
  ]
})
export class GenerarReporteExcelComponent implements OnInit {

  catfotos: CatFotos[];
  cadenas: catcadena[];
  catrutas: CatRutas[];
  promotores: any[];
  actividades: any[];
  filtradofotos: FiltradoFotos = { FechaInicial: "", FechaFinal: "", idoperacion: 0, Tienda: "0", idpromotor: 0, idcadena: 0, Actividad: null, orden: 0 };
  idempresa: number = Number(localStorage.getItem('idempresa'));

  constructor(
    private fotosService: FotosService,
    private catcadenasService: CatcadenaService,
    private catrutasService: CatRutasService,
    public generarReporteExcel: GenerarReporteExcelService,
    public datePipe: DatePipe) { }

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
  }

}
