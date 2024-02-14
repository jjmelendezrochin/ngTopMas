import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CatZonasService } from 'app/Servicios/cat-zonas.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/user.service';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { usuario } from 'app/Objetos/usuario';
import { Paginacion } from 'app/Objetos/paginacion';
import { CatZonas } from 'app/Objetos/catzonas';
import { MatPaginator } from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-cat-zonas',
  templateUrl: './cat-zonas.component.html',
  styleUrls: ['./cat-zonas.component.scss']
})
export class CatZonasComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild("tabla_zonas", { static: false }) tabla_zonas: ElementRef;
  encabezados = { "letrazona": "Letra de Zona", "descripcion": "Descripción", "estados": "Estados", "uda": "Uda", "fda_m": "Fda", "udc": "Udc", "fdc_m": "Fdc", "estatus": "Estatus" };
  selected: number;
  usr: usuario;
  paginacion: Paginacion = new Paginacion();
  zonas: CatZonas[];
  noPermitido = true;
  cadena: string;
  selectedCatZona: CatZonas = { idzona: null, letrazona: null, descripcion: null, estados: null, uda: null, uda_c: null, fda: null, fda_m: null, udc: null, fdc: null, fdc_m: null, idestatus: null, estatus: null };

  constructor(
    private zonasservice: CatZonasService,
    private toaster: ToastrService,
    private userService: UserService,
    private exportarExcel: ExportarExcelService
  ) {
    this.usr = this.userService.getUserLoggedIn();
  }

  ngOnInit() {
    if (this.usr.idperfil == 1) {
      this.noPermitido = false;
    }
    this.exportarExcel.nombreArchivo = "zonas";
    this.zonasservice.getZonasservicios(/*this.idempresa*/).subscribe((gzonas: CatZonas[]) => {
      this.zonas = gzonas;
      $('#bloqueador_zonas').hide();
      // console.log("lista de zonas, ", this.zonas);
    });
  }

  ngAfterViewInit() {

    $('#bloqueador_zonas').show();

    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
  }

  /* Seccion de interaccion con base de datos*/
  createOrUpdateCatZona(form) {
    if (this.selectedCatZona && this.selectedCatZona.idzona) {
      form.value.idzona = this.selectedCatZona.idzona;
      this.zonasservice.updateZonaServicios(form.value).subscribe((catzona: CatZonas) => {
        // console.log("CatZona updated", catzona);
        this.toaster.success("Dato guardado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 2000);

      });
    } else {
      if (form.value.letrazona != null && form.value.descripcion != null && form.value.estados != null) {
        this.zonasservice.createZonaServicios(form.value).subscribe((catzona: CatZonas) => {
          // console.log("CatZona created, ", catzona);
          console.log('id', catzona.idzona);
          this.toaster.success("Dato creado", "", {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          });

          setTimeout(function () {
            window.location.reload();
          }.bind(this), 2000);
        });
      }
      else {
        this.toaster.warning("Debe colocar un valor al guardar", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
        //alert('Debe colocar un valor al guardar');
      }
    }
  }

  selectCatZona(catzona: CatZonas, estatus = 0) {
    this.selectedCatZona = catzona;
    if (estatus == 0) {
      this.selectedCatZona.uda_c = this.usr.usuario;
    }
  }

  selectNewCatZona() {
    this.selectedCatZona = { idzona: null, letrazona: null, descripcion: null, estados: null, uda: this.usr.usuario, uda_c: this.usr.usuario, fda: null, fda_m: null, udc: this.usr.usuario, fdc: null, fdc_m: null, idestatus: null, estatus: null };
  }

  deleteCatZona(id) {
    if (confirm("¿Seguro de borrar este dato?")) {
      this.zonasservice.deleteZonaServicios(id).subscribe((catzona: CatZonas) => {
        // console.log("Policy deleted, ", catzona);
      });
      this.toaster.success("Dato borrado", "", {
        timeOut: 1000,
        positionClass: 'toast-bottom-center'
      });



      setTimeout(function () {
        window.location.reload();
      }.bind(this), 2000);
    }
  }

  findCatZona(cadena: string, orden: number) {
    $('#bloqueador_zonas').show();
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    this.zonasservice.getzonasserviciosPorLZDesc(cadena, orden).subscribe((gzonas: CatZonas[]) => {
      this.zonas = gzonas;
      $('#bloqueador_zonas').hide();
      // console.log("lista de zonas, ", this.zonas);
    });
  }

  /* Seccion de eventos de Tabs */
  getSelectedTab(index) {
    switch (index) {
      case 0: return 0;
      case 1: return 1;
      default: return -1;
    }
  }

  setSelectedTab(tab) {
    $('a[href="#' + tab + '"]').tab('show');
  }

  tabClick(clickEvent: any) {

    // Coloca el indece seleccionado
    const clickedTabIndex = this.getSelectedTab(clickEvent);

    // Si no se ha echo click en ningun elemento, no se hace nada
    if (clickedTabIndex === -1) {
      return;
    }

    this.selected = clickedTabIndex;


    if (!(this.selected === clickedTabIndex)) {

      this.selected = clickedTabIndex;
    }
  }

  /* Seccion de evento de seach*/

  changeText(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if (event.target) {
      if (event.keyCode == 13) {
        this.search(0);
      }
      else {
        this.cadena = value;
      }
    }
  }

  search(orden: number) {
    if (this.cadena == null || this.cadena == '') {
      this.cadena = ' ';
    }
    this.findCatZona(this.cadena.trim(), orden);
  }

}
