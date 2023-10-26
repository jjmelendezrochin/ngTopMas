import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportePreciosXproductoMensualService } from 'app/Servicios/reporte-precios-xproducto-mensual.service';

@Component({
  selector: 'app-filtros-slide-scl',
  templateUrl: './filtros-slide-scl.component.html',
  styleUrls: ['./filtros-slide-scl.component.scss']
})
export class FiltrosSlideSclComponent implements OnInit {

  @Output() consultarEvt: EventEmitter<void> = new EventEmitter<void>();
  @Output() generarReporteEvt: EventEmitter<void> = new EventEmitter<void>();

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
