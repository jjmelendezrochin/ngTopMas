export class CatSupervisor {
    idpromotor: number;
    idempresa: number;
    idsupervisor: number;
    nombre: string;
    apellidos: string;
    idusuario: string;
    rol: string;
    correo: string;
    estatus: number;
    QR: string;
    uda: string;
    uda_c: string;//Atributo auxiliar para poner el value en el campo uda    
    fda: string;
    fda_m: string;
    udc: string;
    fdc: string;
    fdc_m: string;
    idestatus: number;
    estatus_btn: string;//Atributo auxiliar para cambiar el texto del boton dependiendo si esta activo o inactivo
    btn_estilo: string;//Atributo auxiliar para cambiar el estilo del boton de acuerdo al estatus
    pwd: string;
    pwd_c: string;//Atributo auxiliar para confirmacion de la clave
    nombreempresa: string;
    nombrecompleto_s: string;
    idzona: number;
    zona: string;
    idusohorario: number;
}