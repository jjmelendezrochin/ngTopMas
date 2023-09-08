import { AfterViewInit, Component, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { PromocionUltSerService } from "../Servicios/promocion-ult-ser.service";
import { CatcadenaService } from "../Servicios/catcadena.service";
import { catcadena } from "../Objetos/catcadena";
import { DatePipe } from "@angular/common";
import { MatCheckbox, MatPaginator } from "@angular/material";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { ExportarExcelService } from '../Servicios/exportar-excel.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: "app-promociones-ult-mod",
  templateUrl: "./promociones-ult-mod.component.html",
  styleUrls: ["./promociones-ult-mod.component.scss"],
  providers: [
    DatePipe
  ]
})
export class PromocionesUltModComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild('optAll', { static: false }) optAll: MatCheckbox;
  @ViewChildren('opt', { read: MatCheckbox }) opt: QueryList<MatCheckbox>;

  @Output() buscar: EventEmitter<any> = new EventEmitter<any>();

  url_zip: string = '';

  que: string = '';

  encabezados = { "foto_exhibicion": "Exhibición", "foto_competencia": "Competencia", "tienda": "Tienda", "producto": "Producto", "ciudad": "Ciudad", "fecha_para_info": "Fecha", "porparticipacion_con_signo_de_porciento": "% participación", "nofrentes": "No. Frentes", "conosinparticipacion": "Participación", "precio": "Precio", "comentarios": "Comentarios" };

  paginacion = {
    page_number: 0,
    page_size: 10,
    page_size_options: [10],
    total_records: 0
  };

  cadenas: any[] = [];

  competencias_promociones: any[] = [];

  idempresa: number = Number(localStorage.getItem("idempresa"));

  _seleccionarTodos: boolean = false;

  filtradofotos = {
    FechaInicial: "",
    FechaFinal: "",
    idcadena: "",
    idempresa: this.idempresa,
    page: 0,
    resultsForPage: '10'
  };

  constructor(
    private catcadenasService: CatcadenaService,
    private promocionService: PromocionUltSerService,
    private exportarExcel: ExportarExcelService,
    private datePipe: DatePipe,
    private toaster: ToastrService,
  ) {
    this.filtradofotos.FechaInicial = (new Date()).toISOString();
    this.filtradofotos.FechaFinal = (new Date()).toISOString();

    let wait = setInterval(() => {
      if ($('#campo_cadena').length > 0) {
        // console.log("ok");
        $('#campo_cadena').hide();
        clearInterval(wait);
      }
    }, 1);

    this.catcadenasService
      .getcadenaservicios(this.idempresa)
      .subscribe((gcadenas: catcadena[]) => {
        this.cadenas = gcadenas;
        $('#campo_cadena').show();
        // console.log("lista de cadenas, ", this.cadenas);
      });

    this.buscar.subscribe((filtradofotos: any) => {
      this.promocionService
        .buscarPromociones(filtradofotos)
        .subscribe((response: any) => {

          this.paginacion.total_records = response.totalRecords;
          this.paginacion.page_number = response.currentPage;
          this.paginacion.page_size = response.resultsForPage;
          this.paginacion.page_size_options = [response.resultsForPage];
          this.competencias_promociones = response.regs;
          this.promocionService.desactiva_todos_los_generar_ppt_en_bloque(this.filtradofotos).subscribe((response1: any) => {
            //console.log(response);
            this._seleccionarTodos = response1.marcar_todos;
            $('#bloqueador_tabla_competencias_promociones').hide();
            //    console.log(response.regs);
          });
        });
    });

  }

  ngOnInit() { }


  ngAfterViewInit(): void {
    $('#bloqueador_tabla_competencias_promociones').hide();
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
  }


  buscarPromociones(nav: boolean = false) {
    let filtradofotos = Object.assign({}, this.filtradofotos);
    filtradofotos.FechaInicial = this.datePipe.transform(this.filtradofotos.FechaInicial, 'yyyy-MM-dd');
    filtradofotos.FechaFinal = this.datePipe.transform(this.filtradofotos.FechaFinal, 'yyyy-MM-dd');

    $('#bloqueador_tabla_competencias_promociones').show();

    if (this.pag != null) {
      if (nav == false) {
        filtradofotos.page = this.filtradofotos.page = this.paginacion.page_number = 0;
        this.pag.firstPage();
        this.promocionService.desactiva_todos_los_genera_ppt(filtradofotos).subscribe(() => {
          this.buscar.emit(filtradofotos);
        });
      } else {
        this.buscar.emit(filtradofotos);
      }
    }
  }

  activa_desactiva_generar_ppt(cp: any) {
    let filtradofotos = Object.assign({}, this.filtradofotos);
    filtradofotos.FechaInicial = this.datePipe.transform(this.filtradofotos.FechaInicial, 'yyyy-MM-dd');
    filtradofotos.FechaFinal = this.datePipe.transform(this.filtradofotos.FechaFinal, 'yyyy-MM-dd');
    $('#bloqueador_tabla_competencias_promociones').show();
    let _cp = Object.assign({}, cp);
    _cp.generar_ppt = (cp.generar_ppt == true) ? 1 : 0;
    this.promocionService.activa_desactiva_generar_ppt(cp).subscribe(() => {
      this.promocionService.desactiva_todos_los_generar_ppt_en_bloque(this.filtradofotos).subscribe((response: any) => {
        this._seleccionarTodos = response.marcar_todos;
        //console.log(this._seleccionarTodos);
        $('#bloqueador_tabla_competencias_promociones').hide();
      });
    });
  }

  irAlaPagina(event: any) {
    let wait = setTimeout(() => {
      this.filtradofotos.page = event.pageIndex + 1;
      this.buscarPromociones(true);
      clearTimeout(wait);
    }, 0);
  }

  descargarZIPPPTS() {
    let filtradofotos = Object.assign({}, this.filtradofotos);
    filtradofotos.FechaInicial = this.datePipe.transform(this.filtradofotos.FechaInicial, 'yyyy-MM-dd');
    filtradofotos.FechaFinal = this.datePipe.transform(this.filtradofotos.FechaFinal, 'yyyy-MM-dd');

    $('#bloqueador_tabla_competencias_promociones').show();

    this.url_zip = '';

    this.promocionService.generarPptYZip(filtradofotos).subscribe((response: any) => {
      if (parseInt(response.idRes) == 0) {
        this.url_zip = response.url;
        this.que = 'presentaciones';
        $('#bloqueador_tabla_competencias_promociones').hide();
        /* this.promocionService.descargarZip(response.url).subscribe((response1: HttpEvent<any>) => {

          if (response1.type == HttpEventType.Response) {

            // Descarga completada
            const blob: Blob = response1.body;
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = response.nombre_zip; // Nombre del archivo ZIP al descargar
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            this.promocionService.eliminarCarpetaYZipPpt(response.ruta_fisica_carpeta, response.ruta_fisica_zip).subscribe((response2: any) => {
              $('#bloqueador_tabla_competencias_promociones').hide();
            });

          }
        });*/
      } else {
        this.toaster.warning(response.Mensaje, "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
        $('#bloqueador_tabla_competencias_promociones').hide();
      }
    });
  }

  descargarExcel() {

    $('#bloqueador_tabla_competencias_promociones').show();

    let filtradofotos = Object.assign({}, this.filtradofotos);
    filtradofotos.resultsForPage = '';
    filtradofotos.FechaInicial = this.datePipe.transform(this.filtradofotos.FechaInicial, 'yyyy-MM-dd');
    filtradofotos.FechaFinal = this.datePipe.transform(this.filtradofotos.FechaFinal, 'yyyy-MM-dd');

    this.promocionService
      .buscarPromociones(filtradofotos)
      .subscribe((response: any) => {
        this.exportarExcel.nombreArchivo = 'competencia_promocion';
        this.exportarExcel.exportarExcel(response.regs, this.encabezados);
        $('#bloqueador_tabla_competencias_promociones').hide();
      });
  }

  descargarZipFotos() {
    let filtradofotos = Object.assign({}, this.filtradofotos);
    filtradofotos.FechaInicial = this.datePipe.transform(this.filtradofotos.FechaInicial, 'yyyy-MM-dd');
    filtradofotos.FechaFinal = this.datePipe.transform(this.filtradofotos.FechaFinal, 'yyyy-MM-dd');

    $('#bloqueador_tabla_competencias_promociones').show();

    this.url_zip = '';

    this.promocionService.generarCarpetaConFotosYZip(filtradofotos).subscribe((response: any) => {
      if (parseInt(response.idRes) == 0) {
        this.url_zip = response.url;
        this.que = 'fotos';
        $('#bloqueador_tabla_competencias_promociones').hide();
        /*
        this.promocionService.descargarZip(response.url).subscribe((response1: HttpEvent<any>) => {

          if (response1.type == HttpEventType.Response) {

            // Descarga completada
            const blob: Blob = response1.body;
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = response.nombre_zip; // Nombre del archivo ZIP al descargar
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            this.promocionService.eliminarCarpetaYZipPpt(response.ruta_fisica_carpeta, response.ruta_fisica_zip).subscribe((response2: any) => {
              $('#bloqueador_tabla_competencias_promociones').hide();
            });
          }
        });*/
      } else {
        this.toaster.warning(response.Mensaje, "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
        $('#bloqueador_tabla_competencias_promociones').hide();
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

  seleccionarTodos(event: any) {
    let filtradofotos: any = Object.assign({}, this.filtradofotos);
    filtradofotos.FechaInicial = this.datePipe.transform(this.filtradofotos.FechaInicial, 'yyyy-MM-dd');
    filtradofotos.FechaFinal = this.datePipe.transform(this.filtradofotos.FechaFinal, 'yyyy-MM-dd');
    filtradofotos.generar_ppt = event.checked;
    $('#bloqueador_tabla_competencias_promociones').show();
    this.promocionService.activa_desactiva_todos_los_generar_ppt_en_bloque(filtradofotos).subscribe(() => {
      this.buscar.emit(filtradofotos);
    });
  }

  seleccionar(cp: any) {
    this.activa_desactiva_generar_ppt(cp);
  }

}
