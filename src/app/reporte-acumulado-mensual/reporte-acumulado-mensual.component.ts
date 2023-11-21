import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GestionAjusteAcumuladoService } from 'app/Servicios/gestion-ajuste-acumulado.service';

declare var $: any;

@Component({
  selector: 'app-reporte-acumulado-mensual',
  templateUrl: './reporte-acumulado-mensual.component.html',
  styleUrls: ['./reporte-acumulado-mensual.component.scss'],
  providers: [
    DatePipe
  ]
})
export class ReporteAcumuladoMensualComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;

  @Output() buscar: EventEmitter<any> = new EventEmitter<any>();

  tipo: string = '';

  procesa: boolean = false;

  paginacion = {
    page_number: 0,
    page_size: 10,
    page_size_options: [10],
    total_records: 0
  };

  filtrado = {
    fechainicial: '',
    fechafinal: '',
    idempresa: Number(localStorage.getItem('idempresa')),
    page: 0,
    resultsForPage: '10'
  };

  reporte_acumulado_mensual: any[] = [];

  constructor(
    private gestionAjusteAcumuladoService: GestionAjusteAcumuladoService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {

    let hoy = new Date();
    this.ajustarRangoDeFechas(hoy);

    this.buscar.subscribe((filtrado: any) => {
      let _filtrado = Object.assign({}, filtrado);
      _filtrado.fechainicial = this.datePipe.transform(filtrado.fechainicial, 'yyyy-MM-dd');
      _filtrado.fechafinal = this.datePipe.transform(filtrado.fechafinal, 'yyyy-MM-dd');
      this.gestionAjusteAcumuladoService
        .consultarReporteAcumuladoSemanalOMensual(_filtrado)
        .subscribe((response: any) => {

          this.paginacion.total_records = response.totalRecords;
          this.paginacion.page_number = response.currentPage;
          this.paginacion.page_size = response.resultsForPage;
          this.paginacion.page_size_options = [response.resultsForPage];
          this.reporte_acumulado_mensual = response.regs;
          //console.log(response);
          $('#bloqueador_acumulado_semanal_o_mensual').hide();
          //    console.log(response.regs);
        });
    });

  }

  ngAfterViewInit(): void {
    $('#bloqueador_acumulado_semanal_o_mensual').hide();
  }

  consultarReporteAcumuladoSemanalOMensual() {
    this.ConsultarReporteAcumuladoSemanalOMensual(false);
  }

  ConsultarReporteAcumuladoSemanalOMensual(nav: boolean = false) {

    $('#bloqueador_acumulado_semanal_o_mensual').show();

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
      this.ConsultarReporteAcumuladoSemanalOMensual(true);
      clearTimeout(wait);
    }, 0);
  }

  generarReporteAcumuladoSemanalOMensualExcel() {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.fechainicial = this.datePipe.transform(filtrado.fechainicial, 'yyyy-MM-dd');
    filtrado.fechafinal = this.datePipe.transform(filtrado.fechafinal, 'yyyy-MM-dd');

    $('#bloqueador_acumulado_semanal_o_mensual').show();

    this.gestionAjusteAcumuladoService.GenerarReporteAcumuladoSemanalOMensualExcel(filtrado).subscribe((res: any) => {
      let wait = setTimeout(() => {

        if ((res.status as boolean) == true) {
          var $a = $("<a>");
          $a.attr("href", res.url);
          $("body").append($a);
          $a.attr("download", res.nombre_archivo);
          $a[0].click();
          $a.remove();
        }

        $('#bloqueador_acumulado_semanal_o_mensual').hide();

        clearTimeout(wait);
      }, 0);
    });
  }

  private ajustarRangoDeFechas(fecha: Date) {
    let _fecha = new Date(fecha);
    switch (this.filtrado.idempresa.toString().trim()) {
      case '2':
        this.tipo = 'semanal';
        this.procesa = true;
        let filtrado = Object.assign({}, this.filtrado);
        filtrado.fechainicial = this.datePipe.transform(_fecha, 'yyyy-MM-dd');
        this.gestionAjusteAcumuladoService.rango_fechas_semanal(filtrado).subscribe((res: any) => {
          this.filtrado.fechainicial = new Date(res.fecha_inicial).toISOString();
          this.filtrado.fechafinal = new Date(res.fecha_final).toISOString();
          this.procesa = false;
        });
        break;
      default:
        this.tipo = 'mensual';
        _fecha = new Date(fecha);
        let primerDiaDelMes = new Date(_fecha.getFullYear(), _fecha.getMonth(), 1);
        let ultimoDiaDelMes = new Date(_fecha.getFullYear(), _fecha.getMonth() + 1, 0);
        this.filtrado.fechainicial = (primerDiaDelMes).toISOString();
        this.filtrado.fechafinal = (ultimoDiaDelMes).toISOString();
        break;
    }
  }

  ajustarCamposDeFechas(event: any) {
    /*let wait = setTimeout(() => {
      this.ajustarRangoDeFechas(new Date(this.datePipe.transform(new Date(event.value), 'yyyy-MM-dd')));
      clearTimeout(wait);
    }, 0);*/
  }

}
