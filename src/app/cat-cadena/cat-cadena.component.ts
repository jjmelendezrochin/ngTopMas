import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CatcadenaService } from '../Servicios/catcadena.service';
import { catcadena } from '../Objetos/catcadena';
import { CatEmpresaService } from '../Servicios/cat-empresa.service';
import { CatEmpresa } from '../Objetos/catempresa';
import { usuario } from '../Objetos/usuario';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Paginacion } from '../Objetos/paginacion';
import { ExportarExcelService } from '../Servicios/exportar-excel.service';
import { MatPaginator } from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-cat-cadena',
  templateUrl: './cat-cadena.component.html',
  styleUrls: ['./cat-cadena.component.scss']
})
export class CatCadenaComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild('pag1', { static: false }) pag1: MatPaginator;
  @ViewChild("tabla_cadenas", { static: false }) tabla_cadenas: ElementRef;
  encabezados = { "nombreempresa": "Empresa", "nombrecorto": "Nombre corto", "cadena": "Cadena", "uda": "Uda", "fda_m": "Fda", "udc": "Udc", "fdc_m": "Fdc", "estatus": "Estatus" };
  selected: number;
  usr: usuario;
  paginacion: Paginacion = new Paginacion();
  paginacion1: Paginacion = new Paginacion();
  cad: catcadena[];
  empresas: CatEmpresa[];
  tiendasPorCadena: any[];
  idempresa: number = Number(localStorage.getItem('idempresa'));
  noPermitido = true;
  cadena: string;
  //selectedCatCadena: catcadena = { idcadena: null, idempresa: null, cadena: null, uda: null, uda_c: null, fda: null, udc: null, fdc: null, idestatus: null, estatus: null, btn_estilo: null, nombreempresa: null };
  selectedCatCadena: catcadena = { idcadena: null, idempresa: null, nombrecorto: null, cadena: null, uda: null, uda_c: null, fda: null, fda_m: null, udc: null, fdc: null, fdc_m: null, idestatus: null, estatus: null, btn_estilo: null, nombreempresa: null };

  constructor(
    private cadcadenaservice: CatcadenaService,
    private catempresaService: CatEmpresaService,
    private toaster: ToastrService,
    private userService: UserService,
    private exportarExcel: ExportarExcelService
  ) {
    this.usr = this.userService.getUserLoggedIn();
  }

  ngOnInit() {
    //    this.idempresa=1;
    if (this.usr.idperfil == 1) {
      this.noPermitido = false;
    }
    this.exportarExcel.nombreArchivo = "cadenas";
    this.cadcadenaservice.getcadenaservicios(this.idempresa).subscribe((gpocadena: catcadena[]) => {
      this.cad = gpocadena;
      $('#bloqueador_cadena').hide();
      // console.log("lista de cadenas, ", this.cad);
    });
    this.catempresaService.getCatEmpresa(this.idempresa).subscribe((gempresa: CatEmpresa[]) => {
      this.empresas = gempresa;
      // console.log("lista de empresas, ", this.empresas);
    });
  }

  ngAfterViewInit() {
    $('#bloqueador_cadena').show();
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
  }

  /* Seccion de interaccion con base de datos*/
  createOrUpdateCatCadena(form) {
    if (this.selectedCatCadena && this.selectedCatCadena.idcadena) {
      form.value.idcadena = this.selectedCatCadena.idcadena;
      this.cadcadenaservice.updateCadenaServicios(form.value).subscribe((catcadena: catcadena) => {
        // console.log("CatCadena updated", catcadena);
        this.toaster.success("Dato guardado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 2000);

      });
    } else {
      if (form.value.idEmpresa != null && form.value.cadena != null) {
        this.cadcadenaservice.createCadenaServicios(form.value).subscribe((catcadena: catcadena) => {
          // console.log("CatCadena created, ", catcadena);
          console.log('id', catcadena.idcadena);
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

  selectCatCadena(catcadena: catcadena, estatus = 0) {
    this.selectedCatCadena = catcadena;
    if (estatus == 0) {
      this.selectedCatCadena.uda_c = this.usr.usuario;
    } else if (estatus == 1) {
      if (this.selectedCatCadena.idestatus == 0) {
        this.selectedCatCadena.idestatus = 1;
        this.selectedCatCadena.estatus = "Activo";
        this.selectedCatCadena.btn_estilo = "a_estatus";
      } else if (this.selectedCatCadena.idestatus == 1) {
        this.selectedCatCadena.idestatus = 0;
        this.selectedCatCadena.estatus = "Inactivo";
        this.selectedCatCadena.btn_estilo = "i_estatus";
      }
      this.cadcadenaservice.updateEstatusCadenaServicios(this.selectedCatCadena).subscribe((catcadena: catcadena) => {
        // console.log("Estatus CatCadena updated", catcadena);
        this.toaster.success("Dato guardado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
      });
    }
    //var f = new Date();
    //    this.selectedCatCadena.fda = (f.getFullYear()+"-"+f.getMonth()+"-"+f.getDay()+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()).toString();
  }

  selectNewCatCadena() {
    this.selectedCatCadena = { idcadena: null, idempresa: null, nombrecorto: null, cadena: null, uda: this.usr.usuario, uda_c: this.usr.usuario, fda: null, fda_m: null, udc: this.usr.usuario, fdc: null, fdc_m: null, idestatus: null, estatus: null, btn_estilo: null, nombreempresa: null }
  }

  deleteCatCadena(id) {
    if (confirm("¿Seguro de borrar este dato?")) {
      this.cadcadenaservice.deleteCadenaServicios(id).subscribe((catcadena: catcadena) => {
        // console.log("Policy deleted, ", catcadena);
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

  findCatCadena(cadena: string, orden: number) {
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    this.cadcadenaservice.getcadenaserviciosPorCadena(cadena, orden).subscribe((gpocadena: catcadena[]) => {
      this.cad = gpocadena;
      $('#bloqueador_cadena').hide();
      // console.log("lista de cadenas, ", this.cad);
    });
  }

  /* Seccion de eventos de Tabs */
  getSelectedTab(index) {
    switch (index) {
      case 0: return 0;
      case 1: return 1;
      case 2: if (this.selectedCatCadena.idcadena == null) {
        this.toaster.warning("Por favor debe seleccionar una cadena", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      }
        return 2;
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
    this.findCatCadena(this.cadena, orden);
  }

  ListaTiendas(id: number) {
    this.setSelectedTab('tiendas_por_cadena');
    if (this.pag1 != null) {
      this.paginacion1.page_number = 0;
      this.pag1.firstPage();
    }

    $('#bloqueador_cadena').show();

    this.cadcadenaservice.getTiendasPorCadena(id).subscribe((gTiendasPorCadena: any[]) => {
      this.tiendasPorCadena = gTiendasPorCadena;
      $('#bloqueador_cadena').hide();
      // console.log("Lista de tiendas por cadena, ", this.tiendasPorCadena);
    });
  }

}