import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper'; // Define tu base URL en este archivo (helper.ts)
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TallerService {
  constructor(private httpClient: HttpClient) {}

  // Obtener todos los talleres
  obtenerTalleres(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${baserUrl}/api/taller`); // Obtener la lista de talleres
  }

  // Obtener un taller por ID
  obtenerTallerPorId(idTaller: number): Observable<any> {
    return this.httpClient.get<any>(`${baserUrl}/api/taller/${idTaller}`);
  }

  // Crear un nuevo taller
  crearTaller(taller: any): Observable<any> {
    return this.httpClient.post<any>(`${baserUrl}/api/taller`, taller);
  }

  // Actualizar un taller existente
  actualizarTaller(idTaller: number, taller: any): Observable<any> {
    return this.httpClient.put<any>(`${baserUrl}/api/taller/${idTaller}`, taller);
  }

  // Eliminar un taller por ID
  eliminarTaller(idTaller: number): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/api/taller/${idTaller}`);
  }
}
