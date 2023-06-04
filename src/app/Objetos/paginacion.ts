import { PageEvent,MatPaginatorIntl } from "@angular/material/paginator";

export class Paginacion extends MatPaginatorIntl{
    page_size: number = 10;
    page_number: number = 0;
    pageSizeOptions: number[] = [10];

    constructor(){super();}

    handlePage(event: PageEvent) {
        this.page_size = event.pageSize;
        this.page_number = event.pageIndex;
    }

    itemsPerPageLabel = 'Numero de registros por pagina'; 
    nextPageLabel     = 'Siguiente';
    previousPageLabel = 'Anterior';
  
    getRangeLabel = function (page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return '0 de ' + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return startIndex + 1 + ' - ' + endIndex + ' / ' + length;
    };

}
