import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { environment } from "environments/environment";
import { ToastrService } from 'ngx-toastr';
import { usuario } from './Objetos/usuario';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private userService: UserService
  ) {
    this.matIconRegistry.addSvgIcon(
      'panelcontrol',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/panelcontrol.svg")
    );
    let user: usuario = userService.getUserLoggedIn();
    if (user != null) {
      environment.servidor.TAG_IDEMPRESA = user.idempresa;
    }
  }

}