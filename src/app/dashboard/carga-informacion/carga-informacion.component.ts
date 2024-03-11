import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import * as Chartist from 'chartist';
import { ToastrService } from 'ngx-toastr';
import { usuario } from 'app/Objetos/usuario';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { FotosService } from '../../Servicios/fotos.service'
import { Mapas } from 'app/Objetos/mapas';
import { ThrowStmt } from '@angular/compiler';
import { environment } from 'environments/environment';
import { BehaviorSubject, Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-carga-informacion',
  templateUrl: './carga-informacion.component.html',
  styleUrls: ['./carga-informacion.component.scss']
})
export class CargaInformacionComponent implements OnInit {
  @ViewChild('map', { static: false }) map: ElementRef;

  @Output() ajusta_empresa: EventEmitter<string> = new EventEmitter<string>();

  @Output() ajusta_supervisores_0: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() ajusta_supervisores_promotores_0: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output() ajusta_supervisores_1: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() ajusta_supervisores_promotores_1: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output() ajusta_supervisores_2: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() ajusta_supervisores_promotores_2: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output() ajusta_supervisores_3: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() ajusta_supervisores_promotores_3: EventEmitter<any[]> = new EventEmitter<any[]>();


  @Input() titulo_contador_objetivo_visitas: string = '';
  @Input() titulo_contador_objetivo_tiendas: string = '';
  @Input() titulo_contador_acumulado: string = '';
  @Input() titulo_contador_avance_al_dia: string = '';
  @Input() titulo_contador_total_usuarios: string = '';
  @Input() titulo_contador_usuarios_activos: string = '';
  @Input() titulo_contador_usuarios_inactivos: string = '';
  @Input() titulo_contador_usuarios_en_transito: string = '';


  supervisores_0: any[] = [];
  supervisores_promotores_0: any[] = [];

  supervisores_1: any[] = [];
  supervisores_promotores_1: any[] = [];

  supervisores_2: any[] = [];
  supervisores_promotores_2: any[] = [];

  supervisores_3: any[] = [];
  supervisores_promotores_3: any[] = [];

  bsVer_ubicaciones_tiendas: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ver_ubicaciones_tiendas = this.bsVer_ubicaciones_tiendas.asObservable();

  bsTodos_usuarios_checkin_out_y_sin_checkout: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  todos_usuarios_checkin_out_y_sin_checkout = this.bsTodos_usuarios_checkin_out_y_sin_checkout.asObservable();

  bsTodos_usuarios_checkin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  todos_usuarios_checkin = this.bsTodos_usuarios_checkin.asObservable();

  bsTodos_usuarios_checkin_out: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  todos_usuarios_checkin_out = this.bsTodos_usuarios_checkin_out.asObservable();

  bsTodos_usuarios_en_transito: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  todos_usuarios_en_transito = this.bsTodos_usuarios_en_transito.asObservable();

  bsRanking_capturas_usuarios: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ranking_capturas_usuarios = this.bsRanking_capturas_usuarios.asObservable();

  bsRanking_promotor_actividad_hora: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ranking_promotor_actividad_hora = this.bsRanking_promotor_actividad_hora.asObservable();

  bsConsulta_distancia_checkin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  consulta_distancia_checkin = this.bsConsulta_distancia_checkin.asObservable();

  bsConsulta_checkin_sin_checkout: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  consulta_checkin_sin_checkout = this.bsConsulta_checkin_sin_checkout.asObservable();

  bsConsulta_usuarios_sin_actividad_hoy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  consulta_usuarios_sin_actividad_hoy = this.bsConsulta_usuarios_sin_actividad_hoy.asObservable();

  usr: usuario;
  mapas: Mapas;
  titulo: string;
  Total_usuarios: string;
  Total_usuarios_activos: string;
  Total_usuarios_inactivos: string;
  Usuarios_transito: string;
  Total_objetivo_visitas: string;
  Total_tiendas: string;
  Tiendas_visitadas: string;
  Tiendas_sin_visitar: string;
  usuariosSinActividad: string;
  Visitas_Diarias: string;
  FechaHora: string;
  rankingCapturasUsuarios: any[];
  rankingPromotorActividadHora: any[];
  supervisoresPromotoresConCheckInOutServicios: any[];
  ggetvw_consuta_distanciachekin: any[];
  ggetvw_usuariossinactividad_hoy: any[];
  getvw_checkinsincheckout: any[];
  id: any = '';
  usuario: any = '';
  observacion: any = '';
  empresa: any;
  idempresa: number = Number(localStorage.getItem('idempresa'));

