import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ProductorService } from '../productor.service';
import { NgModel } from '@angular/forms';
import { ListadoCooperativaService } from '../../cooperativa/listadoCooperativa.service';
import { GoogleMapsAPIWrapper } from '@agm/core';
import {mapTo} from "rxjs/operator/mapTo";


@Component({
  selector: 'app-productor-registro',
  templateUrl: './productorEditar.component.html',
  styleUrls: ['./productorEditar.component.css'],
  providers: [
    ProductorService,
    ListadoCooperativaService,
    GoogleMapsAPIWrapper
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ProductorEditarComponent implements OnInit {
  title: String = "Editar Productor";
  marker: any = {};

  productor: any = {
    "tipo_documento": -1,
    "cooperativa": -1
  };
  cooperativas: any[];

  constructor(private productorService: ProductorService,
              private cooperativaService: ListadoCooperativaService,
              public gMaps: GoogleMapsAPIWrapper,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {
    this.cooperativaService.getCooperativas()
          .subscribe(response => {
            this.cooperativas = response;
          });

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

    //Capturar informacion del productor a editar

    this.route.params
      .switchMap((params: Params) =>
        this.productorService.getProd(+params["id"])
      ).subscribe(response => {
            this.productor = response;
              this.marker = {
                latitud: this.productor.latitud,
                longitud: this.productor.longitud
              };
              console.log( this.marker)

          });

  }

  editarProductor() {

    console.log(this.marker)

    if(this.productor.nombre && this.productor.descripcion && this.productor.tipo_documento
        && this.productor.documento && this.productor.direccion && this.productor.cooperativa
        && this.productor.foto && this.marker){

      console.log(this.productor)
      return false

      /*this.route.params
      .switchMap((params: Params) =>
        this.productorService.editarProductor(this.productor, params["id"])
      ).subscribe(response => {
        alert("Productor actualizado!");
        this.productor = {};
        this.router.navigateByUrl('productor/lista');
      });*/
    }
  }

  loadFoto(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e:FileReaderEvent) {
            this.productor.foto = e.target.result;
        }.bind(this);

        reader.readAsDataURL(input.files[0]);
    }
  }

  mapClicked($event: any) {

    this.productor.latitud = $event.coords.lat
    this.productor.latitud = $event.coords.lng

    this.marker = {
      latitud: $event.coords.lat,
      longitud: $event.coords.lng
    };
  }

}

interface FileReaderEventTarget extends EventTarget {
    result:string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
}
