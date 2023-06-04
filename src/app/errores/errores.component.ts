import { Component, OnInit } from '@angular/core';
import { ErroresService } from 'app/Servicios/errores.service';
import { Errores } from 'app/Objetos/errores';
import { Paginacion } from 'app/Objetos/paginacion';
import { FiltradoErrores } from 'app/Objetos/filtraerrores';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.scss']
})
export class ErroresComponent implements OnInit {
  selected: number;
  form: any;
  errores: Errores[];
  Atendido: any[];
  AtendidoPor: any[];
  paginacion: Paginacion = new Paginacion();

  filtradoerrores: any = { FechaInicial: "", FechaFinal: "", Usuario: "", Fabricante: "", Modelo: "" };

  selectedError: Errores = {
    iderror: null,
    fabricante: null,
    marca: null,
    modelo: null,
    board: null,
    hardware: null,
    serie: null,
    uid: null,
    android_id: null,
    resolucion: null,
    tamaniopantalla: null,
    densidad: null,
    bootloader: null,
    user_value: null,
    host_value: null,
    version: null,
    api_value: null,
    build_id: null,
    build_time: null,
    fingerprint: null,
    usuario: null,
    error: null,
    fechahora: null,
    seccion: null,
    idatendido: null,
    idatendidopor: null,
    versionsolucion: null,
    solucion: null,
  };

  constructor(
    private erroresService: ErroresService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.filtradoerrores.FechaInicial = (new Date()).toISOString();
    this.filtradoerrores.FechaFinal = (new Date()).toISOString();

    this.erroresService.getAtendido().subscribe((atendido: any[]) => {
      this.Atendido = atendido;
      console.log("lista de opciones atendido ", atendido);

    });

    this.erroresService.getAtendidoPor().subscribe((atendidopor: any[]) => {
      this.AtendidoPor = atendidopor;
      console.log("lista de opciones atendido por ", atendidopor);
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

  buscaErrores(forma) {
    this.form = forma;
    console.log(`FechaInicial: ${forma.value.FechaInicial}, FechaFinal: ${forma.value.FechaFinal}, Usuario: ${forma.value.Usuario}, Fabricante: ${forma.value.Fabricante}, Modelo: ${forma.value.Modelo}`);
    this.erroresService.getErrores(forma.value).subscribe((gerrores: Errores[]) => {
      this.errores = gerrores;
      console.log("lista de errores, ", this.errores);
    });
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

  setSelectedTab(index) {
    this.selected = index;
  }

  selectErrores(error: Errores) {
    this.selectedError = error;
    console.log("Error seleccionado, ", this.selectedError);
  }

  actualizaRegistro(error: Errores) {
    this.erroresService.actualizaError(error).subscribe((res: any) => {
      if (res.idResp == 0) {
        this.toaster.success(res.Mensaje, "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
      } else {
        this.toaster.error(res.Mensaje, "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
        console.log(res.sql);
      }
      console.log(res);
    });
  }

}
