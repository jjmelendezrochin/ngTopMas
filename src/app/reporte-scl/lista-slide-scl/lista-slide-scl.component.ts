import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ReporteSclService } from 'app/Servicios/reporte-scl.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-lista-slide-scl',
  templateUrl: './lista-slide-scl.component.html',
  styleUrls: ['./lista-slide-scl.component.scss'],
  providers: [
    DatePipe
  ]
})
export class ListaSlideSclComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;

  bsBuscar: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  buscar = this.bsBuscar.asObservable();

  @Output() regs: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Input() filtrado: any;

  _seleccionarTodos: boolean = false;

  info_slide: any[] = [];

  paginacion = {
    page_number: 0,
    page_size: 10,
    page_size_options: [10],
    total_records: 0
  };

  constructor(
    private datePipe: DatePipe,
    private toaster: ToastrService,
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
            this.reporteSclService.desactiva_todos_los_generar_slides_en_bloque(this.filtrado).subscribe((response1: any) => {
              this._seleccionarTodos = response1.marcar_todos;
              this.regs.emit(this.info_slide);
              $('#bloqueador_tabla_info_slide').hide();
            }, () => {
              $('#bloqueador_tabla_info_slide').hide();
            }, () => {
              $('#bloqueador_tabla_info_slide').hide();
            });
          }, () => {
            $('#bloqueador_tabla_info_slide').hide();
          }, () => {
            $('#bloqueador_tabla_info_slide').hide();
          });
      }
    }, () => {
      $('#bloqueador_tabla_info_slide').hide();
    }, () => {
      $('#bloqueador_tabla_info_slide').hide();
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
        this.reporteSclService.desactiva_todos_los_genera_slide(filtrado).subscribe(() => {
          this.bsBuscar.next(filtrado);
        });
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
      if (parseInt(res.idRes) == 0) {
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
        });
      } else {
        this.toaster.warning(res.Mensaje, "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      }
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

  activa_desactiva_generar_slide(s: any) {
    let filtrado = Object.assign({}, this.filtrado);
    filtrado.fechainicial = this.datePipe.transform(this.filtrado.fechainicial, 'yyyy-MM-dd');
    filtrado.fechafinal = this.datePipe.transform(this.filtrado.fechafinal, 'yyyy-MM-dd');
    $('#bloqueador_tabla_info_slide').show();
    let _s = Object.assign({}, s);
    _s.generar_slide = (s.generar_slide == true) ? 1 : 0;
    this.reporteSclService.activa_desactiva_generar_slide(s).subscribe(() => {
      this.reporteSclService.desactiva_todos_los_generar_slides_en_bloque(filtrado).subscribe((response: any) => {
        this._seleccionarTodos = response.marcar_todos;
        //console.log(this._seleccionarTodos);
        $('#bloqueador_tabla_info_slide').hide();
      }, () => {
        $('#bloqueador_tabla_info_slide').hide();
      }, () => {
        $('#bloqueador_tabla_info_slide').hide();
      });
    }, () => {
      $('#bloqueador_tabla_info_slide').hide();
    }, () => {
      $('#bloqueador_tabla_info_slide').hide();
    });
  }

  seleccionarTodos(event: any) {
    let filtrado: any = Object.assign({}, this.filtrado);
    filtrado.fechainicial = this.datePipe.transform(this.filtrado.fechainicial, 'yyyy-MM-dd');
    filtrado.fechafinal = this.datePipe.transform(this.filtrado.fechafinal, 'yyyy-MM-dd');
    filtrado.generar_slide = event.checked;
    $('#bloqueador_tabla_info_slide').show();
    this.reporteSclService.activa_desactiva_generar_slides_en_bloque(filtrado).subscribe(() => {
      this.bsBuscar.next(filtrado);
    }, () => {
      $('#bloqueador_tabla_info_slide').hide();
    }, () => {
      $('#bloqueador_tabla_info_slide').hide();
    });
  }

  seleccionar(s: any) {
    this.activa_desactiva_generar_slide(s);
  }

}
