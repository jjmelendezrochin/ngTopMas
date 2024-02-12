import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { usuario } from 'app/Objetos/usuario';
import { Paginacion } from 'app/Objetos/paginacion';
import { CatProductosService } from 'app/Servicios/cat-productos.service';
import { UserService } from 'app/user.service';
import { ToastrService } from 'ngx-toastr';
import { ExportarExcelService } from 'app/Servicios/exportar-excel.service';
import { CatProductos } from 'app/Objetos/catproductos';
import { FiltradoProductos } from 'app/Objetos/filtradoproductos';
import { CatEmpresa } from 'app/Objetos/catempresa';
import { catcadena } from 'app/Objetos/catcadena';
import { CatcadenaService } from 'app/Servicios/catcadena.service';
import { CatEmpresaService } from 'app/Servicios/cat-empresa.service';
import { MatPaginator } from '@angular/material';
import { CatRutasService } from 'app/Servicios/cat-rutas.service';

declare var $: any;

@Component({
  selector: 'app-cat-productos',
  templateUrl: './cat-productos.component.html',
  styleUrls: ['./cat-productos.component.scss']
})
export class CatProductosComponent implements OnInit {
  @ViewChild('pag', { static: false }) pag: MatPaginator;
  @ViewChild('pag2', { static: false }) pag2: MatPaginator;
  @ViewChild("tabla_productos", { static: false }) tabla_cadenas: ElementRef;
  encabezados = {
    "upc": "UPC",
    "descripcion": "Descripción",
    "descripcion1": "Descripción 1",
    "cantidad_caja": "Cantidad Caja",
    "cantidad_kgs": "Cantidad kgs",
    //"nombreempresa": "Empresa",
    "categoria1": "Categoria 1",
    "categoria2": "Categoria 2",
    //"cadena": "Cadena",
    "uda": "Uda",
    "fda_m": "Fda",
    "udc": "Udc",
    "fdc_m": "Fdc"
  };
  form: any;
  selected: number;
  usr: usuario;
  paginacion: Paginacion = new Paginacion();
  paginacion2: Paginacion = new Paginacion();
  prod: CatProductos[];
  cadenas: catcadena[];
  empresas: CatEmpresa[];
  idempresa: number = Number(localStorage.getItem('idempresa'));
  idcadena = 0;
  noPermitido = true;
  cadena: string;
  producto_seleccionado = "";
  filtradoProductos: FiltradoProductos = { idcadena: 0, PRODUCTO: "", CATEGORIA: "", UPC: "" };
  productosFormatoPrecio: any[];
  valueStorage = null;
  json = null;

  //selectedCatCadena: catcadena = { idcadena: null, idempresa: null, cadena: null, uda: null, uda_c: null, fda: null, udc: null, fdc: null, idestatus: null, estatus: null, btn_estilo: null, nombreempresa: null };
  selectedCatProducto: CatProductos = {
    idproducto: null,
    upc: null,
    descripcion: null,
    descripcion1: null,
    cantidad_caja: null,
    cantidad_kgs: null,
    idempresa: null,
    categoria1: null,
    categoria2: null,
    // idcadena: null,
    uda: null,
    uda_c: null,
    fda: null,
    fda_m: null,
    udc: null,
    fdc: null,
    fdc_m: null,
    idestatus: null,
    nombreempresa: null,
    ruta: null
    // cadena: null,
    // precio: null
  };

  constructor(
    private rutasservice: CatRutasService,
    private productosService: CatProductosService,
    private cadcadenaservice: CatcadenaService,
    private catempresaService: CatEmpresaService,
    private toaster: ToastrService,
    private userService: UserService,
    private exportarExcel: ExportarExcelService
  ) {
    this.usr = this.userService.getUserLoggedIn();
  }

