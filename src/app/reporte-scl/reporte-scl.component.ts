import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ListaReporteDesplazamientoComponent } from './lista-reporte-desplazamiento/lista-reporte-desplazamiento.component';

@Component({
  selector: 'app-reporte-scl',
  templateUrl: './reporte-scl.component.html',
  styleUrls: ['./reporte-scl.component.scss']
})
export class ReporteSclComponent implements OnInit, AfterViewInit {
  @ViewChild('rd', { static: false, read: ListaReporteDesplazamientoComponent }) rd: ListaReporteDesplazamientoComponent;

  nombre_modulo: string;

  filtrado = {
    fechainicial: '',
    fechafinal: '',
    idmodulo: '',
    page: 0,
    resultsForPage: '10'
  }

  constructor(
    private router: ActivatedRoute
  ) {
    this.router.data.subscribe((data: Data) => {
      this.filtrado.fechainicial = (new Date()).toISOString();
      this.filtrado.fechafinal = (new Date()).toISOString();
      this.filtrado.idmodulo = data.idmodulo;
      this.nombre_modulo = data.nombre_modulo;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  consultar() {
    this.rd.buscarInfoReporteDesplazamiento(false);
  }

  generarReporte() {
    this.rd.generarReporte();
  }

}
