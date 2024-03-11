import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReporteAsistenciaService } from 'app/Servicios/reporte-asistencia.service';

@Component({
  selector: 'app-filtros-reporte-asistencia1',
  templateUrl: './filtros-reporte-asistencia1.component.html',
  styleUrls: ['./filtros-reporte-asistencia1.component.scss']
})
export class FiltrosReporteAsistencia1Component implements OnInit {

  @Output() consultarEvt: EventEmitter<void> = new EventEmitter<void>();
  @Output() generarReporteEvt: EventEmitter<void> = new EventEmitter<void>();

  @Input() regs: any[] = [];
  @Input() filtrado: any;

  promotores: any[] = [];

  idempresa: number = Number(localStorage.getItem('idempresa'));

  constructor(
    private reporteService: ReporteAsistenciaService
  ) { }

  ngOnInit() {
    this.reporteService.getCmbPromotor({ idEmpresa: this.idempresa }).subscribe((promotores: any[]) => {
      this.promotores = promotores;
    });
  }

  consultar() {
    this.consultarEvt.emit();
  }

  generarReporte() {
    this.generarReporteEvt.emit(); // 1 PDF, 2 Excel
  }

}
