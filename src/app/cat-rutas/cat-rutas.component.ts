import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CatRutasService } from '../Servicios/cat-rutas.service';
import { CatRutas } from '../Objetos/catrutas';
import { CatcadenaService } from '../Servicios/catcadena.service';
import { catcadena } from '../Objetos/catcadena';
import { usuario } from '../Objetos/usuario';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Paginacion } from '../Objetos/paginacion';
import { Mapas } from '../Objetos/mapas';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { CatFormatoService } from 'app/Servicios/cat-formato.service';
import { CatFormatos } from 'app/Objetos/catformatos';
import { MatPaginator } from '@angular/material';
import { CargaImagenService } from '../Servicios/carga-imagen-service.service.service';
import { environment } from 'environments/environment.prod';

declare var $: any;

/*Interface declarada en maps*/
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}

@Component({
  selector: 'app-cat-rutas',
  templateUrl: './cat-rutas.component.html',
  styleUrls: ['./cat-rutas.component.scss']
})
export class CatRutasComponent implements OnInit, AfterViewInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild('pag1', { static: false }) pag1: MatPaginator;
  @ViewChild('pag2', { static: false }) pag2: MatPaginator;
  @ViewChild('pag3', { static: false }) pag3: MatPaginator;
  @ViewChild('maps', { static: false }) maps: ElementRef;
  @ViewChild('resurtible', { static: false }) resurtible: ElementRef;
  encabezados = { "idruta": "id", "ruta": "Ruta", "determinante": "Determinante", "cadena": "Cadena", "formato": "Formato", "Tienda": "Tienda", "cluster": "Cluster", "intensidad_str": "Intensidad", "direccioncompleta": "Direccion completa", "idmunicipio": "Ciudad", "idestado": "Estado", "latitud": "Latitud", "longitud": "Longitud" };
  encabezados_productosTiendaFechaPrecio = { "descripcion": "Descripción", "categoria1": "Categoría", "precio": "Precio Sugerido", "precioreal": "Precio Anaquel", "diferencia": "Diferencia", "Fecha": "Fecha", "Nombre": "Promotor", "Tienda": "Tienda" };
  selected: number;
  usr: usuario;
  mapas: Mapas;
  paginacion: Paginacion = new Paginacion();
  paginacion1: Paginacion = new Paginacion();
  paginacion2: Paginacion = new Paginacion();
  paginacion3: Paginacion = new Paginacion();
  rutas: CatRutas[];
  formatos: CatFormatos[];
  cadenas: catcadena[];
  productos_disponibles: any[];
  productosPorTienda: any[];
  productosTiendaFechaPrecio: any[];
  cintensidad: any[];
  idempresa: number = Number(localStorage.getItem('idempresa'));
  idformato = 0;
  intensidad = 1;
  noPermitido = true;
  Tienda: string;
  campos: string;
  disabled = "disabled";
  producto_seleccionado: string;
  respuestaImagenEnviada: any;
  resultadoCarga: any;

  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;
  url_descarga = this.PHP_API_SERVER + "/CargaArchivos/Formato_Carga_Tiendas.xlsx";


  selectedCatRutas: CatRutas = { idruta: null, ruta: null, determinante: null, idcadena: null, formato: null, Tienda: null, direccioncompleta: null, idmunicipio: null, idestado: null, cluster: null, intensidad: 1, intensidad_str: null, uda: null, uda_c: null, fda: null, fda_m: null, udc: null, fdc: null, fdc_m: null, idEstatus: null, latitud: null, longitud: null, estatus_btn: null, btn_estilo: null, cadena: null, idformato: null, Tienda1: null };

  selectedProducto: any = {};
  constructor(
    private rutasservice: CatRutasService,
    private formatosservice: CatFormatoService,
    private catcadenasService: CatcadenaService,
    private formatoService: CatFormatoService,
    private toaster: ToastrService,
    private userService: UserService,
    private exportarExcel: ExportarExcelService,
    private enviandoImagen: CargaImagenService
  ) {
    this.usr = this.userService.getUserLoggedIn();
  }

  ngOnInit() {

    $('#bloqueador_lista_precios').show();
    $('#bloqueador_productos').hide();

    //    this.idempresa=1;
    if (this.usr.idperfil == 1) {
      this.noPermitido = false;
    }
    this.exportarExcel.nombreArchivo = "tiendas";
    this.rutasservice.getrutasserviciosPorTiendaODireccion('', 0).subscribe((grutas: CatRutas[]) => {
      if (localStorage.getItem("tab") != null && localStorage.getItem("idruta") != null) {
        this.rutasservice.getrutasPorIdServicios(parseInt(localStorage.getItem("idruta"))).subscribe((grutas: CatRutas[]) => {
          this.selectCatRutas(grutas[0]);
          this.setSelectedTab(parseInt(localStorage.getItem("tab")));
        });
        $('#bloqueador_lista_precios').hide();
      }
      //this.rutas = grutas;
      this.rutas = grutas;
      this.mapas = new Mapas();
      this.mapas.CatRutas(this.maps, this.rutasservice);
      this.mapas.iniciarGMaps_CatRutas();
      this.maps.nativeElement.style.display = "none";
      $('#bloqueador_lista_precios').hide();
      // console.log("lista de rutas, ", this.rutas);
    });

    /* Lista de todos los formatos disponibles */
    this.formatosservice.getformatosservicios(this.idempresa).subscribe((gformatos: CatFormatos[]) => {
      this.formatos = gformatos;
      // console.log("lista de formatos", this.formatos);
    });

    this.catcadenasService.getcadenaservicios(this.idempresa).subscribe((gcadenas: catcadena[]) => {
      this.cadenas = gcadenas;
      // console.log("lista de cadenas, ", this.cadenas);
    });
    this.rutasservice.getCatIntensidadServicios(/*this.idempresa*/).subscribe((gintensidad: any[]) => {
      this.cintensidad = gintensidad;
      // console.log("lista de intensidades de señal,", this.cintensidad);
    });
  }

  ngAfterViewInit() {
    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    if (this.pag1 != null) {
      this.paginacion1.page_number = 0;
      this.pag1.firstPage();
    }
    if (this.pag2 != null) {
      this.paginacion2.page_number = 0;
      this.pag2.firstPage();
    }
    if (this.pag3 != null) {
      this.paginacion3.page_number = 0;
      this.pag3.firstPage();
    }
  }

  /* Seccion de interaccion con base de datos*/
  createOrUpdateCatRutas(form) {
    if (this.selectedCatRutas && this.selectedCatRutas.idruta) {
      form.value.idruta = this.selectedCatRutas.idruta;
      if (form.value.idcadena > 0 && form.value.idformato == 0) {
        this.toaster.warning("Por favor establesca el formato", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });

      } else if ((form.value.idcadena > 0 && form.value.idformato > 0)) {
        this.rutasservice.updateRutasServicios(form.value).subscribe((catrutas: CatRutas) => {
          // console.log("CatRutas updated", catrutas);
          this.toaster.success("Dato guardado", "", {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          });

          setTimeout(function () {
            window.location.reload();
          }.bind(this), 2000);

        });
      }
    } else {
      if (form.value.ruta != null && form.value.idformato > 0 && form.value.idcadena > 0 /*&& form.value.determinante != null && form.value.idcadena != null && form.value.formato != null && form.value.Tienda != null && form.value.direccioncompleta != null && form.value.idmunicipio != null && form.value.idestado != null && form.value.cluster != null && form.value.latitud != null && form.value.longitud != null*/) {
        this.rutasservice.createRutasServicios(form.value).subscribe((catrutas: CatRutas) => {
          // console.log("CatRutas created, ", catrutas);
          console.log('id', catrutas);
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

  actualizaProductosRutasFechas(idruta, idproducto) {
    this.toaster.warning("Valor de la ruta " + idruta + " valor del producto " + idproducto, "", {
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    });
  }

  selectCatRutas(catrutas: CatRutas, estatus = 0) {
    this.producto_seleccionado = "";  // Desactiva la seleccion del producto 
    this.selectedCatRutas = catrutas;
    this.selectUbicacion();
    if (estatus == 0) {
      this.selectedCatRutas.uda_c = this.usr.usuario;
    } else if (estatus == 1) {
      if (this.selectedCatRutas.idEstatus == 0) {
        this.selectedCatRutas.idEstatus = 1;
        this.selectedCatRutas.estatus_btn = "Activo";
        this.selectedCatRutas.btn_estilo = "a_estatus";
      } else if (this.selectedCatRutas.idEstatus == 1) {
        this.selectedCatRutas.idEstatus = 0;
        this.selectedCatRutas.estatus_btn = "Inactivo";
        this.selectedCatRutas.btn_estilo = "i_estatus";
      }

      /* Ajusta la lista de formatos para una cadena en especifico */
      this.ListaFormatos(this.selectedCatRutas.idcadena);

      this.rutasservice.updateEstatusRutasServicios(this.selectedCatRutas).subscribe((catrutas: CatRutas) => {
        // console.log("Estatus CatRutas updated", catrutas);
        this.toaster.success("Dato guardado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
      });
    }

    if (this.pag1 != null) {
      this.paginacion1.page_number = 0;
      this.pag1.firstPage();
    }
    if (this.pag2 != null) {
      this.paginacion2.page_number = 0;
      this.pag2.firstPage();
    }
    if (this.pag2 != null) {
      this.paginacion2.page_number = 0;
      this.pag2.firstPage();
    }

    // *****************************************************
    // Obtener la lista de productos asignados a una tienda
    this.rutasservice.getProductosAsignadosATienda(this.selectedCatRutas.idruta).subscribe((gprod: any[]) => {
      this.productosPorTienda = gprod;
      // console.log("lista de productos asignados a la tienda, ", this.productosPorTienda);
    });


  }

  // *****************************************************
  // Obtener la lista de productos asignados a una tienda
  ListaRutaProductoFechaPrecio(pidruta: number, pidproducto: number, pproducto: string) {
    // console.log("idruta, ", pidruta);
    // console.log("idproducto, ", pidproducto);
    this.producto_seleccionado = pproducto;
    this.rutasservice.getProductosTiendaPreciosFecha(pidproducto, pidruta).subscribe((gprodtiendapreciosfecha: any[]) => {
      this.productosTiendaFechaPrecio = gprodtiendapreciosfecha;
      $('#bloqueador_productos').hide();
      // console.log("lista de productos asignados a la tienda, ", this.productosTiendaFechaPrecio);
    }, () => { $('#bloqueador_productos').hide(); }, () => { $('#bloqueador_productos').hide(); });
  }

  selectUbicacion() {
    if (this.selectedCatRutas.idruta != null) {
      this.maps.nativeElement.style.display = "inline-block";
      this.mapas.setCatRutas(this.selectedCatRutas);
      this.mapas.setMap(parseFloat(this.selectedCatRutas.latitud), parseFloat(this.selectedCatRutas.longitud), this.selectedCatRutas.direccioncompleta);
    }
  }

  selectNewCatRutas() {
    this.maps.nativeElement.style.display = "none";
    this.selectedCatRutas = { idruta: null, ruta: null, determinante: null, idcadena: null, formato: null, Tienda: null, direccioncompleta: null, idmunicipio: null, idestado: null, cluster: null, intensidad: 1, intensidad_str: null, uda: this.usr.usuario, uda_c: this.usr.usuario, fda: null, fda_m: null, udc: this.usr.usuario, fdc: null, fdc_m: null, idEstatus: null, latitud: '0', longitud: '0', estatus_btn: null, btn_estilo: null, cadena: null, idformato: null, Tienda1: null };
  }

  deleteCatRutas(id) {
    if (confirm("¿Seguro de borrar este dato?")) {
      this.rutasservice.deleteRutasServicios(id).subscribe((catrutas: CatRutas) => {
        // console.log("CatRutas deleted, ", catrutas);
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

  findCatRutas(Tienda_dir: string, orden: number) {
    $('#bloqueador_lista_precios').show();

    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    if (this.pag1 != null) {
      this.paginacion1.page_number = 0;
      this.pag1.firstPage();
    }
    if (this.pag2 != null) {
      this.paginacion2.page_number = 0;
      this.pag2.firstPage();
    }
    if (this.pag3 != null) {
      this.paginacion3.page_number = 0;
      this.pag3.firstPage();
    }
    this.rutasservice.getrutasserviciosPorTiendaODireccion(Tienda_dir, orden).subscribe((grutas: CatRutas[]) => {
      this.rutas = grutas;
      $('#bloqueador_lista_precios').hide();
      //console.log("lista de rutas, ", this.rutas);
    });
  }

  findCatProducto(producto: string) {

    $('#bloqueador_productos').show();

    if (this.pag != null) {
      this.paginacion.page_number = 0;
      this.pag.firstPage();
    }
    if (this.pag1 != null) {
      this.paginacion1.page_number = 0;
      this.pag1.firstPage();
    }
    if (this.pag2 != null) {
      this.paginacion2.page_number = 0;
      this.pag2.firstPage();
    }
    if (this.pag3 != null) {
      this.paginacion3.page_number = 0;
      this.pag3.firstPage();
    }

    this.rutasservice.getProductosDisponiblesServicios(producto, this.selectedCatRutas.idruta).subscribe((gprod: any[]) => {
      this.productos_disponibles = gprod;

      if (this.productos_disponibles.length == 0) {
        document.getElementById("ra").setAttribute("style", "display:none");
      } else {
        if (document.getElementById("ra") != null) {
          document.getElementById("ra").removeAttribute("style");
        }
      }

      $('#bloqueador_productos').hide();

      // console.log("lista de productos, ", this.productos_disponibles);
    }, () => {
      $('#bloqueador_productos').hide();
    }, () => {
      $('#bloqueador_productos').hide();
    });
  }

  /* Seccion de eventos de Tabs */
  getSelectedTab(index) {
    switch (index) {
      case 0: this.selected = undefined; if (localStorage.getItem("tab") != null && localStorage.getItem("idpromotor") != null) { localStorage.removeItem("tab"); localStorage.removeItem("idpromotor"); } return 0;
      case 1: this.selected = undefined; if (localStorage.getItem("tab") != null && localStorage.getItem("idpromotor") != null) { localStorage.removeItem("tab"); localStorage.removeItem("idpromotor"); } return 1;
      case 2: this.selected = undefined; if (this.selectedCatRutas.idruta == null) {
        this.toaster.warning("Para asignar productos, por favor debe seleccionar una tienda", "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      } else {
        localStorage.setItem("tab", "lista_productos");
        localStorage.setItem("idruta", this.selectedCatRutas.idruta.toString());
      }
        return 2;
      default: return -1;
    }
  }

  setSelectedTab(tab) {
    $('a[href="#' + tab + '"]').tab('show');
  }

  tabClick(clickEvent: any) {

    // Coloca el indece seleccionado
    const clickedTabIndex = this.getSelectedTab(clickEvent);

    // Si no se ha echo click en ningun elemento, no se hace nada
    if (clickedTabIndex === -1) {
      return;
    }

    this.selected = clickedTabIndex;


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
        this.Tienda = value;
      }
    }
  }

  search(orden: number) {
    if (this.Tienda == null || this.Tienda == '') {
      this.Tienda = ' ';
    }
    this.findCatRutas(this.Tienda, orden);
  }

  /*Seccion de evento de search para buscar rutas*/
  changeTextSProd(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;

    if (event.target) {
      this.campos = value;
      this.searchSProd();
    }
  }

  searchSProd() {
    if (this.campos != null) {
      if (this.campos != '') {
        this.findCatProducto(this.campos);
      }
      else {
        if (document.getElementById("ra") != null) {
          document.getElementById("ra").setAttribute("style", "display:none");
        }
      }
    }
  }

  ListaFormatos(idcadena: number) {
    this.formatoService.getformatosserviciosPorCadena(idcadena).subscribe((catformatos: CatFormatos[]) => {
      this.formatos = catformatos;
      // console.log("lista de formatos", this.formatos);
    });
  }

  setAsignaProducto(selectedproducto: any) {
    if (this.selectedCatRutas.idruta != null) {
      document.getElementById("ra").setAttribute("style", "display:none");
      this.selectedProducto = selectedproducto;
      this.rutasservice.createAsignacionProductoATiendaServicios(this.selectedCatRutas.idruta, this.selectedProducto.idproducto, this.resurtible.nativeElement.value, this.usr.usuario).subscribe((prod: any) => {
        // console.log("ProductosAsignadosATienda updated", prod);
        this.toaster.success("Producto asignado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 2000);
      });
    }
  }

  desasignarProductoATienda(id) {
    if (confirm("¿Seguro que desea desasignar este producto?")) {
      this.rutasservice.deleteAsignacionProductoATiendaServicios(id).subscribe((prod: any) => {
        // console.log("Policy deleted, ", prod);
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

  public cargandoImagen(files: FileList) {
    this.enviandoImagen.postFileImagen(files[0]).subscribe(
      response => {
        this.respuestaImagenEnviada = response;
        if (this.respuestaImagenEnviada <= 1) {
          console.log("Error en el servidor");
        } else {
          if (this.respuestaImagenEnviada.code == 200 && this.respuestaImagenEnviada.status == "success") {
            this.resultadoCarga = 1;
            this.toaster.success("Dato Cargado Exitosamente", "", {
              timeOut: 3000,
              positionClass: 'toast-bottom-center'
            });
            console.log("resultadoCarga", this.respuestaImagenEnviada);
          } else {
            this.resultadoCarga = 2;
            this.toaster.warning("Error al cargar datos " + this.respuestaImagenEnviada.msj, "", {
              timeOut: 3000,
              positionClass: 'toast-bottom-center'
            });
            console.log("resultadoCarga", this.respuestaImagenEnviada);
          }
        }
      },
      error => {
        console.log(<any>error);
        this.toaster.warning("Error al cargar datos " + error, "", {
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      }
    );
  }
}
