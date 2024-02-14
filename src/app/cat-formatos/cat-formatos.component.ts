import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { Paginacion } from 'app/Objetos/paginacion';
import { CatFormatos } from 'app/Objetos/catformatos';
import { CatEmpresa } from 'app/Objetos/catempresa';
import { catcadena } from 'app/Objetos/catcadena';
import { usuario } from 'app/Objetos/usuario';
import { CatFormatoService } from 'app/Servicios/cat-formato.service';
import { CatcadenaService } from 'app/Servicios/catcadena.service';
import { CatEmpresaService } from 'app/Servicios/cat-empresa.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/user.service';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { MatPaginator } from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-cat-formatos',
  templateUrl: './cat-formatos.component.html',
  styleUrls: ['./cat-formatos.component.scss']
})
export class CatFormatosComponent implements OnInit, AfterContentInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild("tabla_formatos", { static: false }) tabla_cadenas: ElementRef;
  encabezados = { "nombreempresa": "Empresa", "cadena": "Cadena", "formato": "formato", "uda": "Uda", "fda_m": "Fda", "udc": "Udc", "fdc_m": "Fdc", "estatus": "Estatus" };
  selected: number;
  usr: usuario;
  paginacion: Paginacion = new Paginacion();
  paginacion1: Paginacion = new Paginacion();
  formatos: CatFormatos[];
  empresas: CatEmpresa[];
  cadenas: catcadena[];
  idempresa: number = Number(localStorage.getItem('idempresa'));
  idcadena = 1;
  noPermitido = true;
  cadena: string;
  //selectedCatCadena: catcadena = { idcadena: null, idempresa: null, cadena: null, uda: null, uda_c: null, fda: null, udc: null, fdc: null, idestatus: null, estatus: null, btn_estilo: null, nombreempresa: null };
  selectedCatFormato: CatFormatos = { idformato: null, idempresa: null, idcadena: null, formato: null, uda: null, uda_c: null, fda: null, fda_m: null, udc: null, fdc: null, fdc_m: null, idestatus: null, estatus: null, btn_estilo: null, nombreempresa: null, cadena: null };

  constructor(
    private formatoservice: CatFormatoService,
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
    this.exportarExcel.nombreArchivo = "formatos";
    this.formatoservice.getformatosservicios(this.idempresa).subscribe((gformatos: CatFormatos[]) => {
      this.formatos = gformatos;
      $('#bloqueador_formatos').hide();
      // console.log("lista de formatos, ", this.formatos);
    });
    this.cadcadenaservice.getcadenaservicios(this.idempresa).subscribe((gpocadena: catcadena[]) => {
      this.cadenas = gpocadena;
      // console.log("lista de cadenas, ", this.cadenas);
    });
    this.catempresaService.getCatEmpresa(this.idempresa).subscribe((gempresa: CatEmpresa[]) => {
      this.empresas = gempresa;
      // console.log("lista de empresas, ", this.empresas);
    });
  }

  ngAfterContentInit() {

    $('#bloqueador_formatos').show();

    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
  }

  /* Seccion de interaccion con base de datos*/
  createOrUpdateCatFormato(form) {
    if (this.selectedCatFormato && this.selectedCatFormato.idformato) {
      form.value.idformato = this.selectedCatFormato.idformato;
      this.formatoservice.updateFormatoServicios(form.value).subscribe((catformato: CatFormatos) => {
        // console.log("CatFormato updated", catformato);
        this.toaster.success("Dato guardado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 2000);

      });
    } else {
      if (form.value.idEmpresa != null && form.value.idcadena != null && form.value.formato != null) {
        this.formatoservice.createFormatoServicios(form.value).subscribe((catformato: CatFormatos) => {
          // console.log("CatFormatos created, ", catformato);
          console.log('id', catformato.idformato);
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

  selectCatFormato(catformato: CatFormatos, estatus = 0) {
    this.selectedCatFormato = catformato;
    if (estatus == 0) {
      this.selectedCatFormato.uda_c = this.usr.usuario;
    } else if (estatus == 1) {
      if (this.selectedCatFormato.idestatus == 0) {
        this.selectedCatFormato.idestatus = 1;
        this.selectedCatFormato.estatus = "Activo";
        this.selectedCatFormato.btn_estilo = "a_estatus";
      } else if (this.selectedCatFormato.idestatus == 1) {
        this.selectedCatFormato.idestatus = 0;
        this.selectedCatFormato.estatus = "Inactivo";
        this.selectedCatFormato.btn_estilo = "i_estatus";
      }
      this.formatoservice.updateEstatusFormatoServicios(this.selectedCatFormato).subscribe((gcatformato: CatFormatos) => {
        // console.log("Estatus CatFormato updated", gcatformato);
        this.toaster.success("Dato guardado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
      });
    }
    //var f = new Date();
    //    this.selectedCatCadena.fda = (f.getFullYear()+"-"+f.getMonth()+"-"+f.getDay()+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()).toString();
  }

  selectNewCatFormato() {
    this.selectedCatFormato = { idformato: null, idempresa: null, idcadena: null, formato: null, uda: this.usr.usuario, uda_c: this.usr.usuario, fda: null, fda_m: null, udc: this.usr.usuario, fdc: null, fdc_m: null, idestatus: null, estatus: null, btn_estilo: null, nombreempresa: null, cadena: null };
  }

  deleteCatFormato(id) {
    if (confirm("¿Seguro de borrar este dato?")) {
      this.formatoservice.deleteFormatoServicios(id).subscribe((formato: CatFormatos) => {
        // console.log("Policy deleted, ", formato);
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

  findCatFormato(cadena: string, orden: number) {

    $('#bloqueador_formatos').show();

    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    this.formatoservice.getformatosserviciosPorFormato(cadena, orden).subscribe((gpoformato: CatFormatos[]) => {
      this.formatos = gpoformato;
      $('#bloqueador_formatos').hide();
      // console.log("lista de formatos, ", this.formatos);
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
    this.findCatFormato(this.cadena, orden);
  }

}
