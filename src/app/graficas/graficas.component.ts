import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GraficasService } from 'app/Servicios/graficas.service';
import { CatPromotor } from 'app/Objetos/catpromotor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { Paginacion } from 'app/Objetos/paginacion';
import { MatPaginator } from '@angular/material';

declare var $;
declare var google;

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;

  encabezados = { "fecha": "Fecha", "promotor": "Promotor", "avance": "Avance" };
  filtrado: any = { FechaInicial: "", FechaFinal: "", idpromotor: 0 };
  promotores: CatPromotor[];
  asistencias: any[];
  asistencias_t: any[];
  efectividad: any[];
  form: any;
  idempresa: number = Number(localStorage.getItem('idempresa'));

  paginacion: Paginacion = new Paginacion();

  constructor(private graficasServicio: GraficasService,
    private _exportarExcel: ExportarExcelService) { }

  drawChart1 = () => {

    let arr = [["cadena", "El objetivo", "Checkin", "Checkout"]];
    console.log("datos");
    console.log(this.form);
    console.log("datos1");
    console.log(this.idempresa);
    this.graficasServicio.getGeneraDatosGraficaAsistensiasYEfectividadServicio(this.form, this.idempresa).subscribe((datosgenerados: any[]) => {
      console.log(datosgenerados);
      if (datosgenerados.length == 1) {
        console.log("datos generados: ", datosgenerados);
        if (datosgenerados[0].result == true) {
          this.graficasServicio.getGeneraDatosGraficaAsistensiasYEfectividadServicio1(this.form, this.idempresa).subscribe((datosgenerados_: any[]) => {
            if (datosgenerados_.length == 1) {
              console.log("datos generados2: ", datosgenerados_);
              this.graficasServicio.getDatosGraficaResumenVisitadasServicioServicio(this.idempresa).subscribe((grafica: any[]) => {
                this.asistencias = grafica;
                grafica.forEach(item => {
                  arr.push([item.cadena, parseFloat(item.elobjetivo), parseFloat(item.ctacheckin), parseFloat(item.ctacheckout)]);
                });
                let data = google.visualization.arrayToDataTable(arr);

                let options = {
                  height: 400,
                  width: 800,
                  chart: {
                    title: 'Gráfica de asistencias',
                    subtitle: '',
                  },
                  vAxis: {
                    format: 'decimal'
                  }
                };

                let chart = new google.charts.Bar(document.getElementById('grafica1'));

                chart.draw(data, google.charts.Bar.convertOptions(options));
                // console.log("Obtencion de datos de asistencias: ", this.asistencias);
                this.grafica2();
              });
            }
          });
        }
      }
    });

  }

  drawChart2 = () => {

    let arr = [["Cadena", "% Checkin", "% Checkout", "% Efectividad"]];

    this.graficasServicio.getDatosGraficaEfectividadResumenVisitadasServicio(this.idempresa).subscribe((grafica: any[]) => {
      this.efectividad = grafica;
      grafica.forEach(item => {
        arr.push([item.cadena, parseFloat(item.checkin), parseFloat(item.checkout), parseFloat(item.efectividad)]);
      });
      let data = google.visualization.arrayToDataTable(arr);

      let options = {
        height: 400,
        width: 800,
        isStacked: 'percent',
        chart: {
          title: 'Gráfica visitas efectividad',
          subtitle: '',
        },
        vAxis: {
          minValue: 0,
          maxValue: 100,
          format: '#\'%\''
        }
      };

      let chart = new google.charts.Bar(document.getElementById('grafica2'));

      chart.draw(data, google.charts.Bar.convertOptions(options));
      // console.log("Obtencion de datos de efectividad: y creación de grafica efectivad: ", this.efectividad);
    });
  }

  ngOnInit() {
    this.filtrado.FechaInicial = (new Date()).toISOString();
    this.filtrado.FechaFinal = (new Date()).toISOString();
    this.graficasServicio.getCmbPromotorservicios().subscribe((gpromotores: CatPromotor[]) => {
      this.promotores = gpromotores;
    });
  }

  ngAfterViewInit() {
    $('#ventanaRA').modal('hide');
  }

  grafica1(form: any) {
    this.form = form;
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(this.drawChart1);
  }

  grafica2() {
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(this.drawChart2);
  }

  exportarExcel(form: any) {
    if (this.form != null) {
      this.graficasServicio.getExportarGraficaAExcel(this.idempresa).subscribe((archvivo: any) => {
        //location.href = archvivo.url;
        if ((archvivo.status as boolean) == true) {
          var $a = $("<a>");
          $a.attr("href", archvivo.url);
          $("body").append($a);
          $a.attr("download", archvivo.nombre_archivo);
          $a[0].click();
          $a.remove();
        }
      });
    } else {
      this.form = form;
      this.grafica1(form);
    }
  }

  mostrarVentana(form: any) {
    this.form = form;
    if (this.form != null) {
      if (this.pag != null) {
        this.paginacion.page_number = 0;
        this.pag.firstPage();
      }
      this.form.idEmpresa = this.idempresa;
      console.log("Valores");
      console.log(this.form);

      this.graficasServicio.getDatosAsistenciasServicio(this.form, this.idempresa).subscribe((asistencias_t: any[]) => {
        this.asistencias_t = asistencias_t;
        // console.log("Lista de asistencias: ", this.asistencias_t);
        $('#ventanaRA').modal('show');
      });
    }
  }

}
