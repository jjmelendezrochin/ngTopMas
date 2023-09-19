import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.scss']
})
export class ListaEmpleadosComponent implements OnInit {

  @Input() ventana: string = '';
  @Input() titulo: string = '';
  @Input() supervisores: any[] = [];
  @Input() supervisores_promotores: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