  //  paginacion = new Paginacion();

  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router,
    private fotosservice: FotosService
  ) {
    this.usr = this.obtenerUsuario();
    console.log(this.usr);
  }

  public obtenerUsuario() {
    return this.userService.getUserLoggedIn();
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    /*var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);*/


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    /*    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
    
        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);*/



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    /*var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);*/
    /*this.fotosservice.getcountUsuariosEnActividadFotosServicios().subscribe((gfoto: any[]) => {
      this.usuarios_actividad = gfoto[0].usuarios_actividad;
    });
    this.fotosservice.getcountUsuariosPuntosVisitadosFotosServicios().subscribe((gfoto: any[]) => {
      this.puntos_visitados = gfoto[0].puntos_visitados;
    });*/
  }

  ngAfterViewInit() {
    $('#m-mapa').hide();
    this.mapas = new Mapas();
    this.ver_ubicaciones_tiendas.subscribe((click) => {
      if (click == true) {
        $('#m-mapa').show();
        this.mapas.Maps_Tiendas(this.fotosservice);
        this.mapas.iniciarGMaps_ListaUbicacionesTiedas(this.map);
      }
    });

    this.fotosservice.obtenerdatospanel(this.idempresa).subscribe((gfoto: any[]) => {
      this.Total_objetivo_visitas = gfoto[0].CtaVisitasTotales;
      this.Total_tiendas = gfoto[0].Total_tiendas;
      this.Tiendas_visitadas = gfoto[0].Tiendas_visitadas;
      this.Tiendas_sin_visitar = gfoto[0].Tiendas_sin_visitar;
      this.Visitas_Diarias = gfoto[0].Visitas_Diarias;
      this.Total_usuarios = gfoto[0].Total_usuarios;
      this.Total_usuarios_activos = gfoto[0].Total_usuarios_activos;
      this.Total_usuarios_inactivos = gfoto[0].Total_usuarios_inactivos;
      this.Usuarios_transito = gfoto[0].Usuarios_transito;
      this.FechaHora = gfoto[0].FechaHora;
      this.empresa = gfoto[0].NombreEmpresa;
      this.ajusta_empresa.emit(this.empresa);
    });

    this.todos_usuarios_checkin_out_y_sin_checkout.subscribe((click) => {
      if (click == true) {
        /*Muestra todos los usuarios que tienen check-in y check-out e incluyendo los que no tienen check-out*/
        this.fotosservice.getSupervisoresPromotoresConCheckInOutServicios().subscribe((gSupervisoresPromotoresConCheckInOutServicios: any[]) => {
          this.supervisoresPromotoresConCheckInOutServicios = gSupervisoresPromotoresConCheckInOutServicios;
          this.supervisores_0 = this.supervisoresPromotoresConCheckInOutServicios[0].supervisores;
          this.supervisores_promotores_0 = this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores;
          this.ajusta_supervisores_0.emit(this.supervisores_0);
          this.ajusta_supervisores_promotores_0.emit(this.supervisores_promotores_0);
          $('#ventanaSP').modal('show');
        });
      }
    });

    this.todos_usuarios_checkin.subscribe((click) => {
      if (click == true) {
        /*Muestra todos los usuarios que solo tienen check-in*/
        this.fotosservice.getSupervisoresPromotoresConCheckInOutServicios(1).subscribe((gSupervisoresPromotoresConCheckInOutServicios: any[]) => {
          this.supervisoresPromotoresConCheckInOutServicios = gSupervisoresPromotoresConCheckInOutServicios;
          this.supervisores_1 = this.supervisoresPromotoresConCheckInOutServicios[0].supervisores;
          this.supervisores_promotores_1 = this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores;
          this.ajusta_supervisores_1.emit(this.supervisores_1);
          this.ajusta_supervisores_promotores_1.emit(this.supervisores_promotores_1);
          $('#ventanaSP1').modal('show');
        });
      }
    });

    this.todos_usuarios_checkin_out.subscribe((click) => {
      if (click == true) {
        /*Muestra todos los usuarios que tienen check-in y check-out*/
        this.fotosservice.getSupervisoresPromotoresConCheckInOutServicios(2).subscribe((gSupervisoresPromotoresConCheckInOutServicios: any[]) => {
          this.supervisoresPromotoresConCheckInOutServicios = gSupervisoresPromotoresConCheckInOutServicios;
          this.supervisores_2 = this.supervisoresPromotoresConCheckInOutServicios[0].supervisores;
          this.supervisores_promotores_2 = this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores;
          this.ajusta_supervisores_2.emit(this.supervisores_2);
          this.ajusta_supervisores_promotores_2.emit(this.supervisores_promotores_2);
          $('#ventanaSP2').modal('show');
        });
      }
    });

    this.todos_usuarios_en_transito.subscribe((click) => {
      if (click == true) {
        /*Muestra todos los usuarios en Transito*/
        this.fotosservice.getSupervisoresPromotoresConCheckInOutServicios(3).subscribe((gSupervisoresPromotoresConCheckInOutServicios: any[]) => {
          this.supervisoresPromotoresConCheckInOutServicios = gSupervisoresPromotoresConCheckInOutServicios;
          this.supervisores_3 = this.supervisoresPromotoresConCheckInOutServicios[0].supervisores;
          this.supervisores_promotores_3 = this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores;
          this.ajusta_supervisores_3.emit(this.supervisores_3);
          this.ajusta_supervisores_promotores_3.emit(this.supervisores_promotores_3);
          $('#ventanaSP3').modal('show');
        });
      }
    });

    /* this.fotosservice.getcountUsuariosSinActividadServicios().subscribe((gUsuariosSinActividad: any[]) => {
       this.usuariosSinActividad = gUsuariosSinActividad[0].usuarios_sin_actividad;
     });
   }*/

    this.ranking_capturas_usuarios.subscribe((click) => {
      if (click == true) {
        this.fotosservice.getRankingCapturasUsuarios().subscribe((gRankingCapturasUsuarios: any[]) => {
          this.rankingCapturasUsuarios = gRankingCapturasUsuarios;
          $('#ventanaRC').modal('show');
        });
      }
    });

    this.ranking_promotor_actividad_hora.subscribe((click) => {
      if (click == true) {
        this.fotosservice.getRankingPromotorActividadHora().subscribe((gRankingPromotorActividadHora: any[]) => {
          this.rankingPromotorActividadHora = gRankingPromotorActividadHora;
          $('#ventanaRU').modal('show');
        });
      }
    });

    this.consulta_distancia_checkin.subscribe((click) => {
      if (click == true) {
        this.fotosservice.getvw_consuta_distanciachekin().subscribe((getvw_consuta_distanciachekin: any[]) => {
          this.ggetvw_consuta_distanciachekin = getvw_consuta_distanciachekin;
          $('#ventanaODM').modal('show');
        });
      }
    });

    this.consulta_usuarios_sin_actividad_hoy.subscribe((click) => {
      if (click == true) {
        this.fotosservice.getvw_usuariossinactividad_hoy().subscribe((getvw_usuariossinactividad_hoy: any[]) => {
          this.ggetvw_usuariossinactividad_hoy = getvw_usuariossinactividad_hoy;
          $('#ventanaRSA').modal('show');
        });
      }
    });

    this.consulta_checkin_sin_checkout.subscribe((click) => {
      if (click == true) {
        // Checkin sin Checkout
        this.fotosservice.getvw_checkinsincheckout(this.idempresa).subscribe((resultado: any[]) => {
          this.getvw_checkinsincheckout = resultado;
          $('#ventanachecinsincheckout').modal('show');
        });
      }
    });

    $('#tbl_obs').hide();
  }

  abrirVentanaModal(operacion: number = 0): void {
    switch (operacion) {
      case 0:
        this.titulo = "con/sin Actividad";
        this.bsTodos_usuarios_checkin_out_y_sin_checkout.next(true);
        break;
      case 1:
        this.titulo = "con Actividad";
        this.bsTodos_usuarios_checkin.next(true);
        break;
      case 2:
        this.titulo = "sin actividad";
        this.bsTodos_usuarios_checkin_out.next(true);
        break;
      case 3:
        this.titulo = "en tránsito";
        this.bsTodos_usuarios_en_transito.next(true);
        break;
    }
  }

  abrirVentanaModalRC() {
    this.bsRanking_capturas_usuarios.next(true);
  }
  abrirVentanaModalRU() {
    this.bsRanking_promotor_actividad_hora.next(true);
  }

  abrirVentanaModalODM() {
    this.bsConsulta_distancia_checkin.next(true);
  }

  abrirVentanaModalRSA() {
    $('#ventanaRSA').off('hide.bs.modal');
    $('#ventanaRSA').on('hide.bs.modal', () => {
      $('#tbl_obs').hide();
    });
    this.bsConsulta_usuarios_sin_actividad_hoy.next(true);
  }

  abrirVentanachecinsincheckout() {
    this.bsConsulta_checkin_sin_checkout.next(true);
  }

  selectObservaciones(idpromotor: any, usuario: any, observacion: any) {
    $('#tbl_obs').show();
    this.id = idpromotor;
    this.usuario = usuario;
    this.observacion = observacion;
  }

  guardarObservacion() {
    let observacion = { idpromotor: this.id, observacion: this.observacion };
    this.fotosservice.createObservacionesServicio(observacion).subscribe((observacion: any) => {
      //console.log("Observacion asignada: ", observacion);
      this.fotosservice.getvw_usuariossinactividad_hoy().subscribe((getvw_usuariossinactividad_hoy: any[]) => {
        this.ggetvw_usuariossinactividad_hoy = getvw_usuariossinactividad_hoy;
      });
    });
    $('#tbl_obs').hide();
  }

  cancelar() {
    $('#tbl_obs').hide();
  }

  scroll(el: any) {
    el.scrollIntoView();
  }

  verUbicaciones() {
    this.bsVer_ubicaciones_tiendas.next(true);
  }
}
