import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaReporteAsistencia1Component } from './lista-reporte-asistencia1/lista-reporte-asistencia1.component';

@Component({
  selector: 'app-reporte-asistencia1',
  templateUrl: './reporte-asistencia1.component.html',
  styleUrls: ['./reporte-asistencia1.component.scss']
})
export class ReporteAsistencia1Component implements OnInit {
  @ViewChild('ra', { static: false, read: ListaReporteAsistencia1Component }) ra: ListaReporteAsistencia1Component;

  fecha = new Date().toISOString();

  idempresa: number = Number(localStorage.getItem('idempresa'));

  regs_asistencia: any[] = [];

  filtrado_asistencia = {
    fechainicial: this.fecha,
    fechafinal: this.fecha,
    idpromotor: '0',
    idEmpresa: this.idempresa,
    page: 0,
    resultsForPage: '10'
  };


  constructor() { }

  ngOnInit() {
  }

  consultarAsistencia() {
    this.ra.buscarInfoReporteAsistencia(false);
  }

  generarReporteAsistencia() {
    this.ra.generarReporte();
  }


}
