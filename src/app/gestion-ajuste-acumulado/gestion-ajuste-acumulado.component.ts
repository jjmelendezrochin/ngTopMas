import { Component, OnInit } from '@angular/core';
import { CatEmpresaService } from 'app/Servicios/cat-empresa.service';

@Component({
  selector: 'app-gestion-ajuste-acumulado',
  templateUrl: './gestion-ajuste-acumulado.component.html',
  styleUrls: ['./gestion-ajuste-acumulado.component.scss']
})
export class GestionAjusteAcumuladoComponent implements OnInit {

  empresas: any[] = [];

  filtrado = {
    idempresa: '',
    fecha: '',
    ajuste_acumulado: ''
  }

  constructor(
    private catempresaService: CatEmpresaService
  ) {
    this.catempresaService.getAllCatEmpresa().subscribe((gempresa: any[]) => {
      this.empresas = gempresa;
      // console.log("lista de empresas, ", this.empresas);
    });
  }

  ngOnInit() {
  }

  GuardarAjusteAcumulado() {

  }

}
