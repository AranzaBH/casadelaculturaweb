import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo de datos basado en la entidad Preguntas
export interface Preguntas {
  idPreguntas: number;
  cuestionario: { idCuestionario: number }; // Relación con Cuestionario
  reactivo: { idReactivo: number }; // Relación con Reactivo
}

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  private apiUrl = 'http://localhost:8080/api/pregunta'; // Cambia la URL según sea necesario

  constructor(private http: HttpClient) {}

  // Obtener todas las preguntas
  obtenerTodasLasPreguntas(): Observable<Preguntas[]> {
    return this.http.get<Preguntas[]>(this.apiUrl);
  }

  // Obtener una pregunta por ID
  obtenerPreguntaPorId(idPregunta: number): Observable<Preguntas> {
    return this.http.get<Preguntas>(`${this.apiUrl}/${idPregunta}`);
  }

  // Crear una nueva pregunta
  crearPregunta(pregunta: Preguntas): Observable<Preguntas> {
    return this.http.post<Preguntas>(this.apiUrl, pregunta);
  }

  // Actualizar una pregunta existente
  actualizarPregunta(idPregunta: number, pregunta: Preguntas): Observable<Preguntas> {
    return this.http.put<Preguntas>(`${this.apiUrl}/${idPregunta}`, pregunta);
  }

  // Eliminar una pregunta
  eliminarPregunta(idPregunta: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idPregunta}`);
  }
}
