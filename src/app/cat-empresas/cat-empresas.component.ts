import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Paginacion } from 'app/Objetos/paginacion';
import { usuario } from 'app/Objetos/usuario';
import { CatEmpresasService } from 'app/Servicios/cat-empresas.service';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { UserService } from 'app/user.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-cat-empresas',
  templateUrl: './cat-empresas.component.html',
  styleUrls: ['./cat-empresas.component.scss']
})
export class CatEmpresasComponent implements OnInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild("tabla_empresas", { static: false }) tabla_zonas: ElementRef;
  encabezados = { "nombreempresa": "Nombre empresa", "contacto": "Contacto", "uda": "Uda", "fda_m": "Fda", "udc": "Udc", "fdc_m": "Fdc", "estatus": "Estatus" };
  selected: number;
  usr: usuario;
  paginacion: Paginacion = new Paginacion();
  empresas: any[];
  configuracion: any[];
  noPermitido = true;
  nombre_empresa: string;
  selectedCatEmpresa: any = { idempresa: null, nombreempresa: null, contacto: null, uda: null, uda_c: null, fda: null, fda_m: null, udc: null, fdc: null, fdc_m: null, idestatus: null, estatus: null, alias: null };
  idempresa : number = Number(localStorage.getItem('idempresa'));

  constructor(
    private empresasservice: CatEmpresasService,
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
    this.exportarExcel.nombreArchivo = "empresas";
    this.empresasservice.getEmpresasservicios(/*this.idempresa*/).subscribe((gempresas: any[]) => {
      this.empresas = gempresas;
      // console.log("lista de empresas, ", this.empresas);
    });
    this.empresasservice.getConfigServicios().subscribe((gconfig: any[]) => {
      this.configuracion = gconfig;
      // console.log("configuración, ", this.configuracion);
    });

  }

  ngAfterViewInit() {
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
  }

  /* Seccion de interaccion con base de datos*/
  createOrUpdateCatEmpresa(form) {
    if (this.selectedCatEmpresa && this.selectedCatEmpresa.idempresa) {
      form.value.idempresa = this.selectedCatEmpresa.idempresa;
      this.empresasservice.updateEmpresaServicios(form.value).subscribe((catempresa: any) => {
        // console.log("CatEmpresa updated", catempresa);
        this.toaster.success("Dato guardado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 2000);

      });
    } else {
      if (form.value.nombreempresa != null && form.value.contacto != null && form.value.alias != null) {
        this.empresasservice.createEmpresaServicios(form.value).subscribe((catempresa: any) => {
          // console.log("CatEmpresa created, ", catempresa);
          console.log('id', catempresa.idempresa);
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

  selectCatEmpresa(catempresa: any, estatus = 0) {
    this.selectedCatEmpresa = catempresa;
    if (estatus == 0) {
      this.selectedCatEmpresa.uda_c = this.usr.usuario;
    }
  }

  selectNewCatEmpresa() {
    this.selectedCatEmpresa = { idempresa: null, nombreempresa: null, contacto: null, uda: this.usr.usuario, uda_c: this.usr.usuario, fda: null, fda_m: null, udc: this.usr.usuario, fdc: null, fdc_m: null, idestatus: null, estatus: null, alias: null };
  }

  deleteCatEmpresa(id) {
    if (confirm("¿Seguro de borrar este dato?")) {
      this.empresasservice.deleteEmpresaServicios(id).subscribe((catempresa: any) => {
        // console.log("Policy deleted, ", catempresa);
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

  findCatEmpresa(nombreempresa: string, orden: number) {
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    this.empresasservice.getEmpresasserviciosPorNombre(nombreempresa, orden).subscribe((gempresas: any[]) => {
      this.empresas = gempresas;
      // console.log("lista de empresas, ", this.empresas);
    });
  }

  /* Seccion de eventos de Tabs */
  getSelectedTab(index) {
    switch (index) {
      case 0: return 0;
      case 1: return 1;
      case 2: return 2;
      default: return -1;
    }
  }

  setSelectedTab(index) {
    this.selected = index;
  }

  tabClick(clickEvent: any) {

    // Coloca el indece seleccionado
    const clickedTabIndex = this.getSelectedTab(clickEvent);

    // Si no se ha echo click en ningun elemento, no se hace nada
    if (clickedTabIndex === -1) {
      return;
    }


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
        this.nombre_empresa = value;
      }
    }
  }

  search(orden: number) {
    if (this.nombre_empresa == null || this.nombre_empresa == '') {
      this.nombre_empresa = ' ';
    }
    this.findCatEmpresa(this.nombre_empresa.trim(), orden);
  }

  createConfig(id: string, idconfig: number) {
    let valor = $(`#${id}`).val();
    this.empresasservice.updateConfigServicios(idconfig, valor).subscribe((gconfig: any) => {
      // console.log("Config updated", gconfig);
      this.toaster.success("Dato guardado", "", {
        timeOut: 1000,
        positionClass: 'toast-bottom-center'
      });
    });
  }

}
