import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ListaReporteDesplazamientoComponent } from './lista-reporte-desplazamiento/lista-reporte-desplazamiento.component';
import { ListaReporteAsistenciaComponent } from './lista-reporte-asistencia/lista-reporte-asistencia.component';
import { ListaSlideSclComponent } from './lista-slide-scl/lista-slide-scl.component';

@Component({
  selector: 'app-reporte-scl',
  templateUrl: './reporte-scl.component.html',
  styleUrls: ['./reporte-scl.component.scss']
})
export class ReporteSclComponent implements OnInit, AfterViewInit {
  @ViewChild('rd', { static: false, read: ListaReporteDesplazamientoComponent }) rd: ListaReporteDesplazamientoComponent;
  @ViewChild('ra', { static: false, read: ListaReporteAsistenciaComponent }) ra: ListaReporteAsistenciaComponent;
  @ViewChild('s', { static: false, read: ListaSlideSclComponent }) s: ListaSlideSclComponent;

  regs_asistencia: any[] = [];
  regs_desplazamiento: any[] = [];
  regs_presentaciones_canjes: any[] = [];
  regs_historico: any[] = [];
  regs_slide: any[] = [];

  nombre_modulo: string;

  filtrado_asistencia = {
    anio: 0,
    mes: '',
    idmodulo: '',
    page: 0,
    resultsForPage: '10'
  };

  filtrado_desplazamiento = {
    fechainicial: '',
    fechafinal: '',
    idmodulo: '',
    page: 0,
    resultsForPage: '10'
  };

  filtrado_slide = {
    fechainicial: '',
    fechafinal: '',
    idmodulo: '',
    page: 0,
    resultsForPage: '10'
  };

  constructor(
    private router: ActivatedRoute
  ) {
    this.router.data.subscribe((data: Data) => {
      let hoy = new Date();
      let primerDiaDelMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      let ultimoDiaDelMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
      this.filtrado_asistencia.anio = (hoy).getFullYear();
      this.filtrado_asistencia.mes = `${(hoy).getDay()}`;
      this.filtrado_asistencia.idmodulo = data.idmodulo;
      this.filtrado_desplazamiento.fechainicial = (primerDiaDelMes).toISOString();
      this.filtrado_desplazamiento.fechafinal = (ultimoDiaDelMes).toISOString();
      this.filtrado_desplazamiento.idmodulo = data.idmodulo;
      this.filtrado_slide.fechainicial = (primerDiaDelMes).toISOString();
      this.filtrado_slide.fechafinal = (ultimoDiaDelMes).toISOString();
      this.filtrado_slide.idmodulo = data.idmodulo;
      this.nombre_modulo = data.nombre_modulo;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  consultarAsistencia() {
    this.ra.buscarInfoReporteAsistencia(false);
  }

  generarReporteAsistencia(tipo: number) {
    this.ra.generarReporte(tipo);
  }

  consultarDesplazamiento() {
    this.rd.buscarInfoReporteDesplazamiento(false);
  }

  generarReporteDesplazamiento() {
    this.rd.generarReporte();
  }

  consultarInfoSlide() {
    this.s.buscarInfoSlide(false);
  }

  generarSlide() {
    this.s.generarSlide();
  }

}
