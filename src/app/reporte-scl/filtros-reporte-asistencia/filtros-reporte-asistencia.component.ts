import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportePreciosXproductoMensualService } from 'app/Servicios/reporte-precios-xproducto-mensual.service';

@Component({
  selector: 'app-filtros-reporte-asistencia',
  templateUrl: './filtros-reporte-asistencia.component.html',
  styleUrls: ['./filtros-reporte-asistencia.component.scss']
})
export class FiltrosReporteAsistenciaComponent implements OnInit {

  @Output() consultarEvt: EventEmitter<void> = new EventEmitter<void>();
  @Output() generarReporteEvt: EventEmitter<number> = new EventEmitter<number>();

  @Input() regs: any[] = [];
  @Input() filtrado: any;

  anios: any[] = [];
  meses: any[] = [];

  constructor(
    private reporteService: ReportePreciosXproductoMensualService
  ) { }

  ngOnInit() {
    for (let i = 2020; i <= 2050; i++) {
      this.anios.push({ anio: i });
    }
    this.reporteService.getCmbMesesservicios().subscribe((gmeses: any[]) => {
      this.meses = gmeses;
      this.filtrado.mes = `${new Date().getMonth() + 1}`;
      // console.log("Lista de meses: ", this.meses);
    });
  }

  consultar() {
    this.consultarEvt.emit();
  }

  generarReporte(tipo: number) {
    this.generarReporteEvt.emit(tipo); // 1 PDF, 2 Excel
  }

}
