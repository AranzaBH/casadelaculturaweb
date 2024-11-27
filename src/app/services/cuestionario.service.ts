import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo de datos basado en la entidad Cuestionario
export interface Cuestionario {
  idCuestionario: number;
  calificacion: string;
}

@Injectable({
  providedIn: 'root',
})
export class CuestionarioService {
  private apiUrl = 'http://localhost:8080/api/cuestionario'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener todos los cuestionarios
  obtenerTodosLosCuestionarios(): Observable<Cuestionario[]> {
    return this.http.get<Cuestionario[]>(this.apiUrl);
  }

  // Obtener un cuestionario por ID
  obtenerCuestionarioPorId(idCuestionario: number): Observable<Cuestionario> {
    return this.http.get<Cuestionario>(`${this.apiUrl}/${idCuestionario}`);
  }

  // Crear un nuevo cuestionario
  crearCuestionario(cuestionario: Cuestionario): Observable<Cuestionario> {
    return this.http.post<Cuestionario>(this.apiUrl, cuestionario);
  }

  // Actualizar un cuestionario existente
  actualizarCuestionario(idCuestionario: number, cuestionario: Cuestionario): Observable<Cuestionario> {
    return this.http.put<Cuestionario>(`${this.apiUrl}/${idCuestionario}`, cuestionario);
  }

  // Eliminar un cuestionario por ID
  eliminarCuestionario(idCuestionario: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idCuestionario}`);
  }
}
