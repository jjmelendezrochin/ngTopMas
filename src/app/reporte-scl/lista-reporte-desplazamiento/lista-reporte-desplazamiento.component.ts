import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ReporteSclService } from 'app/Servicios/reporte-scl.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-lista-reporte-desplazamiento',
  templateUrl: './lista-reporte-desplazamiento.component.html',
  styleUrls: ['./lista-reporte-desplazamiento.component.scss'],
  providers: [
    DatePipe
  ]
})
export class ListaReporteDesplazamientoComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;

  bsBuscar: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  buscar = this.bsBuscar.asObservable();

  @Input() filtrado: any;

  reporte_desplazamiento: any[] = [];

  paginacion = {
    page_number: 0,
    page_size: 10,
    page_size_options: [10],
    total_records: 0
  };

  constructor(
    private datePipe: DatePipe,
    private reporteSclService: ReporteSclService
  ) {
    this.buscar.subscribe((filtrado: any) => {
      if (filtrado != null || filtrado != undefined) {
        this.reporteSclService.reporteDesplazamientoMuestraEnPantalla(filtrado)
          .subscribe((response: any) => {
            this.paginacion.total_records = response.totalRecords;
            this.paginacion.page_number = response.currentPage;
            this.paginacion.page_size = response.resultsForPage;
            this.paginacion.page_size_options = [response.resultsForPage];
            this.reporte_desplazamiento = response.regs;
            $('#bloqueador_tabla_reporte_desplazamiento').hide();
          }, () => {
            $('#bloqueador_tabla_reporte_desplazamiento').hide();
          }, () => {
            $('#bloqueador_tabla_reporte_desplazamiento').hide();
          });
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#bloqueador_tabla_reporte_desplazamiento').hide();
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
  }

  buscarInfoReporteDesplazamiento(nav: boolean = false) {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.fechainicial = this.datePipe.transform(this.filtrado.fechainicial, 'yyyy-MM-dd');
    filtrado.fechafinal = this.datePipe.transform(this.filtrado.fechafinal, 'yyyy-MM-dd');

    $('#bloqueador_tabla_reporte_desplazamiento').show();

    if (this.pag != null) {
      if (nav == false) {
        filtrado.page = this.filtrado.page = this.paginacion.page_number = 0;
        this.pag.firstPage();
        this.bsBuscar.next(filtrado);
      } else {
        this.bsBuscar.next(filtrado);
      }
    }
  }

  irAlaPagina(event: any) {
    let wait = setTimeout(() => {
      this.filtrado.page = event.pageIndex + 1;
      this.buscarInfoReporteDesplazamiento(true);
      clearTimeout(wait);
    }, 0);
  }

  generarReporte() {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.fechainicial = this.datePipe.transform(this.filtrado.fechainicial, 'yyyy-MM-dd');
    filtrado.fechafinal = this.datePipe.transform(this.filtrado.fechafinal, 'yyyy-MM-dd');
    $('#bloqueador_tabla_reporte_desplazamiento').show();
    this.reporteSclService.reporteDesplazamientoExcel(filtrado).subscribe((res: any) => {
      let wait = setTimeout(() => {

        if ((res.status as boolean) == true) {
          var $a = $("<a>");
          $a.attr("href", res.url);
          $("body").append($a);
          $a.attr("download", res.nombre_archivo);
          $a[0].click();
          $a.remove();
        }

        clearTimeout(wait);
      }, 0);
      $('#bloqueador_tabla_reporte_desplazamiento').hide();
    }, () => {
      $('#bloqueador_tabla_reporte_desplazamiento').hide();
    }, () => {
      $('#bloqueador_tabla_reporte_desplazamiento').hide();
    });
  }

}
