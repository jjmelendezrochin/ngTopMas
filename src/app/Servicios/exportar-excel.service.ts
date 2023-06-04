import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const EXCEL_EXT = "xlsx";

@Injectable({
  providedIn: 'root'
})
export class ExportarExcelService {

  nombreArchivo: string = "";

  constructor() { }

  exportarExcel(arr: any[], EncabezadosColumnas): void {
    var date = new Date();
    if (arr.length > 0) {
      var book = XLSX.utils.book_new();
      book.Props = {
        Title: "Registros exportados",
        Subject: "",
        Author: "jjcorp",
        CreatedDate: date
      };
      book.SheetNames.push(this.nombreArchivo);

      var ancho_culumnas = [];
      var table = [];
      var row = [];

      /* Asigna encabezados a la hoja */
      for (key in EncabezadosColumnas) {
        row.push(EncabezadosColumnas[key]);
      }
      table.push(row);

      /* Extrae solo los campos indicados de cada registro del arreglo principal*/
      for (var i = 0; i < arr.length; i++) {
        row = []
        for (var key in EncabezadosColumnas) {
          if (arr[i][key] != null) {
            row.push(arr[i][key].toString());
          } else {
            row.push(arr[i][key]);
          }
        }
        table.push(row);
      }

      /* Asigna ancho de columnas */
      var ancho_col = this.asignarAnchoColumnas(table);
      for (var i = 0; i < ancho_col.length; i++) {
        ancho_culumnas.push({ wch: ancho_col[i] });
      }

      let ws = XLSX.utils.aoa_to_sheet(table);
      var range = XLSX.utils.decode_range(ws['!ref']);


      ws["!cols"] = ancho_culumnas;
      book.Sheets[this.nombreArchivo] = ws;
      /* book.Sheets[this.nombreArchivo].A1.s = { fill: { patternType: "solid", fgColor: { rgb: "FF000000" }, bgColor: { rgb: "00000000" } } };      
 console.log(book.Sheets[this.nombreArchivo].A1);*/
      var wbout = XLSX.write(book, { bookType: EXCEL_EXT, bookSST: false, type: "binary" });

      FileSaver.saveAs(new Blob([this.s2ab(wbout)], { type: "" }), `${this.nombreArchivo}_${date.getTime()}.${EXCEL_EXT}`);
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
