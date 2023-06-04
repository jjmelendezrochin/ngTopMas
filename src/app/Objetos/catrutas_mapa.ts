declare const google: any; /*variable auxiliar maps*/

export class CatRutas_Map {
    selectedCatRutas: any;
    rutasservice: any;
    maps: any;
    mapOptions: any;
    myLatlng: any;
    map: any;
    marker: any;
    geocoder: any;

    constructor(maps: any, rutasservice: any) {
        this.maps = maps;
        this.rutasservice = rutasservice;
    }

    iniciarGMaps() {
        this.myLatlng = new google.maps.LatLng(0, 0);
        this.mapOptions = {
            zoom: 6,
            center: this.myLatlng,
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
            }]
        };
        this.map = new google.maps.Map(this.maps.nativeElement, this.mapOptions);
        this.marker = new google.maps.Marker({
            position: this.myLatlng,
            title: ''
        });
        this.geocoder = new google.maps.Geocoder();
    }

    /* Maps */
    setMap(lat: number, lng: number, direccion: string) {
        if (lat != 0 && lng != 0) {
            this.map.setCenter({ lat: lat, lng: lng });
            this.marker.setTitle("direccion");
            this.marker.setPosition({ lat: lat, lng: lng });
        }

        if (lat == 0 && lng == 0) {
            const _map = this.map;
            const _marker = this.marker;
            const _rutasservice = this.rutasservice;
            const _selectedCatRutas = this.selectedCatRutas;
            this.geocoder.geocode({ 'address': direccion }, function (results, status) {
                if (status === 'OK') {
                    _map.setCenter(results[0].geometry.location);
                    _marker.setTitle(direccion);
                    _marker.setPosition(results[0].geometry.location);
                    // console.log("[Latitud: " + _marker.position.lat() + ", Longitud: " + _marker.position.lng() + "]");
                    _rutasservice.updateLatitudLongitudGMapsServicios(_marker.position.lat(), _marker.position.lng(), direccion).subscribe((grutas: any) => {
                        _selectedCatRutas.latitud = _marker.position.lat();
                        _selectedCatRutas.longitud = _marker.position.lng();
                        // console.log("Latitud y longitud actualizada");
                    });
                } else {
                    // alert('La localización no fue satisfactoria por la siguiente razón: ' + status);
                }
            });
        }

        // To add the marker to the map, call setMap();
        this.marker.setMap(this.map);
    }
}