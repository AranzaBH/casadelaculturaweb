import { Component, OnInit } from '@angular/core';
import { ReactivoService, Reactivo } from '../../../services/reactivo.service';

@Component({
  selector: 'app-reactivo',
  templateUrl: './reactivo.component.html',
  styleUrls: ['./reactivo.component.css']
})
export class ReactivoComponent implements OnInit {
  reactivos: Reactivo[] = [];
  nuevoReactivo: Reactivo = {
    id: 0,
    pregunta: '',
    respuestaCorrecta: '',
    respuesta1: '',
    respuesta2: '',
    respuesta3: '',
    respuesta4: '',
    respuesta5: ''
  };

  constructor(private reactivoService: ReactivoService) {}

  ngOnInit(): void {
    this.cargarReactivos();
  }

  cargarReactivos(): void {
    this.reactivoService.obtenerTodosLosReactivos().subscribe(
      (data: Reactivo[]) => {
        this.reactivos = data;
      },
      (error: any) => {
        console.error('Error al obtener los reactivos:', error);
      }
    );
  }

  agregarReactivo(): void {
    this.reactivoService.crearReactivo(this.nuevoReactivo).subscribe(
      (reactivo: Reactivo) => {
        this.reactivos.push(reactivo); // Agregar el nuevo reactivo a la lista
        this.nuevoReactivo = { id: 0, pregunta: '', respuestaCorrecta: '', respuesta1: '', respuesta2: '', respuesta3: '', respuesta4: '', respuesta5: '' }; // Resetear el formulario
      },
      (error: any) => {
        console.error('Error al agregar el reactivo:', error);
      }
    );
  }

  eliminarReactivo(id: number): void {
    this.reactivoService.eliminarReactivo(id).subscribe(
      () => {
        this.reactivos = this.reactivos.filter((r) => r.id !== id);
      },
      (error: any) => {
        console.error('Error al eliminar el reactivo:', error);
      }
    );
  }
}
