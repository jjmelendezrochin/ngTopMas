import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FotosService } from '../Servicios/fotos.service';
import { Mapas } from 'app/Objetos/mapas';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, AfterViewInit {
    @ViewChild('map', { static: false }) map: ElementRef;
    @ViewChild('map1', { static: false }) map1: ElementRef;
    mapa: Mapas;
    mapa1: Mapas;
    idempresa : number = Number(localStorage.getItem('idempresa'));

    constructor(private fotosservice: FotosService) { }

    ngOnInit() {

        //        this.mapa.iniciarGMaps_ListaUbicaciones(document.getElementById("map"));

    }

    ngAfterViewInit() {
        // child is set        
        this.mapa = new Mapas();
        this.mapa.Maps(this.fotosservice);
        this.mapa.iniciarGMaps_ListaUbicaciones(this.map);
        this.mapa.Maps1(this.fotosservice);
        this.mapa.iniciarGMaps_ListaUbicaciones1(this.map1);
    }


}
