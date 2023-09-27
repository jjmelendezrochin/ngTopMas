import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CatEmpresaService } from 'app/Servicios/cat-empresa.service';
import { GestionAjusteAcumuladoService } from 'app/Servicios/gestion-ajuste-acumulado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-ajuste-acumulado',
  templateUrl: './gestion-ajuste-acumulado.component.html',
  styleUrls: ['./gestion-ajuste-acumulado.component.scss'],
  providers: [
    DatePipe
  ]
})
export class GestionAjusteAcumuladoComponent implements OnInit {

  empresas: any[] = [];

  filtrado = {
    idempresa: '',
    fecha: '',
    ajuste_acumulado: ''
  }

  constructor(
    private catempresaService: CatEmpresaService,
    private gestionAjusteAcumuladoService: GestionAjusteAcumuladoService,
    private toaster: ToastrService,
    private datePipe: DatePipe
  ) {
    this.catempresaService.getAllCatEmpresa().subscribe((gempresa: any[]) => {
      this.empresas = gempresa;
      // console.log("lista de empresas, ", this.empresas);
    });
  }

  ngOnInit() {
  }

  GuardarAjusteAcumulado() {
    this.filtrado.fecha = this.datePipe.transform(this.filtrado.fecha, 'yyyy-MM-dd');
    this.gestionAjusteAcumuladoService.GuardarAjusteAcumulado(this.filtrado).subscribe((res: any) => {
      if (parseInt(res.idRes) == 0) {
        this.toaster.success(res.Mensaje, "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
      } else {
        this.toaster.error(res.Mensaje, "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
      }
    });
  }

}
