import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper'; // Asegúrate de tener un archivo helper.ts con la base de URL

@Injectable({
  providedIn: 'root'
})
export class TipoTallerService {

  constructor(private httpClient: HttpClient) { }

  // Método para obtener todos los tipos de taller
  public obtenerTipoTalleres() {
    return this.httpClient.get(`${baserUrl}/api/tipotaller`);
  }

  // Método para obtener un tipo de taller por ID
  public obtenerTipoTallerPorId(id: number) {
    return this.httpClient.get(`${baserUrl}/api/tipotaller/${id}`);
  }

  // Método para crear un nuevo tipo de taller
  public añadirTipoTaller(tipoTaller: any) {
    return this.httpClient.post(`${baserUrl}/api/tipotaller`, tipoTaller);
  }

  // Método para actualizar un tipo de taller
  public actualizarTipoTaller(id: number, tipoTaller: any) {
    return this.httpClient.put(`${baserUrl}/api/tipotaller/${id}`, tipoTaller);
  }

  // Método para eliminar un tipo de taller
  public eliminarTipoTaller(id: number) {
    return this.httpClient.delete(`${baserUrl}/api/tipotaller/${id}`);
  }
}
