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
  regs_slide: any[] = [];

  nombre_modulo: string;

  filtrado_asistencia = {
    anio: 0,
    mes: '',
    idmodulo: '',
    page: 0,
    resultsForPage: '10'
  };

  filtrado_presentaciones_canjes = {
    idmodulo: '',
    page: 0,
    resultsForPage: '10'
  };

  filtrado_historico = {
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
    anio: 0,
    mes: '',
    idmodulo: '',
    page: 0,
    resultsForPage: '10'
  };

  constructor(
    private router: ActivatedRoute
  ) {
    this.router.data.subscribe((data: Data) => {
      this.filtrado_asistencia.anio = (new Date()).getFullYear();
      this.filtrado_asistencia.mes = `${(new Date()).getDay()}`;
      this.filtrado_asistencia.idmodulo = data.idmodulo;
      this.filtrado_presentaciones_canjes.idmodulo = data.idmodulo;
      this.filtrado_historico.idmodulo = data.idmodulo;
      this.filtrado_desplazamiento.fechainicial = (new Date()).toISOString();
      this.filtrado_desplazamiento.fechafinal = (new Date()).toISOString();
      this.filtrado_desplazamiento.idmodulo = data.idmodulo;
      this.filtrado_slide.anio = (new Date()).getFullYear();
      this.filtrado_slide.mes = `${(new Date()).getDay()}`;
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

  generarReporteAsistencia() {
    this.ra.generarReporte();
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
