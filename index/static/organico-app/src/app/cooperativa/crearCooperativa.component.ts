import { Component , ElementRef, NgZone, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CrearCooperativaService } from './crearCooperativa.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';


@Component({
  //selector: 'app-crearCooperativa',
  templateUrl: './crearCooperativa.component.html',
  providers: [
    CrearCooperativaService
  ]
})
export class CrearCooperativaComponent{
  title = 'Crear cooperativa';
  envioFormCooperativa = false;
  marker: any = {};
  @ViewChild("direccion")
  public searchElementRef: ElementRef;

  constructor(private crearCooperativaServices: CrearCooperativaService,
              private router: Router ,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone ){

    this.marker = {
        latitud: 4.6486259,
        longitud: -74.2478963,
        zoom : 10
    }

    this.setGeoLocalitation();
    this.setAutocomplete();

  }

  setAutocomplete(){ //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.marker.latitud = place.geometry.location.lat();
          this.marker.longitud = place.geometry.location.lng();
          this.marker.zoom = 12;

        });
      });
    });
  }

  setGeoLocalitation(){
    if (window.navigator && window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(
              position => {
                  this.marker = {
                    latitud: position.coords.latitude,
                    longitud: position.coords.longitude
                  };
              },
              error => {
                  switch (error.code) {
                      case 1:
                          console.log('Permission Denied');
                          break;
                      case 2:
                          console.log('Position Unavailable');
                          break;
                      case 3:
                          console.log('Timeout');
                          break;
                  }
              }
          );
      };
  }

  guardarCooperativa( formCooperativa: NgForm ) {
    //console.log(formCooperativa.value);
    //console.log(formCooperativa.valid);

    formCooperativa.controls['latitud'].setValue(this.marker.latitud );
    formCooperativa.controls['longitud'].setValue(this.marker.longitud );

    this.envioFormCooperativa = true;
    if (formCooperativa.valid) {
      let resultado = this.crearCooperativaServices.guardarCooperativa(formCooperativa.value).subscribe();
      if( resultado ){
        alert("Datos guardados correctamente");
        this.router.navigateByUrl('cooperativa/listadoCooperativa');
      }else{
        alert("Error almacenando datos");
      }
    }else{
      //alert("Por favor llene todos los campos que son obligatorios. (*) ");
    }
  }

  mapClicked($event: any , formCooperativa: NgForm) {// Esta funcion fue modificada para cuando de clic cargue la direccion desde el mapa
    this.marker.latitud = $event.coords.lat;
    this.marker.longitud = $event.coords.lng;
    this.marker.zoom = 12;

    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(this.marker.latitud, this.marker.longitud);
    let request = { location: latlng };

    geocoder.geocode( request, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0] != null) {
          formCooperativa.controls['direccion'].setValue(results[0].formatted_address );
          //formCooperativa.value.direccion = results[0].formatted_address ;
        } else {
          console.log( "No address available" )
        }
      }else
        console.log( "No esta disponible el geocoder" )
    });
  }


}
