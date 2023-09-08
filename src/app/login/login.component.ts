import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { usuario } from 'app/Objetos/usuario';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { environment } from 'environments/environment';
import { CatEmpresaService } from 'app/Servicios/cat-empresa.service';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  username: string;
  password: string;
  idempresa: number;
  empresas: any[];
  selectedCatUsuario: any = { idUsuario: null, usuario: null, clave: null, idperfil: null, perfil: null, uda: null, uda_c: null, fda: null, fda_m: null, udc: null, fdc: null, fdc_m: null, activo: null, idempresa: null };


  constructor(
    private router: Router,
    private loginService: LoginService,
    private toaster: ToastrService,
    private userService: UserService,
    private catempresaService: CatEmpresaService,
  ) { }

  ngOnInit() {
    this.catempresaService.getAllCatEmpresa().subscribe((gempresa: any[]) => {
      this.empresas = gempresa;
      // console.log("lista de empresas, ", this.empresas);
    });
  }

  ngAfterViewInit(): void {
    let s1 = localStorage.getItem('saliendo');
    let s2 = sessionStorage.getItem('saliendo');

    if ((s1 != null || s1 != undefined) && (s2 != null || s2 != undefined)) {
      localStorage.removeItem('saliendo');
      sessionStorage.removeItem('saliendo');
      window.location.reload();
    }
  }

  logIn(form) {
    //alert(form.value.username.trim().length);
    //alert(form.value.password.trim().length);
    //alert(form.value.idempresa);
    //return;
    // Validacion de datos de usuario
    if (
      form.value.username === undefined ||
      form.value.password === undefined ||
      form.value.idempresa === undefined
    ) {
      this.toaster.warning("Favor de capturar usuario, contraseña y empresa", "", {
        timeOut: 3000,
        positionClass: 'toast-bottom-center'
      })
    }
    else {
      this.loginService.login1a(form.value).subscribe((usr: usuario) => {
        this.userService.setUserLoggedIn(usr);
        console.log("empresa ", form.value.idempresa);
        console.log("usuario obtenido, ", usr);

        localStorage.setItem('idempresa', form.value.idempresa);

        if (usr.idUsuario > 0) {
          // environment.servidor.TAG_IDEMPRESA = this.userService.getUserLoggedIn().idempresa;
          if (usr.idempresa == 0 || (usr.idempresa == form.value.idempresa)) {
            environment.servidor.TAG_IDEMPRESA = form.value.idempresa;
            localStorage.setItem('idempresa', form.value.idempresa);
            sessionStorage.setItem('idempresa', form.value.idempresa);
            //console.log("empresa 1, ", this.userService.getUserLoggedIn().idempresa);
            this.router.navigate(['dashboard']);
          }
          else {
            this.toaster.error("Acceso denegado", "", {
              timeOut: 3000,
              positionClass: 'toast-bottom-center'
            });
          }
        }
        else {
          this.toaster.error("Acceso denegado", "", {
            timeOut: 3000,
            positionClass: 'toast-bottom-center'
          });
        }
      });
    }
  }
}
