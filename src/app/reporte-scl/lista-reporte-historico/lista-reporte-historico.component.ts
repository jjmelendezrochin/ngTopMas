import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ReporteSclService } from 'app/Servicios/reporte-scl.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-lista-reporte-historico',
  templateUrl: './lista-reporte-historico.component.html',
  styleUrls: ['./lista-reporte-historico.component.scss']
})
export class ListaReporteHistoricoComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;

  bsBuscar: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  buscar = this.bsBuscar.asObservable();

  @Output() regs: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Input() filtrado: any;

  encabezados = { ciudad: 'Ciudad', tienda: 'Tienda', campo1: 'Sabado1', campo2: 'Domingo1', campo3: 'Sabado2', campo4: 'Domingo2', campo5: 'Sabado3', campo6: 'Domingo3', campo7: 'Sabado4', campo8: 'Domingo4', campo9: 'Sabado5', campo10: 'Domingo5' };

  reporte_historico: any[] = [];

  paginacion = {
    page_number: 0,
    page_size: 10,
    page_size_options: [10],
    total_records: 0
  };

  constructor(
    private reporteSclService: ReporteSclService
  ) {
    this.buscar.subscribe((filtrado: any) => {
      if (filtrado != null || filtrado != undefined) {
        this.reporteSclService.reporteHistoricoMuestraEnPantalla(filtrado)
          .subscribe((response: any) => {
            this.paginacion.total_records = response.totalRecords;
            this.paginacion.page_number = response.currentPage;
            this.paginacion.page_size = response.resultsForPage;
            this.paginacion.page_size_options = [response.resultsForPage];
            this.reporte_historico = response.regs;
            this.regs.emit(this.reporte_historico);
            $('#bloqueador_tabla_reporte_historico').hide();
          }, () => {
            $('#bloqueador_tabla_reporte_historico').hide();
          }, () => {
            $('#bloqueador_tabla_reporte_historico').hide();
          });

      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#bloqueador_tabla_reporte_historico').hide();
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
  }

  buscarInfoReporteHistorico(nav: boolean = false) {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.anio = this.filtrado.anio;
    filtrado.mes = this.filtrado.mes;

    $('#bloqueador_tabla_reporte_historico').show();

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
      this.buscarInfoReporteHistorico(true);
      clearTimeout(wait);
    }, 0);
  }

  generarReporte() {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.anio = this.filtrado.anio;
    filtrado.mes = this.filtrado.mes;
    $('#bloqueador_tabla_reporte_historico').show();
    this.reporteSclService.reporteHistoricoPdf(filtrado).subscribe((res: any) => {
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
      $('#bloqueador_tabla_reporte_historico').hide();
    }, () => {
      $('#bloqueador_tabla_reporte_historico').hide();
    }, () => {
      $('#bloqueador_tabla_reporte_historico').hide();
    });
  }
}
