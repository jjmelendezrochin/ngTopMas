import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IncidenciasService } from 'app/Servicios/incidencias.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dar-respuesta',
  templateUrl: './dar-respuesta.component.html',
  styleUrls: ['./dar-respuesta.component.scss']
})
export class DarRespuestaComponent implements OnInit, OnDestroy {

  @Output('respuesta-dada') respuesta_dada: EventEmitter<void> = new EventEmitter<void>();

  item: { [key: string]: any } = {};

  private subscription: Subscription;

  constructor(
    private incidenciasService: IncidenciasService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.respuesta_dada.complete();
    this.unsubscribe();
  }

  darRespuesta() {
    this.subscription = this.incidenciasService.darRespuesta(this.item).subscribe({
      next: (response: any) => {
        if (parseInt(response.idRes) == 0) {
          this.toaster.success(response.Mensaje, "", {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          });
          $('#ventanaDarRespuesta').modal('hide');
          this.respuesta_dada.emit();
        } else {
          this.toaster.error(response.Mensaje, "", {
            timeOut: 1000,
            positionClass: 'toast-bottom-center'
          });
        }
      },
      error: (error) => {
        this.toaster.error(error, "", {
          timeOut: 1000,
          positionClass: 'toast-bottom-center'
        });
      },
      complete: () => {
        this.unsubscribe();
      }

    });
  }

  VerRespuesta(item: any) {
    $('#ventanaDarRespuesta').on("shown.bs.modal", () => {
      this.item = item;
    });
    $('#ventanaDarRespuesta').on("hidden.bs.modal", () => {
      this.item = { respuesta: '' };
    });

    $('#ventanaDarRespuesta').modal('show');
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