  ngOnInit() {
    if (this.usr.idperfil == 1) {
      this.noPermitido = false;
    }
    console.log("empresa " + this.idempresa);
    this.exportarExcel.nombreArchivo = "productos";
    this.productosService.getCatProductosServicio(this.idempresa, 0, "", "", "").subscribe((gproductos: CatProductos[]) => {
      this.prod = gproductos;
      $('#bloqueador_productos').hide();
      /* Obtiene el valueStorage solamente si el motivo del recargado de la pagina fue debido a la actualizacion 
      de la imagen de algun producto */
      this.valueStorage = window.localStorage.getItem("json_producto");
      /*Realiza la verificacion*/
      if (this.valueStorage != null) {
        try {
          /*Nota: Es la misma secuencia de instrucciones que se ejecuta en el boton de editar de c/u de 
          los productos de la tabla */
          this.json = JSON.parse(this.valueStorage);//Convierte el valor de valueStorage a JSON
          this.selectCatProductos(this.json.producto); //Selecciona el producto guardado 
          this.setSelectedTab(this.json.tab);//Se posiciona en la pestaña de detalle de productos
          /* Selecciona su lista de precios para este producto */
          this.ListaProductoFormatoPrecio(
            this.json.producto.idproducto,
            this.json.producto.descripcion
          )
          console.log(this.json);
        } catch (err) { }

        /* Elimina de la cache el valueStorage */
        window.localStorage.removeItem("json_producto");
      }
      // console.log("lista de productos, ", this.prod);
    });
    this.cadcadenaservice.getcadenaservicios(this.idempresa).subscribe((gpocadena: catcadena[]) => {
      this.cadenas = gpocadena;
      // console.log("lista de cadenas, ", this.cadenas);
    });
    this.catempresaService.getCatEmpresa(this.idempresa).subscribe((gempresa: CatEmpresa[]) => {
      this.empresas = gempresa;
      // console.log("lista de empresas, ", this.empresas);
    });
  }

