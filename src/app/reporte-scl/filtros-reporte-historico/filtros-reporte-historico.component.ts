import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportePreciosXproductoMensualService } from 'app/Servicios/reporte-precios-xproducto-mensual.service';

@Component({
  selector: 'app-filtros-reporte-historico',
  templateUrl: './filtros-reporte-historico.component.html',
  styleUrls: ['./filtros-reporte-historico.component.scss']
})
export class FiltrosReporteHistoricoComponent implements OnInit {
  @Output() consultarEvt: EventEmitter<void> = new EventEmitter<void>();
  @Output() generarReporteEvt: EventEmitter<void> = new EventEmitter<void>();

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

  generarReporte() {
    this.generarReporteEvt.emit();
  }

}
