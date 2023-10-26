import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { usuario } from "app/Objetos/usuario";
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

export let ROUTES: RouteInfo[] = [];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  ROUTES: RouteInfo[] = [
    {
      path: "/dashboard",
      title: "Panel de Control",
      icon: "dashboard",
      class: "",
      subitems: null,
    },
    {
      path: "/catusuarios",
      title: "Usuarios",
      icon: "account_box",
      class: "",
      subitems: null,
    },
    {
      path: "/catalogoproductos",
      title: "Productos",
      icon: "assignment",
      class: "",
      subitems: null,
    },
    {
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
    },
    {
      path: "",
      title: "Administración",
      icon: "assignment_ind",
      class: "",
      subitems: [
        {
          path: "/gestion-ajuste-acumulado",
          title: "Ajuste de acumulado",
          icon: "assignment",
          class: "",
          subitems: null,
        },
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
    },
    {
      path: "",
      title: "Reportes Santa Clara",
      icon: "assignment_ind",
      class: "",
      subitems: [
        {
          path: "/reporte_scl/reporte_asistencia",
          title: "Reporte de asistencia",
          icon: "assignment",
          class: "",
          subitems: null,
        },
        {
          path: "/reporte_scl/presentaciones_canjes",
          title: "Presentaciones Canjes",
          icon: "assignment",
          class: "",
          subitems: null,
        },
        {
          path: "/reporte_scl/reporte_historico",
          title: "Reporte Histórico",
          icon: "assignment",
          class: "",
          subitems: null,
        },
        {
          path: "/reporte_scl/reporte_desplazamiento",
          title: "Reporte Desplazamiento",
          icon: "assignment",
          class: "",
          subitems: null,
        },
        {
          path: "/reporte_scl/slide_santa_clara",
          title: "Generar slide",
          icon: "assignment",
          class: "",
          subitems: null,
        }
      ],
    },
    {
      path: "/maps",
      title: "Mapas",
      icon: "location_on",
      class: "",
      subitems: null,
    },
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
    {
      path: "/catalogoempresas",
      title: "empresas",
      icon: "address",
      class: "",
      subitems: null,
    },
    {
      path: "/logout",
      title: "Salir",
      icon: "exit_to_app",
      class: "",
      subitems: null,
    }
  ];

  menuItems: any[];
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
    switch (this.obtenerUsuario().idperfil.toString()) {
      case '1':
        this.remueveMenusNecesarios((ROUTES: RouteInfo[]) => {
          let idempresa: number = Number(localStorage.getItem('idempresa'));
          if (idempresa.toString() != '2') {
            ROUTES.splice(5, 1);
          }
        });
        break;
      default:
        this.remueveMenusNecesarios((ROUTES: RouteInfo[]) => {
          let idempresa: number = Number(localStorage.getItem('idempresa'));
          if (idempresa.toString() != '2') {
            ROUTES.splice(5, 1);
          }
        });
        break;
    }
  }

  ngAfterViewInit() {
    $("ul[ocultado]").each(function () {
      $(this).hide();
    });
  } /*  */

  esAdmin(): string {
    return this.userServive.getUserLoggedIn().idperfil.toString();
  }

  remueveMenusNecesarios(remueve: (ROUTES: RouteInfo[]) => void = null) {
    let TMP_ROUTES: RouteInfo[] = this.ROUTES;
    if (remueve != null || remueve != undefined) {
      remueve(TMP_ROUTES);
    }
    this.ROUTES = TMP_ROUTES;
    ROUTES = this.ROUTES;
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  public routerLinkActive(subitems: any) {
    if (subitems == null) {
      return "active";
    } else {
      return "";
    }
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  public obtenerUsuario(): usuario {
    return this.userServive.getUserLoggedIn() as usuario;
  }

  mostrarOcultarMenu(id: any) {
    $(`#${id}`).toggle();
  }
}
