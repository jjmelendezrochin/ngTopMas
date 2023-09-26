import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CatUsuariosComponent } from '../../cat-usuarios/cat-usuarios.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CatProductosComponent } from '../../cat-productos/cat-productos.component';
import { CatCadenaComponent } from '../../cat-cadena/cat-cadena.component';
import { CatFormatosComponent } from '../../cat-formatos/cat-formatos.component';
import { CatPromotorComponent } from '../../cat-promotor/cat-promotor.component';
import { CatRutasComponent } from '../../cat-rutas/cat-rutas.component';
import { FotosComponent } from '../../fotos/fotos.component';
import { EstanciaComponent } from '../../estancia/estancia.component';
import { DistanciaComponent } from '../../distancia/distancia.component';
import { GenerarReporteExcelComponent } from '../../generar-reporte-excel/generar-reporte-excel.component';
import { MatTabsModule, MatPaginatorIntl, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { PaginatePipe } from '../../pipes/paginate.pipe';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } else {
      return date.toDateString();
    }
  }
}

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatPaginatorModule,
  NativeDateAdapter,
  MatDateFormats,
  MAT_DATE_FORMATS,
  DateAdapter,
  MatDialogModule
} from '@angular/material';
import { Paginacion } from 'app/Objetos/paginacion';
import { CatSupervisorComponent } from 'app/cat-supervisor/cat-supervisor.component';
import { CatZonasComponent } from 'app/cat-zonas/cat-zonas.component';
import { GraficasComponent } from 'app/graficas/graficas.component';
import { ReportePreciosXproductoMensualComponent } from '../../reporte-precios-xproducto-mensual/reporte-precios-xproducto-mensual.component';
import { CatPromocionesComponent } from '../../cat-promociones/cat-promociones.component';
import { CompetenciaComponent } from '../../competencia/competencia.component';
import { PromocionesTiendasComponent } from '../../promociones-tiendas/promociones-tiendas.component';
import { CatEmpresasComponent } from '../../cat-empresas/cat-empresas.component';
import { CaducidadComponent } from '../../caducidad/caducidad.component';
import { ErroresComponent } from 'app/errores/errores.component';
import { PromocionesUltModComponent } from '../../promociones-ult-mod/promociones-ult-mod.component';
import { ListaEmpleadosComponent } from 'app/dashboard/lista-empleados/lista-empleados.component';
import { GestionAjusteAcumuladoComponent } from '../../gestion-ajuste-acumulado/gestion-ajuste-acumulado.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgbModule
  ],
  declarations: [
    PaginatePipe,
    DashboardComponent,
    CatUsuariosComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    CatProductosComponent,
    CatCadenaComponent,
    CatFormatosComponent,
    CatPromotorComponent,
    CatSupervisorComponent,
    CatRutasComponent,
    FotosComponent,
    EstanciaComponent,
    DistanciaComponent,
    GenerarReporteExcelComponent,
    CatZonasComponent,
    CatPromocionesComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    GraficasComponent,
    ReportePreciosXproductoMensualComponent,
    CompetenciaComponent,
    CaducidadComponent,
    PromocionesTiendasComponent,
    CatEmpresasComponent,
    ErroresComponent,
    PromocionesUltModComponent,
    ListaEmpleadosComponent,
    GestionAjusteAcumuladoComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: Paginacion },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class AdminLayoutModule { }


