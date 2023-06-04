import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { CatEmpresa } from 'app/Objetos/catempresa';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { Paginacion } from 'app/Objetos/paginacion';
import { usuario } from 'app/Objetos/usuario';
import { CatEmpresaService } from 'app/Servicios/cat-empresa.service';
import { CatPromocionesService } from 'app/Servicios/cat-promociones.service';
import { UserService } from 'app/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cat-promociones',
  templateUrl: './cat-promociones.component.html',
  styleUrls: ['./cat-promociones.component.scss']
})
export class CatPromocionesComponent implements OnInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild('pag1', { static: false }) pag1: MatPaginator;
  @ViewChild('pag2', { static: false }) pag2: MatPaginator;
  @ViewChild("tabla_promociones", { static: false }) tabla_promociones: ElementRef;
  encabezados = { "nombreempresa": "Empresa", "nombre": "Nombre", "capacidad": "Capacidad", "canal": "Canal", "actividad": "Actividad" };
  selected: number;
  usr: usuario;
  paginacion: Paginacion = new Paginacion();
  paginacion1: Paginacion = new Paginacion();
  paginacion2: Paginacion = new Paginacion();
  promociones: any[];
  empresas: CatEmpresa[];
  formatosDisponibles: any[];
  formatosPorPromocion: any[];
  idempresa : number = Number(localStorage.getItem('idempresa'));
  noPermitido = true;
  nombre: string;
  finicio: Date;
  ffinal: Date;
  valueStorage = null;
  json = null;
  //selectedCatCadena: catcadena = { idcadena: null, idempresa: null, cadena: null, uda: null, uda_c: null, fda: null, udc: null, fdc: null, idestatus: null, estatus: null, btn_estilo: null, nombreempresa: null };
  selectedCatPromocion: any = { idpromocion: null, idempresa: null, nombre: null, capacidad: null, canal: null, alcance: null, inicio: null, final: null, periodo: null, actividad: null, precioregular: null, preciopromocion: null, udc: null, fdc: null, fdc_m: null, uda: null, uda_c: null, fda: null, fda_m: null, idestatus: null, nombreempresa: null, ruta: null };
  formatoPorPromocion: any = { idpromocionformato: null, idpromocion: null, idempresa: null, idcadena: null, idformato: null, uda: null };

  constructor(
    private promocionesService: CatPromocionesService,
    private catempresaService: CatEmpresaService,
    private toaster: ToastrService,
    private userService: UserService,
    private exportarExcel: ExportarExcelService
  ) {
    this.usr = this.userService.getUserLoggedIn();
  }

  ngOnInit() {
    //    this.idempresa=1;
    if (this.usr.idperfil == 1) {
      this.noPermitido = false;
    }
    this.exportarExcel.nombreArchivo = "promociones";
    this.promocionesService.getpromocionesservicios(/*this.idempresa*/).subscribe((gpromociones: any[]) => {
      this.promociones = gpromociones;
      /* Obtiene el valueStorage solamente si el motivo del recargado de la pagina fue debido a la actualizacion 
     de la imagen de algun producto */
      this.valueStorage = window.localStorage.getItem("json_promocion");
      /*Realiza la verificacion*/
      if (this.valueStorage != null) {
        try {
          /*Nota: Es la misma secuencia de instrucciones que se ejecuta en el boton de editar de c/u de 
          las promociones de la tabla */
          this.json = JSON.parse(this.valueStorage);//Convierte el valor de valueStorage a JSON
          this.selectCatPromocion(this.json.promocion); //Selecciona la promocion guardado 
          this.setSelectedTab(this.json.tab);//Se posiciona en la pestaña de detalle de promociones
          console.log(this.json);
        } catch (err) { }

        /* Elimina de la cache el valueStorage */
        window.localStorage.removeItem("json_promocion");
      }
      // console.log("lista de promociones, ", this.promociones);
    });
    this.catempresaService.getCatEmpresa(this.idempresa).subscribe((gempresa: CatEmpresa[]) => {
      this.empresas = gempresa;
      // console.log("lista de empresas, ", this.empresas);
    });
  }

  ngAfterViewInit() {
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }

    /* Verifica que el motivo de recarga sea solo por cambio de imagen en algun producto*/
    if (window.localStorage.getItem("json_producto") != null) {

      /* Espera hasta que se llenen las variables de valueStorage y json */
      let wait = setInterval(() => {
        if (this.valueStorage != null && this.json != null) {
          clearInterval(wait); //Mata el proceso de espera
          this.ngScrollInto(); //Invoca al metodo que posiciona al scrollbar
          this.valueStorage = null; //Vacia la variable valueStorage
          this.json = null; //Vacia la variable json
        }
      }, 10);
    }
  }

  /* Este metodo posiciona el scrollbar en la area donde se encuentra la imagen */
  ngScrollInto() {
    let element = document.querySelector("#selecciona_imagen");
    if (element != null) {
      element.scrollIntoView();
    }
  }

  /* Seccion de interaccion con base de datos*/
  createOrUpdateCatPromocion(form) {
    if (this.selectedCatPromocion && this.selectedCatPromocion.idpromocion) {
      form.value.idpromocion = this.selectedCatPromocion.idpromocion;
      this.promocionesService.updatePromocionServicios(form.value).subscribe((promociones: any) => {
        // console.log("CatPromociones updated", promociones);
        this.toaster.success("Dato guardado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 2000);

      });
    } else {
      if (form.value.idEmpresa > 0 && form.value.nombre != "" && form.value.capacidad != "" && form.value.canal != ""
        && form.value.alacance != "" && form.value.inicio != "" && form.value._final != "" && form.value.periodo != ""
        && form.value.actividad != "" && form.value.precioregular != "" && form.value.preciopromocion != "") {
        this.promocionesService.createPromocionServicios(form.value).subscribe((promociones: any) => {
          // console.log("CatPromociones created, ", promociones);
          console.log('id', promociones.idpromocion);
          this.toaster.success("Dato creado", "", {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          });

          setTimeout(function () {
            window.location.reload();
          }.bind(this), 2000);
        });
      }
      else {
        this.toaster.warning("Debe colocar un valor al guardar", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
        //alert('Debe colocar un valor al guardar');
      }
    }
  }

  selectCatPromocion(catpromocion: any) {
    this.selectedCatPromocion = catpromocion;
    if (this.selectedCatPromocion.inicio != null) {
      let of = this.selectedCatPromocion.inicio.split('T');
      if (of.length == 2) {
        this.selectedCatPromocion.inicio = of[0];
      }
      let fpart = this.selectedCatPromocion.inicio.split('-');
      this.finicio = new Date(fpart[0], parseInt(fpart[1]) - 1, fpart[2]);
      this.selectedCatPromocion.inicio = (this.finicio).toISOString();
    }
    if (this.selectedCatPromocion.final != null) {
      let of = this.selectedCatPromocion.final.split('T');
      if (of.length == 2) {
        this.selectedCatPromocion.final = of[0];
      }
      let fpart = this.selectedCatPromocion.final.split('-');
      this.ffinal = new Date(fpart[0], parseInt(fpart[1]) - 1, fpart[2]);
      this.selectedCatPromocion.final = (this.ffinal).toISOString();
    }
  }

  selectNewCatPromocion() {
    this.selectedCatPromocion = { idpromocion: null, idempresa: null, nombre: null, capacidad: null, canal: null, alcance: null, inicio: null, final: null, periodo: null, actividad: null, precioregular: null, preciopromocion: null, udc: this.usr.usuario, fdc: null, fdc_m: null, uda: this.usr.usuario, uda_c: this.usr.usuario, fda: null, fda_m: null, idestatus: null, nombreempresa: null, ruta: null };
  }

  deleteCatPromocion(id) {
    if (confirm("¿Seguro de borrar este dato?")) {
      this.promocionesService.deletePromocionServicios(id).subscribe((promociones: any) => {
        // console.log("Policy deleted, ", promociones);
      });
      this.toaster.success("Dato borrado", "", {
        timeOut: 1000,
        positionClass: 'toast-bottom-center'
      });



      setTimeout(function () {
        window.location.reload();
      }.bind(this), 2000);
    }
  }

  desasignarFormatoAPromocion(id) {
    if (confirm("¿Seguro que desea desasignar este promotor?")) {
      this.promocionesService.deleteAsignacionFormatoAPromocionServicios(id).subscribe((gfap: any) => {
        // console.log("Policy deleted, ", gfap);
      });
      this.toaster.success("Dato borrado", "", {
        timeOut: 1000,
        positionClass: 'toast-bottom-center'
      });



      setTimeout(function () {
        window.location.reload();
      }.bind(this), 2000);
    }
  }

  findCatPromocion(nombre: string, orden: number) {
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    this.promocionesService.getpromocionesserviciosPorNombre(this.idempresa, nombre, orden).subscribe((gpromociones: any[]) => {
      this.promociones = gpromociones;
      console.log("lista de promociones, ", this.promociones);
    });
  }

  findCatFormato(nombre: string) {
    if (this.pag2 != null) {
      this.paginacion2.page_number = 0;
      this.pag2.firstPage();
    }

    this.promocionesService.getFormatosDisponiblesParaAsignarAPromocionServicios(nombre, this.selectedCatPromocion.idpromocion).subscribe((gfp: any[]) => {
      this.formatosDisponibles = gfp;
      if (this.formatosDisponibles.length == 0) {
        document.getElementById("ra").setAttribute("style", "display:none");
      } else {
        document.getElementById("ra").removeAttribute("style");
      }
      // console.log("lista de formatos disponibles, ", this.formatosDisponibles);
    });
  }

  /* Seccion de eventos de Tabs */
  getSelectedTab(index) {
    switch (index) {
      case 0: return 0;
      case 1: return 1;
      case 2: if (this.selectedCatPromocion.idpromocion == null) {
        this.toaster.warning("Por favor debe seleccionar una promocion", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      }
        return 2;
      default: return -1;
    }
  }

  setSelectedTab(index) {
    this.selected = index;
  }

  setAsignaFormatos(selectedformato: any) {
    if (this.selectedCatPromocion.idpromocion != null) {
      document.getElementById("ra").setAttribute("style", "display:none");
      this.formatoPorPromocion = selectedformato;
      this.promocionesService.createAsignacionFormatoAPromocioServicios(this.selectedCatPromocion.idpromocion, this.formatoPorPromocion.idempresa, this.formatoPorPromocion.idcadena, this.formatoPorPromocion.idformato, this.usr.usuario).subscribe((gprom: any) => {
        // console.log("FormatoAsignadoAPromocion updated", gprom);
        this.toaster.success("Formato asignado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 2000);
      });
    }
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

  /* Seccion de evento de seach*/

  changeText(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if (event.target) {
      if (event.keyCode == 13) {
        this.search(0);
      }
      else {
        this.nombre = value;
      }
    }
  }

  search(orden: number) {
    if (this.nombre == null || this.nombre == '') {
      this.nombre = ' ';
    }
    this.findCatPromocion(this.nombre, orden);
  }

  changeTextFP(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if (event.target) {
      this.nombre = value;
      this.searchFP();
    }
  }

  searchFP() {
    if (this.nombre != null) {
      if (this.nombre != '') {
        this.findCatFormato(this.nombre);
      }
      else {
        document.getElementById("ra").setAttribute("style", "display:none");
      }
    }
  }

  ListaFormatos(id: number) {
    this.setSelectedTab(2);
    if (this.pag1 != null) {
      this.paginacion1.page_number = 0;
      this.pag1.firstPage();
    }
    this.promocionesService.getFormatosPorPromocionServicios(id).subscribe((gFormatosPorPromocion: any[]) => {
      this.formatosPorPromocion = gFormatosPorPromocion;
      // console.log("Lista de formatos por promocion, ", this.formatosPorPromocion);
    });
  }


  SubirImagen(files: FileList) {
    if (files.length > 0) {
      /* Verifica si ya se selecciono un producto */
      if (this.selectedCatPromocion.idpromocion != null) {


        /* Constuye la ruta completa donde se va subir la imagen  */
        let ruta_imagen = `/ImagenesPromociones/${this.selectedCatPromocion.idpromocion}_${this.selectedCatPromocion.nombre}`;

        /*Obtiene el nombre del archivo original y lo convierte en arreglo a partir de cada '.' que se
         encuentre dentro de dicho nombre
        */
        let arr = files.item(0).name.split(".");
        let extencion = arr[arr.length - 1]; //Asigna la extencion extraida a la variable: extencion

        ruta_imagen = `${ruta_imagen}.${extencion}`; //Se realiza la concatenacion de la ruta nueva de la imagen y la extencion

        /*Envia peticion de subida de imagen */
        this.promocionesService.uploadImagenAPromocionServicio(files.item(0), ruta_imagen, this.selectedCatPromocion.idpromocion).subscribe((imagen: any) => {
          let wait = setInterval(() => {
            this.selectedCatPromocion.ruta = imagen.ruta; //Aqui se asigna a la variable ruta al producto seleccionado             
            this.toaster.info(imagen.status, "", {
              timeOut: 3000,
              positionClass: 'toast-bottom-center'
            });
            clearInterval(wait);
            /*Aqui guarda la informacion del producto seleccionado, tab seleccionada y la posicion del scroll
            en localStorage necesaria para recopilarse en la variable localStorage cuando se recarge la pagina
            mediante la instruccion de la linea 348: (window.location.reload()) para que despues se pueda volver
            donde en la parte donde se quedo 
            */
            window.localStorage.setItem("json_promocion", `{"promocion":${this.toJSON()},"tab":"${this.selected}"}`);
            window.location.reload();
          }, 1000);
          console.log(imagen);
        });
      }
    }
  }

  BorrarImagen() {
    if (this.selectedCatPromocion.idpromocion != null) {
      this.promocionesService.deleteImagenAPromocionServicio(this.selectedCatPromocion.ruta, this.selectedCatPromocion.idpromocion).subscribe((imagen: any) => {
        this.selectedCatPromocion.ruta = null;
        this.toaster.info(imagen.status, "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
        console.log(imagen);
      });
    }
  }

  /* toJSON: Construye el json como cadena */
  toJSON(): string {
    return `{
    "idpromocion":"${this.selectedCatPromocion.idpromocion}",
    "idempresa":"${this.selectedCatPromocion.idempresa}",
    "nombre":"${this.selectedCatPromocion.nombre}",
    "capacidad":"${this.selectedCatPromocion.capacidad}",
    "canal":"${this.selectedCatPromocion.canal}",
    "alcance":"${this.selectedCatPromocion.alcance}",
    "inicio":"${this.selectedCatPromocion.inicio}",
    "final":"${this.selectedCatPromocion.final}",
    "periodo":"${this.selectedCatPromocion.periodo}",
    "actividad":"${this.selectedCatPromocion.actividad}",
    "precioregular":"${this.selectedCatPromocion.precioregular}",
    "preciopromocion":"${this.selectedCatPromocion.preciopromocion}",
    "uda_c":"${this.selectedCatPromocion.uda_c}",
    "uda":"${this.selectedCatPromocion.uda}",
    "fda":"${this.selectedCatPromocion.fda}",
    "fda_m":"${this.selectedCatPromocion.fda_m}",
    "udc":"${this.selectedCatPromocion.udc}",
    "fdc":"${this.selectedCatPromocion.fdc}",
    "fdc_m":"${this.selectedCatPromocion.fdc_m}",
    "idestatus":"${this.selectedCatPromocion.idestatus}",
    "nombreempresa":"${this.selectedCatPromocion.nombreempresa}",
    "ruta":"${this.selectedCatPromocion.ruta}"
    }`;
  }

}
