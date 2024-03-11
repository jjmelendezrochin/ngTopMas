import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ReporteAsistenciaService } from 'app/Servicios/reporte-asistencia.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-lista-reporte-asistencia1',
  templateUrl: './lista-reporte-asistencia1.component.html',
  styleUrls: ['./lista-reporte-asistencia1.component.scss']
})
export class ListaReporteAsistencia1Component implements OnInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;

  bsBuscar: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  buscar = this.bsBuscar.asObservable();

  @Output() regs: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Input() filtrado: any;

  campos_encabezados: any[] = [];

  encabezados: any[] = [];

  reporte_asistencia: any[] = [];

  paginacion = {
    page_number: 0,
    page_size: 10,
    page_size_options: [10],
    total_records: 0
  };

  constructor(
    private reporteAsistenciaService: ReporteAsistenciaService
  ) {
    this.buscar.subscribe((filtrado: any) => {
      if (filtrado != null || filtrado != undefined) {
        this.reporteAsistenciaService.reporteAsistenciaMuestraEnPantalla(filtrado)
          .subscribe((response: any) => {
            this.paginacion.total_records = response.totalRecords;
            this.paginacion.page_number = response.currentPage;
            this.paginacion.page_size = response.resultsForPage;
            this.paginacion.page_size_options = [response.resultsForPage];
            this.reporte_asistencia = response.regs;

            this.reporteAsistenciaService.reporteAsistenciaEncabezadosMuestraEnPantalla().subscribe((response: any) => {
              this.campos_encabezados = response.regs_e;
              this.encabezados = response.regs;
              this.regs.emit(this.reporte_asistencia);
              $('#bloqueador_tabla_reporte_asistencia').hide();
            });

          }, () => {
            $('#bloqueador_tabla_reporte_asistencia').hide();
          }, () => {
            $('#bloqueador_tabla_reporte_asistencia').hide();
          });

      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#bloqueador_tabla_reporte_asistencia').hide();
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
  }

  buscarInfoReporteAsistencia(nav: boolean = false) {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.fechainicial = this.filtrado.fechainicial;
    filtrado.fechafinal = this.filtrado.fechafinal;

    $('#bloqueador_tabla_reporte_asistencia').show();

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
      this.buscarInfoReporteAsistencia(true);
      clearTimeout(wait);
    }, 0);
  }

  generarReporte() {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.fechainicial = this.filtrado.fechainicial;
    filtrado.fechafinal = this.filtrado.fechafinal;
    $('#bloqueador_tabla_reporte_asistencia').show();
    this.reporteAsistenciaService.reporteAsistenciaExcel(filtrado).subscribe((res: any) => {
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
      $('#bloqueador_tabla_reporte_asistencia').hide();
    }, () => {
      $('#bloqueador_tabla_reporte_asistencia').hide();
    }, () => {
      $('#bloqueador_tabla_reporte_asistencia').hide();
    });
  }

}
