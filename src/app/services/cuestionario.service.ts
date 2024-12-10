import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cuestionario {
  idCuestionario?: number;  // Hacer que sea opcional
  nombreCuestionario: string;
  instrucciones: string;
  calificacion: number;
}

export interface Reactivo {
  idReactivo?: number;
  pregunta: string;
  respuestaCorrecta: string;
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;
  respuesta4?: string;
  respuesta5?: string;
  idCuestionario: number;
}

@Injectable({
  providedIn: 'root',
})
export class CuestionarioService {
  private apiUrl = 'http://localhost:8080/api/cuestionario';
  private apiUrlReactivos = 'http://localhost:8080/api/reactivos';

  constructor(private http: HttpClient) {}

  crearCuestionario(cuestionario: Cuestionario): Observable<Cuestionario> {
    return this.http.post<Cuestionario>(this.apiUrl, cuestionario);
  }

  // servicio cuestionario.service.ts
crearReactivo(reactivo: Reactivo): Observable<any> {
  return this.http.post('http://localhost:8080/api/reactivos', reactivo);
}
obtenerReactivosPorCuestionario(idCuestionario: number): Observable<Reactivo[]> {
  return this.http.get<Reactivo[]>(`${this.apiUrlReactivos}/cuestionario/${idCuestionario}`);
}
obtenerTodosCuestionarios(): Observable<Cuestionario[]> {
  return this.http.get<Cuestionario[]>(this.apiUrl);
}
obtenerCuestionarioPorId(idCuestionario: number): Observable<Cuestionario> {
  return this.http.get<Cuestionario>(`${this.apiUrl}/${idCuestionario}`);
}
}
