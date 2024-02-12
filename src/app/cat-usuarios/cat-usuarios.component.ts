import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { usuario } from 'app/Objetos/usuario';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { UserService } from 'app/user.service';
import { ToastrService } from 'ngx-toastr';
import { CatUsuariosService } from 'app/Servicios/cat-usuarios.service';
import { Paginacion } from 'app/Objetos/paginacion';
import { MatPaginator, MatSelect } from '@angular/material';
import { CatEmpresaService } from 'app/Servicios/cat-empresa.service';

declare var $: any;

@Component({
  selector: 'app-cat-usuarios',
  templateUrl: './cat-usuarios.component.html',
  styleUrls: ['./cat-usuarios.component.scss']
})
export class CatUsuariosComponent implements OnInit, AfterViewInit {
  @ViewChild("tabla_usuarios", { static: false }) tabla_usuarios: ElementRef;
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  encabezados = { "usuario": "Usuario", "perfil": "Perfil", "uda": "Uda", "fda_m": "Fda", "udc": "Udc", "fdc_m": "Fdc" };

  idperfil = "0";
  usuario: string;
  selected: number;
  paginacion: Paginacion = new Paginacion();
  usr: usuario;
  noPermitido = true;
  lista_empresas_visible = false;
  usuarios: any[];
  perfiles: any[];
  empresas: any[];
  selectedCatUsuario: any = { idUsuario: null, usuario: null, clave: null, idperfil: null, perfil: null, uda: null, uda_c: null, fda: null, fda_m: null, udc: null, fdc: null, fdc_m: null, activo: null, idempresa: null };
  idempresa: number = Number(localStorage.getItem('idempresa'));

  constructor(
    private usuariosService: CatUsuariosService,
    private catempresaService: CatEmpresaService,
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
    this.exportarExcel.nombreArchivo = "usuarios";
    this.usuariosService.getUsuariosServicio().subscribe((gpusuarios: any[]) => {
      this.usuarios = gpusuarios;
      $('#bloqueador_usuarios').hide();
      // console.log("lista de usuarios, ", this.usuarios);
    });
    this.usuariosService.getCmbPerfilesServicio().subscribe((gcmbperfiles: any[]) => {
      this.perfiles = gcmbperfiles;
      // console.log("lista de perfiles, ", this.perfiles);
    });
    this.catempresaService.getAllCatEmpresa(/*this.idempresa*/).subscribe((gempresa: any[]) => {
      this.empresas = gempresa;
      // console.log("lista de empresas, ", this.empresas);
    });
  }

  ngAfterViewInit() {

    $('#bloqueador_usuarios').show();

    if (this.paginator != null) {
      this.paginacion.page_number = 0;
      this.paginator.firstPage();
    }
  }

  /* Seccion de interaccion con base de datos*/
  createOrUpdateCatUsuario(form) {
    let empresa = true;
    if (form.value.idperfil == 3) {
      empresa = (form.value.idEmpresa > 0) ? true : false;
    }
    if (this.selectedCatUsuario && this.selectedCatUsuario.idUsuario) {
      form.value.idUsuario = this.selectedCatUsuario.idUsuario;
      // ************************************
      // Verifica si la clave se digito correctamente en ambas cajas

      var clave = ((document.getElementById("CLAVE") as HTMLInputElement).value);
      var largo = clave.length;
      if (empresa == true) {
        if (largo <= 10) {
          this.usuariosService.updateUsuarioServicio(form.value).subscribe((usuario: any) => {
            // console.log("CatUsuario updated", usuario);
            this.toaster.success("Dato guardado", "", {
              timeOut: 500,
              positionClass: 'toast-bottom-center'
            });

            setTimeout(function () {
              window.location.reload();
            }.bind(this), 2000);

          });
        }
        else {
          this.toaster.warning("La clave debe tener hasta 10 caracteres", "", {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          });
        }
      } else {
        this.toaster.warning("Por favor seleccione un cliente", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
      }
      // ************************************
    } else {
      if (form.value.usuario != null && form.value.clave != null && parseInt(form.value.idperfil) > 0 && empresa == true) {
        this.usuariosService.createUsuarioServicio(form.value).subscribe((usuarios: any) => {
          // console.log("CatUsuario created, ", usuarios);
          console.log('id', usuarios.idUsuario);
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
        this.toaster.warning("Debe colocar todos los campos requeridos", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
        //alert('Debe colocar un valor al guardar');
      }
    }
  }

  selectCatUsuario(usuarios: any) {
    this.selectedCatUsuario = usuarios;
    this.selectedCatUsuario.uda_c = this.usr.usuario;
    this.verificaPerfilSeleccionado(this.selectedCatUsuario.idperfil);
  }

  selectNewCatUsuario() {
    this.lista_empresas_visible = false;
    this.selectedCatUsuario = { idUsuario: null, usuario: null, clave: null, idperfil: null, perfil: null, uda: this.usr.usuario, uda_c: this.usr.usuario, fda: null, fda_m: null, udc: this.usr.usuario, fdc: null, fdc_m: null, activo: null, idempresa: 0 };
  }

  deleteCatUsuario(id) {
    if (confirm("¿Seguro de borrar este dato?")) {
      this.usuariosService.deleteUsuarioServicio(id).subscribe((usuario: any) => {
        // console.log("Policy deleted, ", usuario);
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

  findCatUsuarios(usuario: string, orden: number) {
    if (this.paginator != null) {
      this.paginacion.page_number = 0;
      this.paginator.firstPage();
    }
    this.usuariosService.getUsuariosServicio(orden, usuario).subscribe((gpusuario: any[]) => {
      this.usuarios = gpusuario;
      $('#bloqueador_usuarios').hide();
      // console.log("lista de usuarios, ", this.usuarios);
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
        this.usuario = value;
      }
    }
  }

  search(orden: number) {
    if (this.usuario == null || this.usuario == '') {
      this.usuario = ' ';
    }

    $('#bloqueador_usuarios').show();

    this.findCatUsuarios(this.usuario, orden);
  }

  verificaPerfilSeleccionado(idperfil: number) {
    if (idperfil == 3) {
      this.lista_empresas_visible = true;
    } else {
      this.lista_empresas_visible = false;
    }
  }

}
