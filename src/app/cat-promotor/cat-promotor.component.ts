import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CatPromotorService } from '../Servicios/cat-promotor.service';
import { CatPromotor } from '../Objetos/catpromotor';
import { RutasAsignadasAPromotor } from '../Objetos/rutas_asignadas_a_promotor';
import { CatEmpresaService } from '../Servicios/cat-empresa.service';
import { CatEmpresa } from '../Objetos/catempresa';
import { CatRutasService } from '../Servicios/cat-rutas.service';
import { catcadenaJoinCatRutas } from '../Objetos/catcadenajoincatrutas';
import { RutasPromotorDias } from '../Objetos/rutas_promotor_dias';
import { usuario } from '../Objetos/usuario';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Paginacion } from '../Objetos/paginacion';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { CatUsohorarioService } from 'app/Servicios/cat-usohorario.service';
import { MatDatepicker, MatPaginator } from '@angular/material';
import { CatRutas } from 'app/Objetos/catrutas';
import { environment } from "environments/environment";

declare var $;

@Component({
  selector: 'app-cat-promotor',
  templateUrl: './cat-promotor.component.html',
  styleUrls: ['./cat-promotor.component.scss']
})
export class CatPromotorComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild('pag1', { static: false }) pag1: MatPaginator;
  @ViewChild('pag2', { static: false }) pag2: MatPaginator;
  @ViewChild('pag3', { static: false }) pag3: MatPaginator;

  encabezados = { "nombreempresa": "Empresa", "nombre": "Nombre", "apellidos": "Apellidos", "idusuario": "Usuario", "uda": "Uda", "fda_m": "Fda", "udc": "Udc", "fdc_m": "Fdc", "estatus_btn": "Estatus" };
  campos_llenos = Array();
  selected: number;
  selected1: number;
  usr: usuario;
  paginacion: Paginacion = new Paginacion();
  paginacion1: Paginacion = new Paginacion();
  paginacion2: Paginacion = new Paginacion();
  paginacion3: Paginacion = new Paginacion();
  prom: CatPromotor[];
  empresas: CatEmpresa[];
  rutas: catcadenaJoinCatRutas[];
  rutasPorPromotor: RutasAsignadasAPromotor[];
  rutasPorPromotorTemporales: any[];
  usohorarios: any[];
  idusohorario = 0;
  idempresa : number = Number(localStorage.getItem('idempresa'));
  dia = 0;
  noPermitido = true;
  campos: string;
  desasigna: number = 0;
  asiste: number = 1;
  //selectedCatPromotor: CatPromotor = { idpromotor: null, idempresa: null, idsupervisor: null, nombre: null, apellidos: null, idusuario: null, rol: null, correo: null, estatus: null, QR: null, uda: null, uda_c: null, fda: null,fda_m:null, udc: null, fdc: null,fdc_m:null, idestatus: null, pwd: null, pwd_c: null, estatus_btn: null, btn_estilo: null, nombreempresa: null, nombrecompleto_s: null };
  selectedCatPromotor: CatPromotor = { idpromotor: null, idempresa: null, idsupervisor: null, nombre: null, apellidos: null, idusuario: null, rol: null, correo: null, estatus: null, QR: null, uda: null, uda_c: null, fda: null, fda_m: null, udc: null, fdc: null, fdc_m: null, idestatus: null, pwd: null, pwd_c: null, estatus_btn: null, btn_estilo: null, nombreempresa: null, nombrecompleto_s: null, idusohorario: null };
  selectedRuta: catcadenaJoinCatRutas = { idruta: null, determinante: null, Tienda: null, Direccion: null, Tienda1: null };
  rutaPromotor: RutasAsignadasAPromotor = { idrutaasignada: null, idruta: null, idpromotor: null, determinante: null, Tienda: null, Direccion: null, uda: null, fechaasignacion: null, estatus: null, Tienda1: null, };
  rutaPromotorTemporal: any = { idrutaasignada: null, idruta: null, idpromotor: null, determinante: null, Tienda: null, Direccion: null, uda: null, fechaasignacion: null, estatus: null, Tienda1: null, observaciones: null, asiste: null, dia: null, dia1: null };
  rutasPromotorDias: RutasPromotorDias = { iddias: null, idruta: null, idpromotor: null, lunes: null, martes: null, miercoles: null, jueves: null, viernes: null, sabado: null, domingo: null, lunesp: null, martesp: null, miercolesp: null, juevesp: null, viernesp: null, sabadop: null, domingop: null };

  constructor(
    private promservice: CatPromotorService,
    private catempresaService: CatEmpresaService,
    private catrutasService: CatRutasService,
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

    this.exportarExcel.nombreArchivo = "promotores";
    this.promservice.getpromotorservicios(this.idempresa).subscribe((gprom: CatPromotor[]) => {
      this.prom = gprom;
      // console.log("lista de promotorores, ", this.prom);
    });
    this.catempresaService.getCatEmpresa(this.idempresa).subscribe((gempresa: CatEmpresa[]) => {
      this.empresas = gempresa;
      if (localStorage.getItem("tab") != null && localStorage.getItem("idpromotor") != null) {
        this.promservice.getpromotorPorIdServicios(parseInt(localStorage.getItem("idpromotor"))).subscribe((gprom: CatPromotor[]) => {
          this.selectCatPromotor(gprom[0]);
          this.setSelectedTab(parseInt(localStorage.getItem("tab")));
        });
      }
      // console.log("lista de empresas, ", this.empresas);
    });
    this.catusohorario.getUsoHorarioservicios().subscribe((gusohorario: any[]) => {
      this.usohorarios = gusohorario;
      // console.log("lista de uso horarios, ", this.usohorarios);
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
    if (this.pag3 != null) {
      this.paginacion3.page_number = 0;
      this.pag3.firstPage();
    }
  }

  /* Seccion de interaccion con base de datos*/
  createOrUpdateCatPromotor(form) {
    if (this.selectedCatPromotor && this.selectedCatPromotor.idpromotor) {
      form.value.idpromotor = this.selectedCatPromotor.idpromotor;
      if (this.selectedCatPromotor.pwd == this.selectedCatPromotor.pwd_c) {
        this.promservice.updatePromotorServicios(form.value).subscribe((catpromotor: CatPromotor) => {
          if (catpromotor == null) {
            // console.log("CatPromotor updated", catpromotor);
            this.toaster.success("Dato guardado", "", {
              timeOut: 1000,
              positionClass: 'toast-bottom-center'
            });

            setTimeout(function () {
              window.location.reload();
            }.bind(this), 2000);
          } else {
            this.toaster.warning(catpromotor.nombre, "", {
              timeOut: 1000,
              positionClass: 'toast-bottom-center'
            });
          }
        });
      } else {
        this.toaster.warning("Las claves deben coincidir", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      }
    } else {
      if (form.value.idEmpresa != null && form.value.nombre != null && form.value.apellidos != null && form.value.idusuario != null) {
        if (this.selectedCatPromotor.pwd == this.selectedCatPromotor.pwd_c) {
          this.promservice.createPromotorServicios(form.value).subscribe((catpromotor: CatPromotor) => {
            if (catpromotor.nombre.toLowerCase() != 'el usuario ya existe') {
              // console.log("CatPromotor created, ", catpromotor);
              console.log('id', catpromotor.idpromotor);
              this.toaster.success("Dato creado", "", {
                timeOut: 1000,
                positionClass: 'toast-bottom-center'
              });

              setTimeout(function () {
                window.location.reload();
              }.bind(this), 2000);
            } else {
              this.toaster.warning(catpromotor.nombre, "", {
                timeOut: 1000,
                positionClass: 'toast-bottom-center'
              });
            }
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

  createDias(form) {
    if (this.rutasPromotorDias && this.rutasPromotorDias.iddias) {
      form.value.iddias = this.rutasPromotorDias.iddias;
      form.value.idpromotor = this.rutasPromotorDias.idpromotor;
      form.value.idruta = this.rutasPromotorDias.idruta;
      if (this.validaDias(form) == true) {
        this.promservice.updateAsignacionDiasRutaAPromotorServicios(form.value).subscribe((gRutasPromotorDias: RutasPromotorDias) => {
          // console.log("RutasPromotorDias updated: ", gRutasPromotorDias);
          this.toaster.success("Dato actualizado", "", {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          });

          setTimeout(function () {
            window.location.reload();
          }.bind(this), 2000);

        });
      } else {
        this.toaster.warning("Al asignar dia tambien debe asignarle su prioridad", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      }
    }
    else {
      if (this.validaDias(form) == true) {
        form.value.idpromotor = this.rutasPromotorDias.idpromotor;
        form.value.idruta = this.rutasPromotorDias.idruta;
        this.promservice.createAsignacionDiasRutaAPromotorServicios(form.value).subscribe((gRutasPromotorDias: RutasPromotorDias) => {
          // console.log("RutasPromotorDias created: ", gRutasPromotorDias);
          this.toaster.success("Dato creado", "", {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          });

          setTimeout(function () {
            window.location.reload();
          }.bind(this), 2000);

        });
      } else {
        this.toaster.warning("Al asignar dia tambien debe asignarle su prioridad", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      }
    }
  }

  validaDias(form) {
    var validacion = true;
    while (this.campos_llenos.length > 0) {
      this.campos_llenos.pop();
    }
    if (form.value.lunes == true) {
      this.campos_llenos.push([form.value.lunes == true, form.value.lunesp != null && form.value.lunesp != ""]);
    }
    if (form.value.martes == true) {
      this.campos_llenos.push([form.value.martes == true, form.value.martesp != null && form.value.martesp != ""]);
    }
    if (form.value.miercoles == true) {
      this.campos_llenos.push([form.value.miercoles == true, form.value.miercolesp != null && form.value.miercolesp != ""]);
    }
    if (form.value.jueves == true) {
      this.campos_llenos.push([form.value.jueves == true, form.value.juevesp != null && form.value.juevesp != ""]);
    }
    if (form.value.viernes == true) {
      this.campos_llenos.push([form.value.viernes == true, form.value.viernesp != null && form.value.viernesp != ""]);
    }
    if (form.value.sabado == true) {
      this.campos_llenos.push([form.value.sabado == true, form.value.sabadop != null && form.value.sabadop != ""]);
    }
    if (form.value.domingo == true) {
      this.campos_llenos.push([form.value.domingo == true, form.value.domingop != null && form.value.domingop != ""]);
    }
    for (var i = 0; i < this.campos_llenos.length; i++) {
      if (this.campos_llenos[i][0] != this.campos_llenos[i][1]) {
        validacion = false;
        break;
      }
    }
    return validacion;
  }

  selectCatPromotor(catpromotor: CatPromotor, estatus = 0) {
    this.selectedCatPromotor = catpromotor;
    this.selectedCatPromotor.pwd_c = this.selectedCatPromotor.pwd;
    if (estatus == 0) {
      this.selectedCatPromotor.uda_c = this.usr.usuario;
    } else if (estatus == 1) {
      if (this.selectedCatPromotor.idestatus == 0) {
        this.selectedCatPromotor.idestatus = 1;
        this.selectedCatPromotor.estatus_btn = "Activo";
        this.selectedCatPromotor.btn_estilo = "a_estatus";
      } else if (this.selectedCatPromotor.idestatus == 1) {
        this.selectedCatPromotor.idestatus = 0;
        this.selectedCatPromotor.estatus_btn = "Inactivo";
        this.selectedCatPromotor.btn_estilo = "i_estatus";
      }
      this.promservice.updateEstatusPromotorServicios(this.selectedCatPromotor).subscribe((catpromotor: CatPromotor) => {
        // console.log("Estatus CatPromotor updated", catpromotor);
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

    if (this.pag3 != null) {
      this.paginacion3.page_number = 0;
      this.pag3.firstPage();
    }

    this.promservice.getRutasAsignadasAlPromotor(this.selectedCatPromotor.idpromotor).subscribe((grap: RutasAsignadasAPromotor[]) => {
      this.rutasPorPromotor = grap;
      // console.log("lista de rutas asignadas al promotor, ", this.rutasPorPromotor);
    });
    this.promservice.getRutasTemporalesAsignadasAlPromotor(this.selectedCatPromotor.idpromotor).subscribe((grap: any[]) => {
      this.rutasPorPromotorTemporales = grap;
      // console.log("lista de rutas temporales asignadas al promotor, ", this.rutasPorPromotorTemporales);
    });
    //var f = new Date();
    //    this.selectedCatCadena.fda = (f.getFullYear()+"-"+f.getMonth()+"-"+f.getDay()+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()).toString();
  }

  selectNewCatPromotor() {
    this.selectedCatPromotor = { idpromotor: null, idempresa: null, idsupervisor: 0, nombre: null, apellidos: null, idusuario: null, rol: '', correo: '', estatus: 0, QR: '', uda: this.usr.usuario, uda_c: this.usr.usuario, fda: null, fda_m: null, udc: this.usr.usuario, fdc: null, fdc_m: null, idestatus: null, pwd: null, pwd_c: null, estatus_btn: null, btn_estilo: null, nombreempresa: null, nombrecompleto_s: null, idusohorario: null };
  }

  selectRutaPromotor(rutapromotor: RutasAsignadasAPromotor) {
    this.rutaPromotor = rutapromotor;
    this.promservice.getDiasAsignadosRutaPromotor(this.rutaPromotor.idpromotor, this.rutaPromotor.idruta).subscribe((gDiasRutasAsignadas: RutasPromotorDias[]) => {
      if (gDiasRutasAsignadas.length > 0) {
        this.rutasPromotorDias = gDiasRutasAsignadas[0];
        this.rutasPromotorDias.lunes = (this.rutasPromotorDias.lunes == true) ? true : false;
        this.rutasPromotorDias.martes = (this.rutasPromotorDias.martes == true) ? true : false;
        this.rutasPromotorDias.miercoles = (this.rutasPromotorDias.miercoles == true) ? true : false;
        this.rutasPromotorDias.jueves = (this.rutasPromotorDias.jueves == true) ? true : false;
        this.rutasPromotorDias.viernes = (this.rutasPromotorDias.viernes == true) ? true : false;
        this.rutasPromotorDias.sabado = (this.rutasPromotorDias.sabado == true) ? true : false;
        this.rutasPromotorDias.domingo = (this.rutasPromotorDias.domingo == true) ? true : false;
      } else {
        this.rutasPromotorDias = { iddias: null, idpromotor: this.rutaPromotor.idpromotor, idruta: this.rutaPromotor.idruta, lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false, lunesp: null, martesp: null, miercolesp: null, juevesp: null, viernesp: null, sabadop: null, domingop: null };
      }
    });
  }

  deleteCatPromotor(id) {
    if (confirm("¿Seguro de borrar este dato?")) {
      this.promservice.deletePromotorServicios(id).subscribe((catpromotor: CatPromotor) => {
        // console.log("Policy deleted, ", catpromotor);
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
  desasignarRutasAPromotor(id) {
    if (confirm("¿Seguro que desea desasignar esta ruta?")) {
      this.promservice.deleteAsignacionRutaAPromotorServicios(id).subscribe((rap: RutasAsignadasAPromotor) => {
        // console.log("Policy deleted, ", rap);
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

  findCatPromotor(campos: string, dia: number, orden: number, idempresa: number) {
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    console.log('idEmpresa ', this.idempresa);
    this.promservice.getpromotorserviciosPorNombreOApellidos(campos, dia, orden, idempresa).subscribe((gprom: CatPromotor[]) => {
      this.prom = gprom;
      // console.log("lista de promotores, ", this.prom);
    });
  }

  findCatRuta(cadena: string) {
    if (this.pag1 != null) {
      this.paginacion1.page_number = 0;
      this.pag1.firstPage();
    }
    this.catrutasService.getrutasserviciosPorCadena(cadena, this.selectedCatPromotor.idpromotor).subscribe((grutas: catcadenaJoinCatRutas[]) => {
      this.rutas = grutas;
      if (this.rutas.length == 0) {
        document.getElementById("ra").setAttribute("style", "display:none");
      } else {
        document.getElementById("ra").removeAttribute("style");
      }
      // console.log("lista de rutas, ", this.rutas);
    });
  }

  /* Seccion de eventos de Tabs */
  getSelectedTab(index) {
    switch (index) {
      case 0: this.selected = undefined; if (localStorage.getItem("tab") != null && localStorage.getItem("idpromotor") != null) { localStorage.removeItem("tab"); localStorage.removeItem("idpromotor"); } return 0;
      case 1: this.selected = undefined; if (localStorage.getItem("tab") != null && localStorage.getItem("idpromotor") != null) { localStorage.removeItem("tab"); localStorage.removeItem("idpromotor"); } return 1;
      case 2: this.selected = undefined; if (this.selectedCatPromotor.idpromotor == null) {
        this.toaster.warning("Para asignar rutas, por favor debe seleccionar un promotor", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      } else {
        localStorage.setItem("tab", "2");
        localStorage.setItem("idpromotor", this.selectedCatPromotor.idpromotor.toString());
      }
        return 2;
      default: return -1;
    }
  }

  getSelectedTab1(index) {
    switch (index) {
      case 0: this.selected1 = undefined; return 0;
      case 1: this.selected1 = undefined; window.location.href = window.location.href + "#div_dias"; return 1;
      default: return -1;
    }
  }

  setSelectedTab(index) {
    this.selected = index;
  }

  setSelectedTab1(index) {
    this.selected1 = index;
  }

  setAsignaRutas(selectedruta: catcadenaJoinCatRutas) {
    if (this.selectedCatPromotor.idpromotor != null) {
      document.getElementById("ra").setAttribute("style", "display:none");
      this.selectedRuta = selectedruta;
      this.promservice.createAsignacionRutaAPromotorServicios(this.selectedCatPromotor.idpromotor, this.selectedRuta.idruta, this.usr.usuario).subscribe((rap: RutasAsignadasAPromotor) => {
        // console.log("RutasAsignadasAPromotor updated", rap);
        this.toaster.success("Ruta asignada", "", {
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

  tabClick1(clickEvent: any) {

    // Coloca el indece seleccionado
    const clickedTabIndex = this.getSelectedTab1(clickEvent);

    // Si no se ha echo click en ningun elemento, no se hace nada
    if (clickedTabIndex === -1) {
      return;
    }

    this.selected1 = clickedTabIndex;
  }

  /* Funcion que solo admite numeros en un <input matInput type="text"> */

  isNumber(event: KeyboardEvent) {
    if (event.target) {
      switch (event.keyCode) {
        case 8:
          return true;
        case 37:
          return true;
        case 38:
          if (parseInt((<HTMLInputElement>event.target).value) >= 2) {
            (<HTMLInputElement>event.target).value = (parseInt((<HTMLInputElement>event.target).value) - 1).toString();
          }
          return false;
        case 39:
          return true;
        case 40:
          (<HTMLInputElement>event.target).value = (parseInt((<HTMLInputElement>event.target).value) + 1).toString();
          return false;
        case 48:
          if ((<HTMLInputElement>event.target).value == "") {
            return false;
          } else {
            return true;
          }
        case 49:
          return true;
        case 50:
          return true;
        case 51:
          return true;
        case 52:
          return true;
        case 53:
          return true;
        case 54:
          return true;
        case 55:
          return true;
        case 56:
          return true;
        case 57:
          return true;
        default:
          return false;
      }
    }
  }

  isZeroOrEmptyValue(element: any, rutasPromotorDias: RutasPromotorDias, dia: number) {
    if (element.value == "0") {
      element.value = "1";
      switch (dia) {
        case 1:
          rutasPromotorDias.lunesp = parseInt(element.value);
          break;
        case 2:
          rutasPromotorDias.martesp = parseInt(element.value);
          break;
        case 3:
          rutasPromotorDias.miercolesp = parseInt(element.value);
          break;
        case 4:
          rutasPromotorDias.juevesp = parseInt(element.value);
          break;
        case 5:
          rutasPromotorDias.viernesp = parseInt(element.value);
          break;
        case 6:
          rutasPromotorDias.sabadop = parseInt(element.value);
          break;
        case 7:
          rutasPromotorDias.domingop = parseInt(element.value);
          break;
      }
    }
  }

  /* Funcion de evento change de inputs prioridad */
  changeTextP(event, rutasPromotorDias: RutasPromotorDias, dia: number) {
    this.isZeroOrEmptyValue((<HTMLInputElement>event.target), rutasPromotorDias, dia);
  }

  /* Funcion de evento para proponer prioridad */
  setProponerPrioridad(event, dia: number, rutasPromotorDias: RutasPromotorDias) {
    if (event.checked == true) {
      switch (dia) {
        case 1:
          this.promservice.getRutaPromotorDiaYaEstablecido(rutasPromotorDias.idpromotor, "lunes").subscribe((gRE: any[]) => {
            rutasPromotorDias.lunesp = gRE[0].total;
          });
          break;
        case 2:
          this.promservice.getRutaPromotorDiaYaEstablecido(rutasPromotorDias.idpromotor, "martes").subscribe((gRE: any[]) => {
            rutasPromotorDias.martesp = gRE[0].total;
          });
          break;
        case 3:
          this.promservice.getRutaPromotorDiaYaEstablecido(rutasPromotorDias.idpromotor, "miercoles").subscribe((gRE: any[]) => {
            rutasPromotorDias.miercolesp = gRE[0].total;
          });
          break;
        case 4:
          this.promservice.getRutaPromotorDiaYaEstablecido(rutasPromotorDias.idpromotor, "jueves").subscribe((gRE: any[]) => {
            rutasPromotorDias.juevesp = gRE[0].total;
          });
          break;
        case 5:
          this.promservice.getRutaPromotorDiaYaEstablecido(rutasPromotorDias.idpromotor, "viernes").subscribe((gRE: any[]) => {
            rutasPromotorDias.viernesp = gRE[0].total;
          });
          break;
        case 6:
          this.promservice.getRutaPromotorDiaYaEstablecido(rutasPromotorDias.idpromotor, "sabado").subscribe((gRE: any[]) => {
            rutasPromotorDias.sabadop = gRE[0].total;
          });
          break;
        case 7:
          this.promservice.getRutaPromotorDiaYaEstablecido(rutasPromotorDias.idpromotor, "domingo").subscribe((gRE: any[]) => {
            rutasPromotorDias.domingop = gRE[0].total;
          });
          break;
        default:
          break;
      }
    } else {
      switch (dia) {
        case 1:
          rutasPromotorDias.lunesp = null;
          break;
        case 2:
          rutasPromotorDias.martesp = null;
          break;
        case 3:
          rutasPromotorDias.miercolesp = null;
          break;
        case 4:
          rutasPromotorDias.juevesp = null;
          break;
        case 5:
          rutasPromotorDias.viernesp = null;
          break;
        case 6:
          rutasPromotorDias.sabadop = null;
          break;
        case 7:
          rutasPromotorDias.domingop = null;
          break;
        default:
          break;
      }
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
        this.campos = value;
      }
    }
  }

  search(orden: number) {
    if (this.campos == null || this.campos == '') {
      this.campos = ' ';
    }
    this.findCatPromotor(this.campos.trim(), this.dia, orden, this.idempresa);
  }

  /*Seccion de evento de search para buscar rutas*/
  changeTextSR(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if (event.target) {
      this.campos = value;
      this.searchSR();
    }
  }

  searchSR() {
    if (this.campos != null) {
      if (this.campos != '') {
        this.findCatRuta(this.campos);
      }
      else {
        document.getElementById("ra").setAttribute("style", "display:none");
      }
    }
  }

  /* Abre ventana para seleccionar rutas temporales */
  showVentana(ruta: any, asiste: number, desasigna: number = 0) {
    this.asiste = asiste;
    this.desasigna = desasigna;
    this.rutaPromotorTemporal = ruta;
    if (this.rutaPromotorTemporal.dia1 == null) {
      this.rutaPromotorTemporal.dia1 = (new Date().toISOString());
    }
    if (desasigna == 0) {
      $('#ventanaRutasTemporales').modal('show');
    } else {
      this.setAsignaDesasignaRutaTemporal();
    }
  }

  /* Asignar ruta temporal */
  setAsignaDesasignaRutaTemporal() {

    if (this.selectedCatPromotor.idpromotor != null) {
      if (this.rutaPromotorTemporal.observaciones == undefined || this.rutaPromotorTemporal.observaciones == null) {
        this.rutaPromotorTemporal.observaciones = "";
      }
      if (this.selectedCatPromotor.idpromotor == 0 ||
        parseInt(this.rutaPromotorTemporal.idruta) == 0 ||
        (this.rutaPromotorTemporal.observaciones == null || this.rutaPromotorTemporal.observaciones == "") ||
        (this.rutaPromotorTemporal.dia1 == null || this.rutaPromotorTemporal.dia1 == "")) {
        this.toaster.warning("Por favor llene todos los campos solicitados", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
        return;
      }

      let obj = document.getElementById("ra");
      if (obj != null) {
        obj.setAttribute("style", "display:none");
      }
      if (this.desasigna == 0) {
        this.promservice.createAsignacionTemporalRutaAPromotorServicios(this.selectedCatPromotor.idpromotor, this.rutaPromotorTemporal.idruta, this.rutaPromotorTemporal.observaciones, new Date(this.rutaPromotorTemporal.dia1).toISOString(), this.usr.usuario, this.asiste).subscribe((rap: any) => {
          // console.log("RutasAsignadasAPromotor updated", rap);
          this.toaster.success("Ruta asignada", "", {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          });
          setTimeout(function () {
            window.location.reload();
          }.bind(this), 2000);
        });
      } else {
        if (confirm("¿Seguro que desea desasignar esta ruta?")) {
          this.promservice.deleteAsignacionRutaTemporalAPromotorServicios(this.rutaPromotorTemporal.idrutaasignada).subscribe((rap: any) => {
            // console.log("Policy deleted, ", rap);
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
    }
  }

  /* Cierra ventana modal sin guardar cambios */
  cancelar() {
    $('#ventanaRutasTemporales').modal('hide');
  }

  /* Formato de fecha */
  formatDate(date: any): string {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

}
