import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenService {
  PHP_API_SERVER = environment.servidor.TAG_SERVIDOR;
  public url_servidor =  this.PHP_API_SERVER + "/CargaArchivos/cargarimagen.php";

    
  constructor(private http: HttpClient) { }
  
  public postFileImagen(imagenParaSubir: File){

		const formData = new FormData(); 
		formData.append('imagenPropia', imagenParaSubir, imagenParaSubir.name); 
		return this.http.post(this.url_servidor, formData);

	}
}
