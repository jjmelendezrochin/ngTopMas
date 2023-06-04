import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const EXCEL_EXT = "xlsx";

@Injectable({
  providedIn: 'root'
})
export class GenerarReporteExcelService {

  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;    // Definiciòn de los servicios de base de datos

  //PHP_API_SERVER = "http://localhost";


  constructor(private httpClient: HttpClient) { }

  // *********************************************
  // Genera reporte de excel en https://www.topmas.mx/#/distancia
  getReporteExcelServicio(filtro: any): Observable<any> {
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/ReportesExcel/getReportesExcel.php`, filtro);
  }

  generarReporteExcel(form: any) {
    var date = new Date();
    this.getReporteExcelServicio(form).subscribe((tabs: any) => {
      if (tabs.Estancia.length > 0 /*&& tabs.Cadenas.length > 0*/) {
        let cadenas = {};

        var book = XLSX.utils.book_new();
        book.Props = {
          Title: "Registros exportados",
          Subject: "",
          Author: "jjcorp",
          CreatedDate: date
        };

        let tabla = [];
        let row = [];
        let ancho_culumnas = [];

        /* Hoja de estancia */
        book.SheetNames.push("Estancia");

        tabla = [["Fecha", "Promotor", "Cadena", "Formato", "Tienda", "CHECK IN", "Distancia", "CHECK OUT", "Distancia 2", "Estancia",  "Objetivo", "Checkin", "Checkout"]];

        for (let estancia of tabs.Estancia) {
          row = [];
          for (let campo in estancia) {
            row.push(estancia[campo]);
          }
          tabla.push(row);
        }

        /* Asigna ancho de columnas */
        var ancho_col = this.asignarAnchoColumnas(tabla);
        for (var i = 0; i < ancho_col.length; i++) {
          ancho_culumnas.push({ wch: ancho_col[i] });
        }

        /* Asigna contenido a la hoja */
        let ws = XLSX.utils.aoa_to_sheet(tabla);
        let range = XLSX.utils.decode_range(ws['!ref']);

        /* Se ajusta el ancho de las columnas de acuerdo al contenido */
        ws["!cols"] = ancho_culumnas;
        book.Sheets["Estancia"] = ws;

        /* Agrupacion de los registros de cadenas */
        for (let cadena of tabs.Cadenas) {
          this.agruparRegistrosPorCadena(cadenas, cadena.Cadena, `{"Fecha":"${cadena.Fecha}","Promotor":"${cadena.Promotor}","Formato":"${cadena.formato}","Tienda":"${cadena.Tienda}","Actividad":"${cadena.Actividad}","Fecha y hora":"${cadena.FechaHora}","Distancia":"${cadena.Distancia_m}"}`);
        }


        /* Hojas de las cadenas */

        /* Recorre el grupo de cadenas*/
        for (let key in cadenas) {
          tabla = [["FECHA", "PROMOTOR", "FORMATO", "TIENDA", "ACTIVIDAD", "FECHA Y HORA", "DISTANCIA"]];
          book.SheetNames.push(key.toString().toUpperCase());//Añede hoja al libro

          /* Recorre todos los registros del grupo actual */
          for (let registro of cadenas[key]) {
            row = [];

            /* Recorre todos lo campos */
            for (let campo in registro) {
              row.push(registro[campo]);
            }
            tabla.push(row);
          }

          /* Asigna ancho de columnas */
          var ancho_col = this.asignarAnchoColumnas(tabla);
          for (var i = 0; i < ancho_col.length; i++) {
            ancho_culumnas.push({ wch: ancho_col[i] });
          }

          /* Asigna contenido a la hoja */
          let ws = XLSX.utils.aoa_to_sheet(tabla);
          let range = XLSX.utils.decode_range(ws['!ref']);

          /* Se ajusta el ancho de las columnas de acuerdo al contenido */
          ws["!cols"] = ancho_culumnas;
          book.Sheets[key.toString().toUpperCase()] = ws;
        }

        let wbout = XLSX.write(book, { bookType: EXCEL_EXT, bookSST: false, type: "binary" });

        FileSaver.saveAs(new Blob([this.s2ab(wbout)], { type: "" }), `Reporte_${date.getTime()}.${EXCEL_EXT}`);

        // console.log("Generacion del excel satisfactoria");
      }
    });
  }

  /* metodo que se encarga de agrupar registros por cadena */
  agruparRegistrosPorCadena(json, cadena: string, reg: any): void {
    let encontrado: boolean = false;
    for (let key in json) {
      if (key.toString().toUpperCase() == cadena.toString().toUpperCase()) {
        eval(`json["${cadena}"].push(${reg});`);
        encontrado = true;
        break;
      }
    }
    if (encontrado == false) {
      eval(`json["${cadena}"] = [${reg}];`);
    }
  }

  asignarAnchoColumnas(json: any[]): any {
    let objectMaxLength = [];
    if (json != null) {
      let col = json[0].length;
      for (let c = 0; c < col; c++) {
        for (let i = 0; i < json.length; i++) {
          if (json[i][c] != null) {
            objectMaxLength[c] =
              objectMaxLength[c] >= json[i][c].length
                ? objectMaxLength[c]
                : json[i][c].length + 5;
          }
        }
      }
    }
    return objectMaxLength;
  }

  private s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
  }

}
