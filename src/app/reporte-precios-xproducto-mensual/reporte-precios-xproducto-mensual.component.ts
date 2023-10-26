import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOption, MatSelect } from '@angular/material';
import { Paginacion } from 'app/Objetos/paginacion';
import { ReportePreciosXproductoMensualService } from 'app/Servicios/reporte-precios-xproducto-mensual.service';

declare var $;
declare var google;

@Component({
  selector: 'app-reporte-precios-xproducto-mensual',
  templateUrl: './reporte-precios-xproducto-mensual.component.html',
  styleUrls: ['./reporte-precios-xproducto-mensual.component.scss']
})
export class ReportePreciosXproductoMensualComponent implements OnInit {
  @ViewChild('anio', { static: false }) anio: MatSelect;
  @ViewChild('mes', { static: false }) mes: MatSelect;

  paginacion = new Paginacion();

  filas: number;
  anios: any[] = [];
  dias: any[] = [];
  meses: any[];
  productos: any[];
  precios: any[];
  grafica: any[];
  filtrado: any = { anio: null, mes: 0, producto: 0, idEmpresa: 0 };
  idempresa: number = Number(localStorage.getItem('idempresa'));


  constructor(private reporteService: ReportePreciosXproductoMensualService) { }

  drawChart = () => {

    let regs = [];
    this.grafica.forEach((value: any, index: number, array: any[]) => {
      let campos = [];
      if (index == 0) {
        campos.push('Fecha');
      } else {
        campos.push(new Date(parseInt((this.anio.selected as MatOption).viewValue), parseInt((this.mes.selected as MatOption).value) - 1, index));
      }
      for (let i = 0; i < this.filas; i++) {
        campos.push((index == 0) ? value[`cadena${i}`] : parseFloat(value[`cadena${i}`]));
      }
      regs.push(campos);
    });
    if (regs.length > 1) {
      console.log(regs);
      var data = google.visualization.arrayToDataTable(regs);

      var options = {
        title: `Precios por Cadena Mes de ${(this.mes.selected as MatOption).viewValue} de ${(this.anio.selected as MatOption).viewValue}`,
        //        curveType: 'function',
        hAxis: {
          title: 'Fecha',
          format: 'MM/d/y'
        },
        vAxis: {
          title: 'Precios'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('grafica'));

      chart.draw(data, options);
    }
    else {
      document.getElementById('grafica').innerHTML = ''; //Limpia grafica
    }
  }

  graficar() {
    google.charts.load('current', { 'packages': ['corechart', 'line'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  ngOnInit() {

    for (let i = 2020; i <= 2050; i++) {
      this.anios.push({ anio: i });
    }
    this.filtrado.anio = this.anios[0].anio;
    this.reporteService.getCmbMesesservicios().subscribe((gmeses: any[]) => {
      this.meses = gmeses;
      this.filtrado.mes = `${new Date().getMonth() + 1}`;
      // console.log("Lista de meses: ", this.meses);
    });
    this.reporteService.getCmbProductosservicios(this.idempresa).subscribe((gproductos: any[]) => {
      // console.log("idEmpresa " + this.idempresa);
      this.productos = gproductos;
      if (gproductos.length > 0) {
        this.filtrado.producto = gproductos[0].idproducto;
      }
      // console.log("Lista de productos: ", this.productos);
    });
  }

  ExportarGrafica(E: any = 0) {
    console.log("idEmpresa " + this.idempresa);
    this.filtrado.idEmpresa = this.idempresa;
    console.log("Lista de filtrado: ", this.filtrado);
    this.reporteService.getReportePreciosXProductoMensualservicios(this.filtrado, this.idempresa, E).subscribe((gprecios: any[]) => {
      if (E == 0) {
        this.precios = gprecios[0].tabla;
        this.grafica = gprecios[0].grafica;
        this.filas = gprecios[0].filas;
        let num_dias = this.precios[this.precios.length - 1].dias;//Extrae el numero de dias
        this.dias = [];
        for (let i = 1; i <= parseInt(num_dias); i++) {
          this.dias.push({ dia: i });
        }
        this.precios.pop(); //Excluye el ultimo registro de donde se obtiene el numero de dias
        this.graficar();
        // console.log("Lista de precios mensuales de un producto: ", this.precios);
        // console.log("Lista de precios mensuales para graficar: ", this.grafica);
        // console.log("Total de registros: ", this.filas);
      } else if (E == 1) {
        //window.location.href = gprecios[0].url;
        if ((gprecios[0].status as boolean) == true) {
          var $a = $("<a>");
          $a.attr("href", gprecios[0].url);
          $("body").append($a);
          $a.attr("download", gprecios[0].nombre_archivo);
          $a[0].click();
          $a.remove();
        }
        // console.log("Excel descargado");
      }
    });
  }

}
