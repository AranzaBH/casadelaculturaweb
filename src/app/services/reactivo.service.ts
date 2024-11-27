import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reactivo {
  id: number;
  pregunta: string;
  respuestaCorrecta: string;
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;
  respuesta4: string; // Opcional
  respuesta5: string; // Opcional
}

@Injectable({
  providedIn: 'root'
})
export class ReactivoService {
  private apiUrl = 'http://localhost:8080/api/reactivos'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}

  // Obtener todos los reactivos
  obtenerTodosLosReactivos(): Observable<Reactivo[]> {
    return this.http.get<Reactivo[]>(this.apiUrl);
  }

  // Obtener un reactivo por su ID
  obtenerReactivoPorId(idReactivo: number): Observable<Reactivo> {
    return this.http.get<Reactivo>(`${this.apiUrl}/${idReactivo}`);
  }

  // Crear un nuevo reactivo
  crearReactivo(reactivo: Reactivo): Observable<Reactivo> {
    return this.http.post<Reactivo>(this.apiUrl, reactivo);
  }

  // Actualizar un reactivo existente
  actualizarReactivo(idReactivo: number, reactivo: Reactivo): Observable<Reactivo> {
    return this.http.put<Reactivo>(`${this.apiUrl}/${idReactivo}`, reactivo);
  }

  // Eliminar un reactivo por su ID
  eliminarReactivo(idReactivo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idReactivo}`);
  }
}