  ngAfterViewInit() {
    // if (this.pag != null) {
    //   this.paginacion.page_number = 0;
    //   this.pag.firstPage();
    // }
    // if (this.pag2 != null) {
    //   this.paginacion2.page_number = 0;
    //   this.pag2.firstPage();
    // }    
    $('#bloqueador_productos').show();

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
  createOrUpdateCatProductos(form) {
    if (this.selectedCatProducto && this.selectedCatProducto.idproducto) {
      form.value.idproducto = this.selectedCatProducto.idproducto;
      // console.log("Datos CatProductos", this.selectedCatProducto);
      this.productosService.updateProductosServicio(form.value).subscribe((catproductos: CatProductos) => {
        // console.log("CatProductos updated", catproductos);
        this.toaster.success("Dato guardado", "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 2000);

      });
    } else {
      if (form.value.upc != null && form.value.descripcion != null && form.value.descripcion1 != null && form.value.categoria1 != null && form.value.categoria2 != null && parseInt(form.value.idempresa) > 0 && form.value.cantidad_caja != null && form.value.cantidad_kgs != null) {
        this.productosService.createProductosServicio(form.value).subscribe((catproductos: CatProductos) => {
          // console.log("CatProductos created, ", catproductos);
          console.log('id', catproductos.idproducto);
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

  ExportarExcel() {
    this.exportarExcel.exportarExcel(this.prod, this.encabezados);
  }

  selectCatProductos(catproductos: CatProductos) {
    this.selectedCatProducto = catproductos;
  }

  selectNewCatProductos() {
    this.selectedCatProducto = {
      idproducto: null,
      upc: null,
      descripcion: null,
      descripcion1: null,
      cantidad_caja: null,
      cantidad_kgs: null,
      idempresa: null,
      categoria1: null,
      categoria2: null,
      // idcadena: null,
      uda: this.usr.usuario,
      uda_c: this.usr.usuario,
      fda: null,
      fda_m: null,
      udc: this.usr.usuario,
      fdc: null,
      fdc_m: null,
      idestatus: null,
      nombreempresa: null,
      ruta: null
      //cadena: null,
      //precio: null
    };
  }

  deleteCatProductos(id) {
    if (confirm("¿Seguro de borrar este dato?")) {
      this.productosService.deleteProductosServicio(id).subscribe((catproductos: CatProductos) => {
        // console.log("Policy deleted, ", catproductos);
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

  findCatProductos(form) {
    this.form = form;
    $('#bloqueador_productos').show();
    console.log(`idcadena: ${form.value.idcadena}, producto: ${form.value.PRODUCTO}, categoria: ${form.value.CATEGORIA}, upc: ${form.value.UPC}`);
    this.productosService.getCatProductosServicio(this.idempresa, form.value.idcadena, form.value.PRODUCTO, form.value.CATEGORIA, form.value.UPC).subscribe((gproductos: CatProductos[]) => {
      this.prod = gproductos;
      $('#bloqueador_productos').hide();
      // console.log("lista de productos, ", this.prod);
    });
  }

  /* Seccion de eventos de Tabs */
  getSelectedTab(index) {
    switch (index) {
      case 0: return 0;
      case 1: return 1;
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


    if (!(this.selected === clickedTabIndex)) {
      this.selected = clickedTabIndex;
    }
  }

  // *****************************************************
  // Obtener la lista de productos asignados a una tienda
  ListaProductoFormatoPrecio(pidproducto: number, pproducto: string) {
    this.producto_seleccionado = pproducto;
    this.rutasservice.getProductoFormatoPrecio(pidproducto).subscribe((gProductoFormatoPrecio: any[]) => {
      this.productosFormatoPrecio = gProductoFormatoPrecio;
      // console.log("lista de productos asignados a la tienda", this.productosFormatoPrecio);
    });
  }

  // *****************************************************
  // Establece el precio de un producto
  EstablecePrecio(pidproductoformatoprecio: number) {
    let pvalor = $('#id_' + pidproductoformatoprecio).val();
    let datos = { "idproductoformatoprecio": pidproductoformatoprecio, "valor": pvalor };

    this.rutasservice.EstablecePrecio(datos).subscribe((gfitlros: any) => {
      this.toaster.info("Precio guardado", "", {
        timeOut: 3000,
        positionClass: 'toast-bottom-center'
      });
    });
  }

  SubirImagen(files: FileList) {
    if (files.length > 0) {
      /* Verifica si ya se selecciono un producto */
      if (this.selectedCatProducto.idproducto != null) {


        /* Constuye la ruta completa donde se va subir la imagen  */
        let ruta_imagen = `/ImagenesProductos/${this.selectedCatProducto.idproducto}_${this.selectedCatProducto.upc}`;

        /*Obtiene el nombre del archivo original y lo convierte en arreglo a partir de cada '.' que se
         encuentre dentro de dicho nombre
        */
        let arr = files.item(0).name.split(".");
        let extencion = arr[arr.length - 1]; //Asigna la extencion extraida a la variable: extencion

        ruta_imagen = `${ruta_imagen}.${extencion}`; //Se realiza la concatenacion de la ruta nueva de la imagen y la extencion


        /*Envia peticion de subida de imagen */
        this.productosService.uploadImagenAProductoServicio(files.item(0), ruta_imagen, this.selectedCatProducto.idproducto).subscribe((imagen: any) => {
          let wait = setInterval(() => {
            this.selectedCatProducto.ruta = imagen.ruta; //Aqui se asigna a la variable ruta al producto seleccionado             
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
            window.localStorage.setItem("json_producto", `{"producto":${this.toJSON()},"tab":"${this.selected}"}`);
            window.location.reload();
          }, 1000);
          console.log(imagen);
        });
      }
    }
  }

  BorrarImagen() {
    if (this.selectedCatProducto.idproducto != null) {
      this.productosService.deleteImagenAProductoServicio(this.selectedCatProducto.ruta, this.selectedCatProducto.idproducto).subscribe((imagen: any) => {
        this.selectedCatProducto.ruta = null;
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
    "idproducto":"${this.selectedCatProducto.idproducto}",
    "upc":"${this.selectedCatProducto.upc}",
    "descripcion":"${this.selectedCatProducto.descripcion}",
    "descripcion1":"${this.selectedCatProducto.descripcion1}",
    "cantidad_caja":"${this.selectedCatProducto.cantidad_caja}",
    "cantidad_kgs":"${this.selectedCatProducto.cantidad_kgs}",
    "idempresa":"${this.selectedCatProducto.idempresa}",
    "categoria1":"${this.selectedCatProducto.categoria1}",
    "categoria2":"${this.selectedCatProducto.categoria2}",
    "uda":"${this.selectedCatProducto.uda}",
    "uda_c":"${this.selectedCatProducto.uda_c}",
    "fda":"${this.selectedCatProducto.fda}",
    "fda_m":"${this.selectedCatProducto.fda_m}",
    "udc":"${this.selectedCatProducto.udc}",
    "fdc":"${this.selectedCatProducto.fdc}",
    "fdc_m":"${this.selectedCatProducto.fdc_m}",
    "idestatus":"${this.selectedCatProducto.idestatus}",
    "nombreempresa":"${this.selectedCatProducto.nombreempresa}",
    "ruta":"${this.selectedCatProducto.ruta}"
    }`;
  }
}
