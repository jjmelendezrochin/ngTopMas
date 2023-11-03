import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { CatEmpresaService } from 'app/Servicios/cat-empresa.service';
import { GestionAjusteAcumuladoService } from 'app/Servicios/gestion-ajuste-acumulado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-ajuste-acumulado',
  templateUrl: './gestion-ajuste-acumulado.component.html',
  styleUrls: ['./gestion-ajuste-acumulado.component.scss'],
  providers: [
    DatePipe
  ]
})
export class GestionAjusteAcumuladoComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;

  @Output() buscar: EventEmitter<any> = new EventEmitter<any>();

  empresas: any[] = [];

  informacion_ajustes_acumulados: any[] = [];

  paginacion = {
    page_number: 0,
    page_size: 10,
    page_size_options: [10],
    total_records: 0
  };

  filtrado = {
    idempresa: '',
    fecha: '',
    ajuste_acumulado: ''
  }

  filtro_buscar = {
    page: 0,
    resultsForPage: '10'
  }

  constructor(
    private catempresaService: CatEmpresaService,
    private gestionAjusteAcumuladoService: GestionAjusteAcumuladoService,
    private toaster: ToastrService,
    private datePipe: DatePipe
  ) {
    this.catempresaService.getAllCatEmpresa().subscribe((gempresa: any[]) => {
      this.empresas = gempresa;
      // console.log("lista de empresas, ", this.empresas);
    });
    this.buscar.subscribe((filtrado: any) => {
      this.gestionAjusteAcumuladoService
        .ObtenerInformacionAjustesAcumulados(filtrado)
        .subscribe((response: any) => {

          this.paginacion.total_records = response.totalRecords;
          this.paginacion.page_number = response.currentPage;
          this.paginacion.page_size = response.resultsForPage;
          this.paginacion.page_size_options = [response.resultsForPage];
          this.informacion_ajustes_acumulados = response.regs;
          //console.log(response);
          $('#bloqueador_tabla_ac').hide();
          //    console.log(response.regs);
        });
    });

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#bloqueador_tabla_ac').hide();
    this.ObtenerInformacionAjustesAcumulados();
  }

  GuardarAjusteAcumulado() {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.fecha = this.datePipe.transform(this.filtrado.fecha, 'yyyy-MM-dd');
    this.gestionAjusteAcumuladoService.GuardarAjusteAcumulado(filtrado).subscribe((res: any) => {
      if (parseInt(res.idRes) == 0) {
        this.toaster.success(res.Mensaje, "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
        this.ObtenerInformacionAjustesAcumulados(false);
      } else {
        this.toaster.error(res.Mensaje, "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

  GenerarReporteAcumuladoMensualExcel() {
    let filtrado = Object.assign({ mes: '', anio: '' }, this.filtrado);
    filtrado.mes = this.datePipe.transform(this.filtrado.fecha, 'MM');
    filtrado.anio = this.datePipe.transform(this.filtrado.fecha, 'yyyy');

    $('#bloqueador_tabla_ac').show();

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

        $('#bloqueador_tabla_ac').hide();

        clearTimeout(wait);
      }, 0);
    });
  }

  ObtenerInformacionAjustesAcumulados(nav: boolean = false) {

    $('#bloqueador_tabla_ac').show();

    if (this.pag != null) {
      if (nav == false) {
        this.filtro_buscar.page = this.filtro_buscar.page = this.paginacion.page_number = 0;
        this.pag.firstPage();
        this.buscar.emit(this.filtro_buscar);
      } else {
        this.buscar.emit(this.filtro_buscar);
      }
    }
  }

  irAlaPagina(event: any) {
    let wait = setTimeout(() => {
      this.filtro_buscar.page = event.pageIndex + 1;
      this.ObtenerInformacionAjustesAcumulados(true);
      clearTimeout(wait);
    }, 0);
  }

}
