import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CatEmpresaService } from 'app/Servicios/cat-empresa.service';
import { CatRutasService } from 'app/Servicios/cat-rutas.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/user.service';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { usuario } from 'app/Objetos/usuario';
import { Paginacion } from 'app/Objetos/paginacion';
import { CatSupervisor } from 'app/Objetos/catsupervisor';
import { CatEmpresa } from 'app/Objetos/catempresa';
import { CatSupervisorService } from 'app/Servicios/cat-supervisor.service';
import { CatPromotorService } from 'app/Servicios/cat-promotor.service';
import { PromotoresAsignadosASupervisor } from 'app/Objetos/promotores_asignados_a_supervisor';
import { CatZonasService } from 'app/Servicios/cat-zonas.service';
import { CatZonas } from 'app/Objetos/catzonas';
import { CatUsohorarioService } from 'app/Servicios/cat-usohorario.service';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-cat-supervisor',
  templateUrl: './cat-supervisor.component.html',
  styleUrls: ['./cat-supervisor.component.scss']
})
export class CatSupervisorComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild('pag1', { static: false }) pag1: MatPaginator;
  @ViewChild('pag2', { static: false }) pag2: MatPaginator;
  encabezados = { "nombreempresa": "Empresa", "nombre": "Nombre", "apellidos": "Apellidos", "idusuario": "Usuario", "uda": "Uda", "fda_m": "Fda", "udc": "Udc", "fdc_m": "Fdc", "estatus_btn": "Estatus" };
  encabezados_sp = { "Supervisor": "Supervisor", "Promotor": "Promotor" };
  campos_llenos = Array();
  selected: number;
  selected1: number;
  usr: usuario;
  paginacion: Paginacion = new Paginacion();
  paginacion1: Paginacion = new Paginacion();
  paginacion2: Paginacion = new Paginacion();
  supervisores: CatSupervisor[];
  empresas: CatEmpresa[];
  zonas: CatZonas[];
  supervisores_promotores: any[];
  promotoresPorSupervisor: PromotoresAsignadosASupervisor[];
  promotoresPorSupervisorD: PromotoresAsignadosASupervisor[];
  usohorarios: any[];
  idempresa: number = Number(localStorage.getItem('idempresa'));
  idusohorario = 0;
  idzona = 0;
  dia = 0;
  noPermitido = true;
  campos: string;
  //selectedCatPromotor: CatPromotor = { idpromotor: null, idempresa: null, idsupervisor: null, nombre: null, apellidos: null, idusuario: null, rol: null, correo: null, estatus: null, QR: null, uda: null, uda_c: null, fda: null,fda_m:null, udc: null, fdc: null,fdc_m:null, idestatus: null, pwd: null, pwd_c: null, estatus_btn: null, btn_estilo: null, nombreempresa: null, nombrecompleto_s: null };
  selectedCatSupervisor: CatSupervisor = { idpromotor: null, idempresa: null, idsupervisor: null, nombre: null, apellidos: null, idusuario: null, rol: null, correo: null, estatus: null, QR: null, uda: null, uda_c: null, fda: null, fda_m: null, udc: null, fdc: null, fdc_m: null, idestatus: null, pwd: null, pwd_c: null, estatus_btn: null, btn_estilo: null, nombreempresa: null, nombrecompleto_s: null, idzona: null, zona: null, idusohorario: null };
  promotorPorSupervisor: PromotoresAsignadosASupervisor = { idpromotorasignado: null, idsupervisor: null, idpromotor: null, nombre_completo: null, uda: null, fechaasignacion: null, estatus: null };

  constructor(
    private supervisorservice: CatSupervisorService,
    private catempresaService: CatEmpresaService,
    private catzonasService: CatZonasService,
    private catpromotorService: CatPromotorService,
    private catusohorario: CatUsohorarioService,
    private toaster: ToastrService,
    private userService: UserService,
    private exportarExcel: ExportarExcelService
  ) {
    this.usr = this.userService.getUserLoggedIn();
  }

  ngOnInit() {
    console.log('idEmpresa ', this.idempresa);
    if (this.usr.idperfil == 1) {
      this.noPermitido = false;
    }

    this.exportarExcel.nombreArchivo = "supervisores";
    this.supervisorservice.getsupervisorservicios(this.idempresa).subscribe((gsup: CatSupervisor[]) => {
      this.supervisores = gsup;
      // console.log("lista de supervisores, ", this.supervisores);
    });
    this.catempresaService.getCatEmpresa(this.idempresa).subscribe((gempresa: CatEmpresa[]) => {
      this.empresas = gempresa;
      if (localStorage.getItem("tab") != null && localStorage.getItem("idpromotor") != null) {
        this.supervisorservice.getsupervisorPorIdServicios(parseInt(localStorage.getItem("idpromotor"))).subscribe((gsup: CatSupervisor[]) => {
          this.selectCatSupervisor(gsup[0]);
          this.setSelectedTab(parseInt(localStorage.getItem("tab")));
        });
      }
      // console.log("lista de empresas, ", this.empresas);
    });
    this.catzonasService.getZonasservicios(0).subscribe((gzonas: CatZonas[]) => {
      this.zonas = gzonas;
      // console.log("lista de zonas, ", this.zonas);
    });
    this.catusohorario.getUsoHorarioservicios().subscribe((gusohorario: any[]) => {
      this.usohorarios = gusohorario;
      // console.log("lista de uso horarios, ", this.usohorarios);
    });
    this.supervisorservice.getSupervisoresPromotoresServicios().subscribe((gsupervisorespromotores: any[]) => {
      this.supervisores_promotores = gsupervisorespromotores;
      // console.log("lista de supervisores y promotores, ", this.supervisores_promotores);
    });
  }

  ngAfterViewInit() {
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    if (this.pag1 != null) {
      this.paginacion1.page_number = 0;
      this.pag1.firstPage();
    }
    if (this.pag2 != null) {
      this.paginacion2.page_number = 0;
      this.pag2.firstPage();
    }
  }

  /* Seccion de interaccion con base de datos*/
  createOrUpdateCatSupervisor(form) {
    if (this.selectedCatSupervisor && this.selectedCatSupervisor.idpromotor) {
      form.value.idpromotor = this.selectedCatSupervisor.idpromotor;
      if (this.selectedCatSupervisor.pwd == this.selectedCatSupervisor.pwd_c) {
        this.supervisorservice.updateSupervisorServicios(form.value).subscribe((catsupervisor: CatSupervisor) => {
          // console.log("CatSupervisor updated", catsupervisor);
          this.toaster.success("Dato guardado", "", {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          });

          setTimeout(function () {
            window.location.reload();
          }.bind(this), 2000);

        });
      } else {
        this.toaster.warning("Las claves deben coincidir", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      }
    } else {
      if (form.value.idEmpresa != null && form.value.nombre != null && form.value.apellidos != null && form.value.idusuario != null) {
        if (this.selectedCatSupervisor.pwd == this.selectedCatSupervisor.pwd_c) {
          this.supervisorservice.createSupervisorServicios(form.value).subscribe((catsupervisor: CatSupervisor) => {
            // console.log("CatSupervisor created, ", catsupervisor);
            console.log('id', catsupervisor.idpromotor);
            this.toaster.success("Dato creado", "", {
              timeOut: 1000,
              positionClass: 'toast-bottom-center'
            });

            setTimeout(function () {
              window.location.reload();
            }.bind(this), 2000);
          });
        } else {
          this.toaster.warning("Las claves deben coincidir", "", {
            timeOut: 3000,
            positionClass: 'toast-bottom-center'
          });
        }
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

  selectCatSupervisor(catsupervisor: CatSupervisor, estatus = 0) {
    this.selectedCatSupervisor = catsupervisor;
    this.selectedCatSupervisor.pwd_c = this.selectedCatSupervisor.pwd;
    if (estatus == 0) {
      this.selectedCatSupervisor.uda_c = this.usr.usuario;
    } else if (estatus == 1) {
      if (this.selectedCatSupervisor.idestatus == 0) {
        this.selectedCatSupervisor.idestatus = 1;
        this.selectedCatSupervisor.estatus_btn = "Activo";
        this.selectedCatSupervisor.btn_estilo = "a_estatus";
      } else if (this.selectedCatSupervisor.idestatus == 1) {
        this.selectedCatSupervisor.idestatus = 0;
        this.selectedCatSupervisor.estatus_btn = "Inactivo";
        this.selectedCatSupervisor.btn_estilo = "i_estatus";
      }
      this.supervisorservice.updateEstatusSupervisorServicios(this.selectedCatSupervisor).subscribe((catsupervisor: CatSupervisor) => {
        // console.log("Estatus CatSupervisor updated", catsupervisor);
        this.toaster.success("Dato guardado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
      });
    }

    if (this.pag2 != null) {
      this.paginacion2.page_number = 0;
      this.pag2.firstPage();
    }
    this.supervisorservice.getPromotoresAsignadosAlSupervisor(this.selectedCatSupervisor.idpromotor).subscribe((gpsup: PromotoresAsignadosASupervisor[]) => {
      this.promotoresPorSupervisor = gpsup;
      // console.log("lista de promotores asignados al supervisor, ", this.promotoresPorSupervisor);
    });
    //var f = new Date();
    //    this.selectedCatCadena.fda = (f.getFullYear()+"-"+f.getMonth()+"-"+f.getDay()+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()).toString();
  }

  selectNewCatSupervisor() {
    this.selectedCatSupervisor = { idpromotor: null, idempresa: null, idsupervisor: 0, nombre: null, apellidos: null, idusuario: null, rol: '', correo: '', estatus: 0, QR: '', uda: this.usr.usuario, uda_c: this.usr.usuario, fda: null, fda_m: null, udc: this.usr.usuario, fdc: null, fdc_m: null, idestatus: null, pwd: null, pwd_c: null, estatus_btn: null, btn_estilo: null, nombreempresa: null, nombrecompleto_s: null, idzona: null, zona: null, idusohorario: null };
  }

  selectPromotorSupervisor(promotorsupervisor: PromotoresAsignadosASupervisor) {
    this.promotorPorSupervisor = promotorsupervisor;
  }

  deleteCatSupervisor(id) {
    if (confirm("¿Seguro de borrar este dato?")) {
      this.supervisorservice.deleteSupervisorServicios(id).subscribe((catsupervisor: CatSupervisor) => {
        // console.log("Policy deleted, ", catsupervisor);
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
  desasignarPromotorASupervisor(id) {
    if (confirm("¿Seguro que desea desasignar este promotor?")) {
      this.supervisorservice.deleteAsignacionPromotorASupervisorServicios(id).subscribe((gpsup: PromotoresAsignadosASupervisor) => {
        // console.log("Policy deleted, ", gpsup);
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

  findCatSupervisor(campos: string, orden: number) {
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    this.supervisorservice.getsupervisorserviciosPorNombreOApellidos(campos, orden, this.idempresa).subscribe((gsup: CatSupervisor[]) => {
      this.supervisores = gsup;
      // console.log("lista de supervisores, ", this.supervisores);
    });
  }

  findCatPromotor(cadena: string) {
    if (this.pag1 != null) {
      this.paginacion1.page_number = 0;
      this.pag1.firstPage();
    }
    this.catpromotorService.getPromotoresYaAsignadosAEsteSupervisorServicio(cadena, this.selectedCatSupervisor.idpromotor).subscribe((gpsup: PromotoresAsignadosASupervisor[]) => {
      this.promotoresPorSupervisorD = gpsup;
      if (this.promotoresPorSupervisorD.length == 0) {
        document.getElementById("ra").setAttribute("style", "display:none");
      } else {
        document.getElementById("ra").removeAttribute("style");
      }
      // console.log("lista de promotores asignados, ", this.promotoresPorSupervisorD);
    });
  }

  /* Seccion de eventos de Tabs */
  getSelectedTab(index) {
    switch (index) {
      case 0: this.selected = undefined; if (localStorage.getItem("tab") != null && localStorage.getItem("idpromotor") != null) { localStorage.removeItem("tab"); localStorage.removeItem("idpromotor"); } return 0;
      case 1: this.selected = undefined; if (localStorage.getItem("tab") != null && localStorage.getItem("idpromotor") != null) { localStorage.removeItem("tab"); localStorage.removeItem("idpromotor"); } return 1;
      case 2: this.selected = undefined; if (this.selectedCatSupervisor.idpromotor == null) {
        this.toaster.warning("Para asignar promotores, por favor debe seleccionar un supervisor", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      } else {
        localStorage.setItem("tab", "2");
        localStorage.setItem("idpromotor", this.selectedCatSupervisor.idpromotor.toString());
      }
        return 2;
      default: return -1;
    }
  }

  setSelectedTab(index) {
    this.selected = index;
  }

  setAsignaPromotores(selectedpromotor: PromotoresAsignadosASupervisor) {
    if (this.selectedCatSupervisor.idpromotor != null) {
      document.getElementById("ra").setAttribute("style", "display:none");
      this.promotorPorSupervisor = selectedpromotor;
      this.supervisorservice.createAsignacionPromotorASupervisorServicios(this.selectedCatSupervisor.idpromotor, this.promotorPorSupervisor.idpromotor, this.usr.usuario).subscribe((gprom: PromotoresAsignadosASupervisor) => {
        // console.log("PromotorAsignadoASupervisor updated", gprom);
        this.toaster.success("Promotor asignado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 2000);
      });
    }
  }

  tabClick(clickEvent: any) {

    // Coloca el indece seleccionado
    const clickedTabIndex = this.getSelectedTab(clickEvent);

    // Si no se ha echo click en ningun elemento, no se hace nada
    if (clickedTabIndex === -1) {
      return;
    }

    this.selected = clickedTabIndex;
  }

  /* Seccion de evento de seach*/

  changeText(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if (event.target) {
      if (event.keyCode == 13) {
        this.search(0);
      }
      else {
        this.campos = value;
      }
    }
  }

  search(orden: number) {
    if (this.campos == null || this.campos == '') {
      this.campos = ' ';
    }
    this.findCatSupervisor(this.campos, orden);
  }

  search1(orden: number) {
    this.supervisorservice.getSupervisoresPromotoresServicios(orden).subscribe((gsupervisorespromotores: any[]) => {
      this.supervisores_promotores = gsupervisorespromotores;
      // console.log("lista de supervisores y promotores, ", this.supervisores_promotores);
    });
  }

  /*Seccion de evento de search para buscar rutas*/
  changeTextSP(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if (event.target) {
      this.campos = value;
      this.searchSP();
    }
  }

  searchSP() {
    if (this.campos != null) {
      if (this.campos != '') {
        this.findCatPromotor(this.campos);
      }
      else {
        document.getElementById("ra").setAttribute("style", "display:none");
      }
    }
  }

}
