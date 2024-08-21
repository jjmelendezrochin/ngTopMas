import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './user.service';
import { LogoutComponent } from './logout/logout.component';
import { FotosUbicacionComponent } from './fotos/fotos.component';
import { FotosUbicacion1Component } from './competencia/competencia.component';
import { FotosUbicacion2Component } from './caducidad/caducidad.component';
import { FotosUbicacion3Component } from './promociones-tiendas/promociones-tiendas.component';
import { ListaEmpleadosComponent } from './dashboard/lista-empleados/lista-empleados.component';
import { CargaInformacionComponent } from './dashboard/carga-informacion/carga-informacion.component';

//import { ErroresComponent } from './errores/errores.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCuurPpdRCgUDJ4kRJJDlv9hA4bxnVnWVo'
    }),
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    LogoutComponent,
    FotosUbicacionComponent,
    FotosUbicacion1Component,
    FotosUbicacion2Component,
    FotosUbicacion3Component,
    //ErroresComponent
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
