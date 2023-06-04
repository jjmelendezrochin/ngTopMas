import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as Chartist from 'chartist';
import { ToastrService } from 'ngx-toastr';
import { usuario } from 'app/Objetos/usuario';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FotosService } from '../Servicios/fotos.service'
import { Mapas } from 'app/Objetos/mapas';
import { ThrowStmt } from '@angular/compiler';
import { environment } from 'environments/environment';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) map: ElementRef;
  usr: any;
  mapas: Mapas;
  titulo: string;
  Total_usuarios: string;
  Total_usuarios_activos: string;
  Total_usuarios_inactivos: string;
  Usuarios_transito: string;  
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
  empresa : any;
  idempresa : number = Number(localStorage.getItem('idempresa'));

  //  paginacion = new Paginacion();

  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router,
    private fotosservice: FotosService
  ) {
  }

  public obtenerUsuario() {
    return this.userService.usserLogged;
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
    this.mapas = new Mapas();
    this.mapas.Maps_Tiendas(this.fotosservice);
    this.mapas.iniciarGMaps_ListaUbicacionesTiedas(this.map);
    this.fotosservice.obtenerdatospanel(this.idempresa).subscribe((gfoto: any[]) => {
      this.Total_tiendas = gfoto[0].Total_tiendas;
      this.Tiendas_visitadas = gfoto[0].Tiendas_visitadas;
      this.Tiendas_sin_visitar = gfoto[0].Tiendas_sin_visitar;
      this.Visitas_Diarias = gfoto[0].Visitas_Diarias;
      this.Total_usuarios = gfoto[0].Total_usuarios;
      this.Total_usuarios_activos = gfoto[0].Total_usuarios_activos;
      this.Total_usuarios_inactivos = gfoto[0].Total_usuarios_inactivos;
      this.Usuarios_transito = gfoto[0].Usuarios_transito;
      this.FechaHora = gfoto[0].FechaHora;
      this.empresa= gfoto[0].NombreEmpresa;
    });
    /*Muestra todos los usuarios que tienen check-in y check-out e incluyendo los que no tienen check-out*/
    this.fotosservice.getSupervisoresPromotoresConCheckInOutServicios().subscribe((gSupervisoresPromotoresConCheckInOutServicios: any[]) => {
      this.supervisoresPromotoresConCheckInOutServicios = gSupervisoresPromotoresConCheckInOutServicios;
      if (this.supervisoresPromotoresConCheckInOutServicios[0].supervisores != null) {
        for (let supervisorPromotorConCheckInOut of this.supervisoresPromotoresConCheckInOutServicios[0].supervisores) {
          let tr = `<tr style="color:${supervisorPromotorConCheckInOut.color}">
            <td>${supervisorPromotorConCheckInOut.letrazona}</td>
            <td colspan="2">${supervisorPromotorConCheckInOut.Supervisor}</td>
            </tr>`;
          $('#regs_').append(tr);
        }
      }
      if (this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores != null) {
        for (let supervisorPromotorConCheckInOut of this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores) {
          let tr = `<tr style="color:${supervisorPromotorConCheckInOut.color}">
            <td>${supervisorPromotorConCheckInOut.letrazona}</td>
            <td>${supervisorPromotorConCheckInOut.Supervisor}</td>
            <td>${supervisorPromotorConCheckInOut.Promotor}</td>
            </tr>`;
          $('#regs').append(tr);
        }
      }
    });
    /*Muestra todos los usuarios que solo tienen check-in*/
    this.fotosservice.getSupervisoresPromotoresConCheckInOutServicios(1).subscribe((gSupervisoresPromotoresConCheckInOutServicios: any[]) => {
      this.supervisoresPromotoresConCheckInOutServicios = gSupervisoresPromotoresConCheckInOutServicios;
      if (this.supervisoresPromotoresConCheckInOutServicios[0].supervisores != null) {
        for (let supervisorPromotorConCheckInOut of this.supervisoresPromotoresConCheckInOutServicios[0].supervisores) {
          let tr = `<tr style="color:${supervisorPromotorConCheckInOut.color}">
            <td>${supervisorPromotorConCheckInOut.letrazona}</td>
            <td colspan="2">${supervisorPromotorConCheckInOut.Supervisor}</td>
            </tr>`;
          $('#regs_1').append(tr);
        }
      }
      if (this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores != null) {
        for (let supervisorPromotorConCheckInOut of this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores) {
          let tr = `<tr style="color:${supervisorPromotorConCheckInOut.color}">
            <td>${supervisorPromotorConCheckInOut.letrazona}</td>
            <td>${supervisorPromotorConCheckInOut.Supervisor}</td>
            <td>${supervisorPromotorConCheckInOut.Promotor}</td>
            </tr>`;
          $('#regs1').append(tr);
        }
      }
    });
    /*Muestra todos los usuarios que tienen check-in y check-out*/
    this.fotosservice.getSupervisoresPromotoresConCheckInOutServicios(2).subscribe((gSupervisoresPromotoresConCheckInOutServicios: any[]) => {
      this.supervisoresPromotoresConCheckInOutServicios = gSupervisoresPromotoresConCheckInOutServicios;
      if (this.supervisoresPromotoresConCheckInOutServicios[0].supervisores != null) {
        for (let supervisorPromotorConCheckInOut of this.supervisoresPromotoresConCheckInOutServicios[0].supervisores) {
          let tr = `<tr style="color:${supervisorPromotorConCheckInOut.color}">
            <td>${supervisorPromotorConCheckInOut.letrazona}</td>
            <td colspan="2">${supervisorPromotorConCheckInOut.Supervisor}</td>
            </tr>`;
          $('#regs_2').append(tr);
        }
      }
      if (this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores != null) {
        for (let supervisorPromotorConCheckInOut of this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores) {
          let tr = `<tr style="color:${supervisorPromotorConCheckInOut.color}">
                <td>${supervisorPromotorConCheckInOut.letrazona}</td>
                <td>${supervisorPromotorConCheckInOut.Supervisor}</td>
                <td>${supervisorPromotorConCheckInOut.Promotor}</td>
                </tr>`;
          $('#regs2').append(tr);
        }
      }
    });
    /*Muestra todos los usuarios en Transito*/
    this.fotosservice.getSupervisoresPromotoresConCheckInOutServicios(3).subscribe((gSupervisoresPromotoresConCheckInOutServicios: any[]) => {
      this.supervisoresPromotoresConCheckInOutServicios = gSupervisoresPromotoresConCheckInOutServicios;
      if (this.supervisoresPromotoresConCheckInOutServicios[0].supervisores != null) {
        for (let supervisorPromotorConCheckInOut of this.supervisoresPromotoresConCheckInOutServicios[0].supervisores) {
          let tr = `<tr style="color:${supervisorPromotorConCheckInOut.color}">
            <td>${supervisorPromotorConCheckInOut.letrazona}</td>
            <td colspan="2">${supervisorPromotorConCheckInOut.Supervisor}</td>
            </tr>`;
          $('#regs_3').append(tr);
        }
      }
      if (this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores != null) {
        for (let supervisorPromotorConCheckInOut of this.supervisoresPromotoresConCheckInOutServicios[0].supervisores_promotores) {
          let tr = `<tr style="color:${supervisorPromotorConCheckInOut.color}">
                  <td>${supervisorPromotorConCheckInOut.letrazona}</td>
                  <td>${supervisorPromotorConCheckInOut.Supervisor}</td>
                  <td>${supervisorPromotorConCheckInOut.Promotor}</td>
                  </tr>`;
          $('#regs3').append(tr);
        }
      }
    });
    this.fotosservice.getcountUsuariosSinActividadServicios().subscribe((gUsuariosSinActividad: any[]) => {
      this.usuariosSinActividad = gUsuariosSinActividad[0].usuarios_sin_actividad;
    });
    this.fotosservice.getRankingCapturasUsuarios().subscribe((gRankingCapturasUsuarios: any[]) => {
      this.rankingCapturasUsuarios = gRankingCapturasUsuarios;
    });
    this.fotosservice.getRankingPromotorActividadHora().subscribe((gRankingPromotorActividadHora: any[]) => {
      this.rankingPromotorActividadHora = gRankingPromotorActividadHora;
    });
    this.fotosservice.getvw_consuta_distanciachekin().subscribe((getvw_consuta_distanciachekin: any[]) => {
      this.ggetvw_consuta_distanciachekin = getvw_consuta_distanciachekin;
    });
    this.fotosservice.getvw_usuariossinactividad_hoy().subscribe((getvw_usuariossinactividad_hoy: any[]) => {
      this.ggetvw_usuariossinactividad_hoy = getvw_usuariossinactividad_hoy;
    });
    // ********************
    // Checkin sin Checkout
    this.fotosservice.getvw_checkinsincheckout(this.idempresa).subscribe((resultado: any[]) => {
      this.getvw_checkinsincheckout = resultado;
    });
    $('#tbl_obs').hide();
  }

  abrirVentanaModal(operacion: number = 0): void {
    switch (operacion) {
      case 0:
        this.titulo = "con/sin Actividad";
        $('#regs,#regs_').show();
        $('#regs1,#regs_1').hide();
        $('#regs2,#regs_2').hide();
        $('#regs3,#regs_3').hide();
        break;
      case 1:
        this.titulo = "con Actividad";
        $('#regs,#regs_').hide();
        $('#regs1,#regs_1').show();
        $('#regs2,#regs_2').hide();
        $('#regs3,#regs_3').hide();
        break;
      case 2:
        this.titulo = "sin actividad";
        $('#regs,#regs_').hide();
        $('#regs1,#regs_1').hide();
        $('#regs2,#regs_2').show();
        $('#regs3,#regs_3').hide();
        break;
      case 3:
        this.titulo = "en tránsito";
        $('#regs,#regs_').hide();
        $('#regs1,#regs_1').hide();
        $('#regs2,#regs_2').hide();
        $('#regs3,#regs_3').show();
        break;
    }
    $('#ventanaSP').modal('show');
  }

  abrirVentanaModalRC() {
    $('#ventanaRC').modal('show');
  }
  abrirVentanaModalRU() {
    $('#ventanaRU').modal('show');
  }

  abrirVentanaModalODM() {
    $('#ventanaODM').modal('show');
  }

  abrirVentanaModalRSA() {
    $('#ventanaRSA').on('hide.bs.modal', () => {
      $('#tbl_obs').hide();
    });
    $('#ventanaRSA').modal('show');
  }

  abrirVentanachecinsincheckout() {
    $('#ventanachecinsincheckout').modal('show');
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

}
