import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { APP_BASE_HREF } from "@angular/common";
import { AgmCoreModule } from "@agm/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule, MatProgressSpinnerModule } from "@angular/material";
import { LazyLoadImageModule } from "ng-lazyload-image";

import { AppComponent } from "./app.component";
import { ListadoCooperativaComponent } from "./cooperativa/listadoCooperativa.component";
import { CrearCooperativaComponent } from "./cooperativa/crearCooperativa.component";
import { productosComponent } from "./cooperativa/productos.component";
import { CooperativaDetalleComponent } from "./cooperativa/cooperativa-detalle/cooperativa-detalle.component";
import { ProductorRegistroComponent } from "./productor/productorRegistro.component";
import { ProductorDetalleComponent } from "./productor/productor-detalle/productor-detalle.component";
import { ProductorListaComponent } from "./productor/productor-lista/productor-lista.component";
import { ActualizarDatosComponent } from "./cooperativa/actualizardatos.component";
import { RegistroAdminComponent } from "./productor/registro-admin/registro-admin.component";
import { ProductorEditarComponent } from "./productor/productor-editar/productorEditar.component";
import { ActivarCorreoComponent } from "./productor/activar-correo/activar-correo.component";

@NgModule({
  declarations: [
    AppComponent,
    ListadoCooperativaComponent,
    CrearCooperativaComponent,
    productosComponent,
    CooperativaDetalleComponent,
    ActualizarDatosComponent,
    ProductorRegistroComponent,
    ProductorDetalleComponent,
    ProductorListaComponent,
    ProductorEditarComponent,
    RegistroAdminComponent,
    ActivarCorreoComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    LazyLoadImageModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDL6TZQxNUkW3jlsAsHc8rRteGesrZmPuo",
      libraries: ["places"]
    }),
    RouterModule.forRoot([
      {
        path: "cooperativa/crearCooperativa",
        component: CrearCooperativaComponent
      },
            {
        path: "cooperativa/productos",
        component: productosComponent
      },
      {
        path: "cooperativa/listadoCooperativa",
        component: ListadoCooperativaComponent
      },
      {
        path: "cooperativa/actualizardatos/:id",
        component: ActualizarDatosComponent
      },
      {
        path: "cooperativa/detalle/:id",
        component: CooperativaDetalleComponent
      },
      {
        path: "productor/registro",
        component: ProductorRegistroComponent
      },
      {
        path: "productor/detalle/:id",
        component: ProductorDetalleComponent
      },
      {
        path: "productor/lista",
        component: ProductorListaComponent
      },
      {
        path: "productor/editar/:id",
        component: ProductorEditarComponent
      },
      {
        path: "productor/admin/registro",
        component: RegistroAdminComponent
      },
      {
        path: "productor/correo/activar",
        component: ActivarCorreoComponent
      }
    ])
  ],
 providers: [{provide: APP_BASE_HREF, useValue : "/" }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

