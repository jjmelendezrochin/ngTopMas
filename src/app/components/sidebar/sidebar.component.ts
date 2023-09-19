import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "app/user.service";
import { ToastrService } from "ngx-toastr";

declare var $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  subitems: RouteInfo[];
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Panel de Control",
    icon: "dashboard",
    class: "",
    subitems: null,
  },
];

export const ROUTES1: RouteInfo[] = [];

export const ROUTES2: RouteInfo[] = [];

export const ROUTES3: RouteInfo[] = [];

export const ROUTES4: RouteInfo[] = [
  {
    path: "",
    title: "Consultas",
    icon: "search",
    class: "",
    subitems: [
      {
        path: "/fotos",
        title: "Fotos",
        icon: "photo",
        class: "",
        subitems: null,
      },
      {
        path: "/competencia",
        title: "Competencia",
        icon: "photo",
        class: "",
        subitems: null,
      },
      {
        path: "/caducidad",
        title: "Caducidad",
        icon: "photo",
        class: "",
        subitems: null,
      },
      {
        path: "/distancia",
        title: "Detalles",
        icon: "my_location",
        class: "",
        subitems: null,
      },
      {
        path: "/promocionestiendas",
        title: "Promociones tienda",
        icon: "assignment",
        class: "",
        subitems: null,
      },
      {
        path: "/promociones",
        title: "Campaña punto de venta",
        icon: "assignment",
        class: "",
        subitems: null,
      },
      {
        path: "/graficas",
        title: "Graficas",
        icon: "poll",
        class: "",
        subitems: null,
      },
      {
        path: "/reporteprecioxproductomensual",
        title: "Precio por Producto",
        icon: "poll",
        class: "",
        subitems: null,
      },
    ],
  },
];

export const ROUTES5: RouteInfo[] = [
  //{ path: '/catalogoempresas', title: 'empresas', icon: 'address', class: '', subitems: null },
  {
    path: "/logout",
    title: "Salir",
    icon: "exit_to_app",
    class: "",
    subitems: null,
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  menuItems: any[];
  menuItems1: any[];
  menuItems2: any[];
  menuItems3: any[];
  menuItems4: any[];
  menuItems5: any[];
  constructor(
    private toaster: ToastrService,
    private router: Router,
    private userServive: UserService
  ) {
    if (this.obtenerUsuario() != null) {
      this.toaster.success("Permitido", "", {
        timeOut: 3000,
        positionClass: "toast-bottom-center",
      });
    } else {
      this.router.navigate(["login"]);
    }
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.menuItems1 = ROUTES1.filter((menuItem) => menuItem);
    this.menuItems2 = ROUTES2.filter((menuItem) => menuItem);
    this.menuItems3 = ROUTES3.filter((menuItem) => menuItem);
    this.menuItems4 = ROUTES4.filter((menuItem) => menuItem);
    this.menuItems5 = ROUTES5.filter((menuItem) => menuItem);
    if (this.obtenerUsuario().idperfil == 1) {
      this.menuItems[1] = {
        path: "/catusuarios",
        title: "Usuarios",
        icon: "account_box",
        class: "",
        subitems: null,
      };
      this.menuItems[2] = {
        path: "/catalogoproductos",
        title: "Productos",
        icon: "assignment",
        class: "",
        subitems: null,
      };
      this.menuItems1[0] = {
        path: "",
        title: "Rutas",
        icon: "directions_bus",
        class: "",
        subitems: [
          {
            path: "/catalogocadena",
            title: "Cadenas",
            icon: "explore",
            class: "",
            subitems: null,
          },
          {
            path: "/catalogoformatos",
            title: "Formatos",
            icon: "explore",
            class: "",
            subitems: null,
          },
          {
            path: "/catalogorutas",
            title: "Tiendas",
            icon: "address",
            class: "",
            subitems: null,
          },
          {
            path: "/catalogozonas",
            title: "Zonas",
            icon: "my_location",
            class: "",
            subitems: null,
          },
          {
            path: "/catalogopromociones",
            title: "Promociones",
            icon: "assignment",
            class: "",
            subitems: null,
          },
        ],
      };
      this.menuItems2[0] = {
        path: "",
        title: "Personal",
        icon: "assignment_ind",
        class: "",
        subitems: [
          {
            path: "/catalogopromotor",
            title: "Promotores",
            icon: "account_circle",
            class: "",
            subitems: null,
          },
          {
            path: "/catalogosupervisor",
            title: "Supervisores",
            icon: "supervisor_account",
            class: "",
            subitems: null,
          },
          {
            path: "/errores",
            title: "Bitácora de errores",
            icon: "description",
            class: "",
            subitems: null,
          },
        ],
      };
      this.menuItems3[0] = {
        path: "/maps",
        title: "Mapas",
        icon: "location_on",
        class: "",
        subitems: null,
      };
      this.menuItems5[0] = {
        path: "/catalogoempresas",
        title: "empresas",
        icon: "address",
        class: "",
        subitems: null,
      };
      this.menuItems5[1] = {
        path: "/logout",
        title: "Salir",
        icon: "exit_to_app",
        class: "",
        subitems: null,
      };
    }
  }

  ngAfterViewInit() {
    this.mostrarOcultarMenu();
    this.mostrarOcultarMenu1();
    this.mostrarOcultarMenu2();
    let usuarios = document.querySelector("#mi_2");
    let perfil = this.esAdmin();
    if (perfil != 1) {
      $(usuarios).hide();
    }
  } /*  */

  esAdmin() {
    return this.userServive.getUserLoggedIn().idperfil;
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  mostrarOcultarMenu() {
    $("#submenu").toggle();
  }

  mostrarOcultarMenu1() {
    $("#submenu1").toggle();
  }

  mostrarOcultarMenu2() {
    $("#submenu2").toggle();
  }

  removerReferenciaTabAsginacionRutas(title: string) {
    if (
      localStorage.getItem("tab") != null &&
      localStorage.getItem("idpromotor") != null
    ) {
      localStorage.removeItem("tab");
      localStorage.removeItem("idpromotor");
      if (title == "Promotores") {
        window.location.reload();
      }
    }
  }

  public obtenerUsuario() {
    return this.userServive.getUserLoggedIn();
  }
}
