import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { IncidenciasService } from 'app/Servicios/incidencias.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.scss'],
  providers: [
    DatePipe
  ]
})
export class IncidenciasComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;

  bsBuscar: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  buscar = this.bsBuscar.asObservable();


  fecha = new Date().toISOString();

  idempresa: number = Number(localStorage.getItem('idempresa'));

  incidencias: any[] = [];

  filtrado = {
    fechainicial: this.fecha,
    fechafinal: this.fecha,
    idEmpresa: this.idempresa,
    page: 0,
    resultsForPage: '10'
  };


  paginacion = {
    page_number: 0,
    page_size: 10,
    page_size_options: [10],
    total_records: 0
  };

  constructor(
    private incidenciasService: IncidenciasService,
    private datePipe: DatePipe,
    private toaster: ToastrService
  ) {
    this.buscar.subscribe((filtrado: any) => {
      if (filtrado != null || filtrado != undefined) {
        this.incidenciasService.muestraIncidencias(filtrado, this.datePipe.transform(filtrado.fechainicial, 'yyyy-MM-dd HH:mm:ss'), this.datePipe.transform(filtrado.fechafinal, 'yyyy-MM-dd HH:mm:ss'))
          .subscribe((response: any) => {
            this.paginacion.total_records = response.totalRecords;
            this.paginacion.page_number = response.currentPage;
            this.paginacion.page_size = response.resultsForPage;
            this.paginacion.page_size_options = [response.resultsForPage];
            this.incidencias = response.regs;

            $('#bloqueador_tabla_incidencias').hide();
          }, () => {
            $('#bloqueador_tabla_incidencias').hide();
          }, () => {
            $('#bloqueador_tabla_incidencias').hide();
          });

      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#bloqueador_tabla_incidencias').hide();
    this.bsBuscar.next(this.filtrado);
  }

  buscarIncidencias(nav: boolean = false) {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.fechainicial = this.filtrado.fechainicial;
    filtrado.fechafinal = this.filtrado.fechafinal;

    $('#bloqueador_tabla_incidencias').show();

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
      this.buscarIncidencias(true);
      clearTimeout(wait);
    }, 0);
  }

  darRespuesta(item: any) {
    this.incidenciasService.darRespuesta(item).subscribe((response: any) => {
      if (parseInt(response.idRes) == 0) {
        this.toaster.success(response.Mensaje, "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
        this.bsBuscar.next(this.filtrado);
      } else {
        this.toaster.error(response.Mensaje, "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }


  abrirVentanaModal(foto: string): void {
    $('#ventanaImagenes').on("shown.bs.modal", function () {
      $("#imagen").attr("src", foto);
    });
    $('#ventanaImagenes').on("hidden.bs.modal", function () {
      $("#imagen").removeAttr("src");
    });
    $('#ventanaImagenes').modal('show');
  }

}
