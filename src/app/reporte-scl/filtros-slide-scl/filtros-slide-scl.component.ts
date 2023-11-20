import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filtros-slide-scl',
  templateUrl: './filtros-slide-scl.component.html',
  styleUrls: ['./filtros-slide-scl.component.scss']
})
export class FiltrosSlideSclComponent implements OnInit {

  @Output() consultarEvt: EventEmitter<void> = new EventEmitter<void>();
  @Output() generarReporteEvt: EventEmitter<void> = new EventEmitter<void>();

  @Input() regs: any[] = [];
  @Input() filtrado: any;

  constructor(
  ) { }

  ngOnInit() {
  }

  consultar() {
    this.consultarEvt.emit();
  }

  generarReporte() {
    this.generarReporteEvt.emit();
  }

}
