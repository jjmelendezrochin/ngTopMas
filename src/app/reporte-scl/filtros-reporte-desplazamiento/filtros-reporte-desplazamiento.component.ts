import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filtros-reporte-desplazamiento',
  templateUrl: './filtros-reporte-desplazamiento.component.html',
  styleUrls: ['./filtros-reporte-desplazamiento.component.scss']
})
export class FiltrosReporteDesplazamientoComponent implements OnInit {

  @Output() consultarEvt: EventEmitter<void> = new EventEmitter<void>();
  @Output() generarReporteEvt: EventEmitter<void> = new EventEmitter<void>();

  @Input() regs: any[] = [];
  @Input() filtrado: any;

  constructor() { }

  ngOnInit() {
  }

  consultar() {
    this.consultarEvt.emit();
  }

  generarReporte() {
    this.generarReporteEvt.emit();
  }

}
