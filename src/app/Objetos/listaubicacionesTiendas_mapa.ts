declare const google: any;

export class ListaUbicacionesTiendas_Mapa {

    fotosservice: any;
    rutas = Array();

    constructor(fotosservice: any) {
        this.fotosservice = fotosservice;
    }

    initGMaps(element: any) {
        var iconBase = {

            url: '/assets/img/icon.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(32, 32),
            scaledSize: new google.maps.Size(24, 24),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 10)

        };

        var rojo = {

            url: '/assets/img/maps/rojo.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(32, 32),
            scaledSize: new google.maps.Size(32, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 10)

        };

        var amarillo = {

            url: '/assets/img/maps/amarillo.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(32, 32),
            scaledSize: new google.maps.Size(32, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 10)

        };

        var verde = {

            url: '/assets/img/maps/verde.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(32, 32),
            scaledSize: new google.maps.Size(32, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 10)

        };

        this.fotosservice.getTiendasUbicacionYEstatus().subscribe((gTiendas: any[]) => {
            //console.log("lista de ubicaciones de las tiendas: ", gTiendas.length);
            for (var i = 0; i < gTiendas.length; i++) {
                var icon = null;
                switch (parseInt(gTiendas[i].cuenta)) {
                    case 0:
                        icon = rojo;
                        break;
                    case 1:
                        icon = amarillo;
                        break;
                    case 2:
                        icon = verde;
                        break;
                }
                var arr = [" Tienda: " + gTiendas[i].Tienda + ",\n Promotor: " + gTiendas[i].nombre, gTiendas[i].latitud, gTiendas[i].longitud, icon];
                this.rutas.push(arr);
            }
            this.rutas.push(["Ciudad de mexico", 19.4326018, -99.1332049, iconBase]);
            this.initMaps(element);
        });
    }

    initMaps(element: any) {
        var myLatlng = new google.maps.LatLng(19.4978, -99.1269);

        var map = new google.maps.Map(element.nativeElement, {
            zoom: 6,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [{
                "featureType": "water",
                "stylers": [{
                    "saturation": 43
                }, {
                    "lightness": -11
                }, {
                    "hue": "#0088ff"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [{
                    "hue": "#ff0000"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 99
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#808080"
                }, {
                    "lightness": 54
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ece2d9"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ccdca1"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#767676"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#b8cb93"
                }]
            }, {
                "featureType": "poi.park",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.sports_complex",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.medical",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }],
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infoW = new google.maps.InfoWindow();

        var marker = Array(), i;
        for (i = 0; i < this.rutas.length; i++) {
            marker.push(new google.maps.Marker({
                position: new google.maps.LatLng(this.rutas[i][1], this.rutas[i][2]),
                map: map,
                title: this.rutas[i][0],
                icon: this.rutas[i][3]
            }));
        }
        for (i = 0; i < marker.length; i++) {
            infoW.setContent(marker[i].title);
            //console.log("lista de ubicaciones: ", marker[i].title + " ; " + marker[i].color);
            infoW.open(map, marker[i]);
        }
    }

}