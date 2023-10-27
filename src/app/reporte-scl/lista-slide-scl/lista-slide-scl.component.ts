import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ReporteSclService } from 'app/Servicios/reporte-scl.service';
import { BehaviorSubject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-lista-slide-scl',
  templateUrl: './lista-slide-scl.component.html',
  styleUrls: ['./lista-slide-scl.component.scss']
})
export class ListaSlideSclComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;

  bsBuscar: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  buscar = this.bsBuscar.asObservable();

  @Input() filtrado: any;

  info_slide: any[] = [];

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
        this.reporteSclService.infoSlideMuestraEnPantalla(filtrado)
          .subscribe((response: any) => {
            this.paginacion.total_records = response.totalRecords;
            this.paginacion.page_number = response.currentPage;
            this.paginacion.page_size = response.resultsForPage;
            this.paginacion.page_size_options = [response.resultsForPage];
            this.info_slide = response.regs;
            $('#bloqueador_tabla_info_slide').hide();
          }, () => {
            $('#bloqueador_tabla_info_slide').hide();
          }, () => {
            $('#bloqueador_tabla_info_slide').hide();
          });
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#bloqueador_tabla_info_slide').hide();
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
  }

  buscarInfoSlide(nav: boolean = false) {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.anio = this.filtrado.anio;
    filtrado.mes = this.filtrado.mes;

    $('#bloqueador_tabla_info_slide').show();

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
      this.buscarInfoSlide(true);
      clearTimeout(wait);
    }, 0);
  }

  generarSlide() {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.anio = this.filtrado.anio;
    filtrado.mes = this.filtrado.mes;
    $('#bloqueador_tabla_info_slide').show();
    this.reporteSclService.generarSlide(filtrado).subscribe((res: any) => {
      this.reporteSclService.descargarZipSlide(res.url).subscribe((res1: HttpEvent<any>) => {

        if (res1.type == HttpEventType.Response) {

          // Descarga completada
          const blob: Blob = res1.body;
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = res.nombre_zip; // Nombre del archivo ZIP al descargar
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          this.reporteSclService.eliminarCarpetaYZipPptSlide(res.ruta_fisica_carpeta, res.ruta_fisica_zip).subscribe((response2: any) => {
            $('#bloqueador_tabla_competencias_promociones').hide();
          });
        }
      });
      if ((res.status as boolean) == true) {
        var $a = $("<a>");
        $a.attr("href", res.url);
        $("body").append($a);
        $a.attr("download", res.nombre_zip);
        $a[0].click();
        $a.remove();
      }

      $('#bloqueador_tabla_info_slide').hide();
    }, () => {
      $('#bloqueador_tabla_info_slide').hide();
    }, () => {
      $('#bloqueador_tabla_info_slide').hide();
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
