import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GestionAjusteAcumuladoService } from 'app/Servicios/gestion-ajuste-acumulado.service';
import { ReportePreciosXproductoMensualService } from 'app/Servicios/reporte-precios-xproducto-mensual.service';

declare var $: any;

@Component({
  selector: 'app-reporte-acumulado-mensual',
  templateUrl: './reporte-acumulado-mensual.component.html',
  styleUrls: ['./reporte-acumulado-mensual.component.scss']
})
export class ReporteAcumuladoMensualComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;

  @Output() buscar: EventEmitter<any> = new EventEmitter<any>();

  paginacion = {
    page_number: 0,
    page_size: 10,
    page_size_options: [10],
    total_records: 0
  };

  filtrado = {
    anio: 0,
    mes: '',
    idempresa: Number(localStorage.getItem('idempresa')),
    page: 0,
    resultsForPage: '10'
  };

  anios: any[] = [];
  meses: any[] = [];

  reporte_acumulado_mensual: any[] = [];

  constructor(
    private reporteService: ReportePreciosXproductoMensualService,
    private gestionAjusteAcumuladoService: GestionAjusteAcumuladoService
  ) { }

  ngOnInit() {
    for (let i = 2020; i <= 2050; i++) {
      this.anios.push({ anio: i });
    }
    this.reporteService.getCmbMesesservicios().subscribe((gmeses: any[]) => {
      this.meses = gmeses;
      this.filtrado.mes = `${new Date().getMonth() + 1}`;
      this.filtrado.anio = new Date().getFullYear();
      // console.log("Lista de meses: ", this.meses);
    });
    this.buscar.subscribe((filtrado: any) => {
      this.gestionAjusteAcumuladoService
        .consultarReporteAcumuladoMensual(filtrado)
        .subscribe((response: any) => {

          this.paginacion.total_records = response.totalRecords;
          this.paginacion.page_number = response.currentPage;
          this.paginacion.page_size = response.resultsForPage;
          this.paginacion.page_size_options = [response.resultsForPage];
          this.reporte_acumulado_mensual = response.regs;
          //console.log(response);
          $('#bloqueador_acumulado_mensual').hide();
          //    console.log(response.regs);
        });
    });

  }

  ngAfterViewInit(): void {
    $('#bloqueador_acumulado_mensual').hide();
  }

  consultarReporteAcumuladoMensual() {
    this.ConsultarReporteAcumuladoMensual(false);
  }

  ConsultarReporteAcumuladoMensual(nav: boolean = false) {

    $('#bloqueador_acumulado_mensual').show();

    if (this.pag != null) {
      if (nav == false) {
        this.filtrado.page = this.filtrado.page = this.paginacion.page_number = 0;
        this.pag.firstPage();
        this.buscar.emit(this.filtrado);
      } else {
        this.buscar.emit(this.filtrado);
      }
    }
  }

  irAlaPagina(event: any) {
    let wait = setTimeout(() => {
      this.filtrado.page = event.pageIndex + 1;
      this.ConsultarReporteAcumuladoMensual(true);
      clearTimeout(wait);
    }, 0);
  }

  generarReporteAcumuladoMensualExcel() {
    let filtrado = Object.assign({}, this.filtrado);

    $('#bloqueador_acumulado_mensual').show();

    this.gestionAjusteAcumuladoService.GenerarReporteAcumuladoMensualExcel(filtrado).subscribe((res: any) => {
      let wait = setTimeout(() => {

        if ((res.status as boolean) == true) {
          var $a = $("<a>");
          $a.attr("href", res.url);
          $("body").append($a);
          $a.attr("download", res.nombre_archivo);
          $a[0].click();
          $a.remove();
        }

        $('#bloqueador_acumulado_mensual').hide();

        clearTimeout(wait);
      }, 0);
    });
  }

}
