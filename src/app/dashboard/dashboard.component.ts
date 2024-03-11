import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  supervisores_0: any[] = [];
  supervisores_promotores_0: any[] = [];

  supervisores_1: any[] = [];
  supervisores_promotores_1: any[] = [];

  supervisores_2: any[] = [];
  supervisores_promotores_2: any[] = [];

  supervisores_3: any[] = [];
  supervisores_promotores_3: any[] = [];

  idempresa: number = Number(localStorage.getItem('idempresa'));

  empresa: string = '';

  titulo: string;

  titulo_contador_objetivo_visitas: string = '';
  titulo_contador_objetivo_tiendas: string = '';
  titulo_contador_acumulado: string = '';
  titulo_contador_avance_al_dia: string = '';
  titulo_contador_total_usuarios: string = '';
  titulo_contador_usuarios_activos: string = '';
  titulo_contador_usuarios_inactivos: string = '';
  titulo_contador_usuarios_en_transito: string = '';

  constructor(
  ) {
    if (this.idempresa != 2) {
      this.titulo_contador_objetivo_visitas = 'Objetivo de visitas';
      this.titulo_contador_objetivo_tiendas = 'Objetivo mensual de tiendas';
      this.titulo_contador_acumulado = 'Acumulado de visitas a Pdv';
      this.titulo_contador_avance_al_dia = '% de avance al día'; //anteriormente el titulo era: Visitas registradas al día
      this.titulo_contador_total_usuarios = 'Total de usuarios';
      this.titulo_contador_usuarios_activos = 'Usuarios Activos';
      this.titulo_contador_usuarios_inactivos = 'Usuarios Inactivos';
      this.titulo_contador_usuarios_en_transito = 'Usuarios en Tránsito'; //anteriormente el titulo era: Usuarios en Tránsito
    } else {
      this.titulo_contador_objetivo_visitas = 'Objetivo de visitas';
      this.titulo_contador_objetivo_tiendas = 'Objetivo semanal de tiendas';
      this.titulo_contador_acumulado = 'Acumulado de visitas a Pdv semanal';
      this.titulo_contador_avance_al_dia = '% de avance al día'; //anteriormente el titulo era: Visitas registradas al día
      this.titulo_contador_total_usuarios = 'Total de usuarios';
      this.titulo_contador_usuarios_activos = 'Usuarios Activos';
      this.titulo_contador_usuarios_inactivos = 'Usuarios Inactivos';
      this.titulo_contador_usuarios_en_transito = 'Tiendas sin activar'; //anteriormente el titulo era: Usuarios en Tránsito
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
