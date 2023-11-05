import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { CatProductosComponent } from "../../cat-productos/cat-productos.component";
import { CatCadenaComponent } from "../../cat-cadena/cat-cadena.component";
import { CatPromotorComponent } from "../../cat-promotor/cat-promotor.component";
import { CatRutasComponent } from "../../cat-rutas/cat-rutas.component";
import { FotosComponent } from "../../fotos/fotos.component";
import { EstanciaComponent } from "../../estancia/estancia.component";
import { DistanciaComponent } from "../../distancia/distancia.component";
import { GenerarReporteExcelComponent } from "../../generar-reporte-excel/generar-reporte-excel.component";
import { CatSupervisorComponent } from "app/cat-supervisor/cat-supervisor.component";
import { CatZonasComponent } from "app/cat-zonas/cat-zonas.component";
import { CatPromocionesComponent } from "app/cat-promociones/cat-promociones.component";
import { CatFormatosComponent } from "app/cat-formatos/cat-formatos.component";
import { CatUsuariosComponent } from "app/cat-usuarios/cat-usuarios.component";
import { GraficasComponent } from "app/graficas/graficas.component";
import { ReportePreciosXproductoMensualComponent } from "app/reporte-precios-xproducto-mensual/reporte-precios-xproducto-mensual.component";
import { from } from "rxjs";
import { CompetenciaComponent } from "app/competencia/competencia.component";
import { PromocionesTiendasComponent } from "app/promociones-tiendas/promociones-tiendas.component";
import { CatEmpresasComponent } from "app/cat-empresas/cat-empresas.component";
import { CaducidadComponent } from "app/caducidad/caducidad.component";
import { ErroresComponent } from "app/errores/errores.component";
import { PromocionesUltModComponent } from "app/promociones-ult-mod/promociones-ult-mod.component";
import { GestionAjusteAcumuladoComponent } from "app/gestion-ajuste-acumulado/gestion-ajuste-acumulado.component";
import { ReporteSclComponent } from "app/reporte-scl/reporte-scl.component";
import { ReporteAcumuladoMensualComponent } from "app/reporte-acumulado-mensual/reporte-acumulado-mensual.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "catusuarios", component: CatUsuariosComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "table-list", component: TableListComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "catalogoproductos", component: CatProductosComponent },
  { path: "catalogocadena", component: CatCadenaComponent },
  { path: "catalogoformatos", component: CatFormatosComponent },
  { path: "catalogopromotor", component: CatPromotorComponent },
  { path: "catalogosupervisor", component: CatSupervisorComponent },
  { path: "catalogorutas", component: CatRutasComponent },
  { path: "catalogoempresas", component: CatEmpresasComponent },
  { path: "fotos", component: FotosComponent },
  { path: "competencia", component: CompetenciaComponent },
  { path: "caducidad", component: CaducidadComponent },
  { path: "estancia", component: EstanciaComponent },
  { path: "distancia", component: DistanciaComponent },
  { path: "reporte_excel", component: GenerarReporteExcelComponent },
  { path: "catalogozonas", component: CatZonasComponent },
  { path: "catalogopromociones", component: CatPromocionesComponent },
  { path: "promociones", component: PromocionesUltModComponent },
  { path: "promocionestiendas", component: PromocionesTiendasComponent },
  { path: "graficas", component: GraficasComponent },
  { path: "errores", component: ErroresComponent },
  { path: "gestion-ajuste-acumulado", component: GestionAjusteAcumuladoComponent },
  { path: "reporteprecioxproductomensual", component: ReportePreciosXproductoMensualComponent },
  { path: "reporte_scl/reporte_asistencia", component: ReporteSclComponent, data: { idmodulo: '1', nombre_modulo: 'Reporte de asistencia' } },
  { path: "reporte_scl/presentaciones_canjes", component: ReporteSclComponent, data: { idmodulo: '2', nombre_modulo: 'Reporte de presentaciones de canjes' } },
  { path: "reporte_scl/reporte_historico", component: ReporteSclComponent, data: { idmodulo: '3', nombre_modulo: 'Reporte histórico' } },
  { path: "reporte_scl/reporte_desplazamiento", component: ReporteSclComponent, data: { idmodulo: '4', nombre_modulo: 'Reporte desplazamiento' } },
  { path: "reporte_scl/slide_santa_clara", component: ReporteSclComponent, data: { idmodulo: '5', nombre_modulo: 'Generar Slide' } },
  { path: "reporte_acumulado_mensual", component: ReporteAcumuladoMensualComponent }
];
