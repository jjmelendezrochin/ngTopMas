import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = "application/octet-stream";
const EXCEL_EXT = ".xls";

@Injectable({
  providedIn: 'root'
})
export class ExportarExcelService {

  nombreArchivo: string = "";

  constructor() { }

  exportarExcel(arr: any[], EncabezadosColumnas: any[]): void {
    var date = new Date();
    if (arr.length > 0) {
      var book = XLSX.utils.book_new();
      book.Props = {
        Title: "",
        Subject: "",
        Author: "",
        CreatedDate: date
      };
      book.SheetNames.push(this.nombreArchivo);

      var ancho_culumnas = [];
      var table = [];
      var row = null;

      /* Extrae solo los campos indicados de cada registro del arreglo principal*/
      for (var i = 0; i < arr.length; i++) {
        row = []
        for (var key in EncabezadosColumnas) {
          row.push(arr[i][key].toString());
        }
        table.push(row);
      }

      /* Asigna ancho de columnas */
      var ancho_col = this.asignarAnchoColumnas(table);
      for (var i = 0; i < ancho_col.length; i++) {
        ancho_culumnas.push({ hpt: ancho_col[i] * 15 });
      }

      var ws = XLSX.utils.json_to_sheet(table);
      var range = XLSX.utils.decode_range(ws['!ref']);

      /* Asigna encabezados a la hoja */
      var C = range.s.r;
      for (key in EncabezadosColumnas) {
        var address = XLSX.utils.encode_col(C) + "1";
        if (!ws[address]) continue;
        ws[address].v = EncabezadosColumnas[key];
        ++C
      }
      
      
      book.Sheets[this.nombreArchivo] = ws;
      var wbout = XLSX.write(book, { bookType: "xls", type: "binary" });

      FileSaver.saveAs(new Blob([this.s2ab(wbout)], { type: EXCEL_TYPE }), `${this.nombreArchivo}_${date.getTime()}${EXCEL_EXT}`);
    }
  }

  asignarAnchoColumnas(json: any[]): any {
    let objectMaxLength = [];
    for (let i = 0; i < json.length; i++) {
      let keys = <any>Object.keys(json[i]);
      for (var key in keys) {
        for (let j = 0; j < json[key].length; j++) {
          if (typeof json[key][j] == "number") {
            objectMaxLength[j] = 10;
          } else {
            objectMaxLength[j] =
              objectMaxLength[j] >= json[key][j].length
                ? objectMaxLength[j]
                : json[key][j].length;
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
