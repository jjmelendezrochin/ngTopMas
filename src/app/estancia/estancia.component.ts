import { Component, OnInit } from '@angular/core';
import { FotosService } from '../Servicios/fotos.service';
import { Paginacion } from 'app/Objetos/paginacion';
import { FiltradoFotos } from 'app/Objetos/filtradofotos';
import { CatRutasService } from 'app/Servicios/cat-rutas.service';
import { CatRutas } from 'app/Objetos/catrutas';
import { ToastrService } from 'ngx-toastr';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';

@Component({
  selector: 'app-estancia',
  templateUrl: './estancia.component.html',
  styleUrls: ['./estancia.component.scss']
})
export class EstanciaComponent implements OnInit {
  encabezados = { "promotor": "Promotor", "Tienda": "Tienda", "estancia": "Estancia", "fecha": "Fecha" };
  fotoestancia: any[];
  promotores: any[];
  catrutas: CatRutas[];
  filtradofotos: FiltradoFotos = { FechaInicial: "", FechaFinal: "", idoperacion: null, Tienda: "0", idpromotor: 0, idcadena: null, Actividad: null, orden: 0 };
  idempresa : number = Number(localStorage.getItem('idempresa'));
  paginacion = new Paginacion();

  constructor(private fotosService: FotosService, private catrutasService: CatRutasService, private toaster: ToastrService, private exportarExcel: ExportarExcelService) { }

  ngOnInit() {
    this.filtradofotos.FechaInicial = (new Date()).toISOString();
    this.exportarExcel.nombreArchivo = "estancias";
    this.catrutasService.getrutasservicios().subscribe((catrutas: CatRutas[]) => {
      this.catrutas = catrutas;
      // console.log("lista de rutas", this.catrutas);
    });
    this.fotosService.getPromotorServicios().subscribe((promotores: any[]) => {
      this.promotores = promotores;
      // console.log("lista de promotores, ", this.promotores);
    });
  }

  consultar(form) {
    /*if (form.value.FechaInicial != "") {*/
    this.fotosService.getFotosEstanciaServicios(form.value).subscribe((fotoestancia: any[]) => {
      this.fotoestancia = fotoestancia;
      // console.log("Lista de estancias: ", this.fotoestancia);
    });
    /* } else {
       this.toaster.warning("Debe establecer la fecha inicial y la fecha final", "", {
         timeOut: 3000,
         positionClass: 'toast-bottom-center'
       });
     }*/
  }

}
