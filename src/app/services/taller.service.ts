import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper'; // Define tu base URL en este archivo (helper.ts)
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class TallerService {
  constructor(private httpClient: HttpClient) {}

  // Obtener todos los talleres
  
   
  obtenerTalleres(): Observable<any> {
    return this.httpClient.get(`${baserUrl}/api/taller`); // Obtener la lista de talleres
  }

  // Obtener un taller por ID
  public obtenerTallerPorId(idTaller: number) {
    return this.httpClient.get(`${baserUrl}/api/taller/${idTaller}`);
  }

  // Crear un nuevo taller
  public crearTaller(taller: any) {
    return this.httpClient.post(`${baserUrl}/api/taller`, taller);
  }

  // Actualizar un taller existente
  public actualizarTaller(idTaller: number, taller: any) {
    return this.httpClient.put(`${baserUrl}/api/taller/${idTaller}`, taller);
  }

  // Eliminar un taller por ID
  public eliminarTaller(idTaller: number) {
    return this.httpClient.delete(`${baserUrl}/api/taller/${idTaller}`);
  }
}
