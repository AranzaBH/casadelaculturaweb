import { Component, OnInit } from '@angular/core';
import { CuestionarioService, Cuestionario, Reactivo } from '../../../../../services/cuestionario.service';

@Component({
  selector: 'app-cuestionario-user',
  templateUrl: './cuestionario-user.component.html',
  styleUrls: ['./cuestionario-user.component.css'],
})
export class CuestionarioUserComponent implements OnInit {
  cuestionarios: Cuestionario[] = []; // Lista de cuestionarios
  idCuestionario: number | null = null; // ID del cuestionario seleccionado
  nombreCuestionario: string = ''; // Nombre del cuestionario seleccionado
  reactivos: Reactivo[] = [];
  respuestas: { [key: number]: string } = {};
  puntaje: number | null = null;

  constructor(private cuestionarioService: CuestionarioService) {}

  ngOnInit(): void {
    this.cargarCuestionarios(); // Cargar la lista de cuestionarios
  }

  cargarCuestionarios(): void {
    this.cuestionarioService.obtenerTodosCuestionarios().subscribe({
      next: (cuestionarios) => {
        this.cuestionarios = cuestionarios;
      },
      error: (err) => {
        console.error('Error al cargar los cuestionarios:', err);
      },
    });
  }

  cargarReactivos(): void {
    if (this.idCuestionario) {
      this.cuestionarioService.obtenerReactivosPorCuestionario(this.idCuestionario).subscribe({
        next: (reactivos) => {
          this.reactivos = reactivos;
        },
        error: (err) => {
          console.error('Error al cargar los reactivos:', err);
        },
      });
    } else {
      console.error('El ID del cuestionario no está definido.');
    }
  }

  obtenerOpciones(reactivo: Reactivo): string[] {
    return [
      reactivo.respuesta1,
      reactivo.respuesta2,
      reactivo.respuesta3 || '',
      reactivo.respuesta4 || '',
      reactivo.respuesta5 || '',
    ].filter((opcion) => opcion); // Elimina opciones vacías
  }

  registrarRespuesta(indice: number, opcion: string): void {
    this.respuestas[indice] = opcion;
  }

  calcularPuntaje(): void {
    let correctas = 0;
  
    this.reactivos.forEach((reactivo, index) => {
      if (this.respuestas[index] === reactivo.respuestaCorrecta) {
        correctas++;
      }
    });
  
    // Calcular el porcentaje
    const totalReactivos = this.reactivos.length;
    this.puntaje = totalReactivos > 0 ? (correctas / totalReactivos) * 100 : 0;
  }
  

  // Método para manejar la selección de un cuestionario
  onSeleccionarCuestionario(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Conversión del tipo
    const id = selectElement?.value ? parseInt(selectElement.value, 10) : null; // Asegurarse de que no sea null

    if (id) {
      this.idCuestionario = id;
      const cuestionarioSeleccionado = this.cuestionarios.find(c => c.idCuestionario === id);
      this.nombreCuestionario = cuestionarioSeleccionado ? cuestionarioSeleccionado.nombreCuestionario : '';
      this.cargarReactivos(); // Cargar los reactivos del cuestionario seleccionado
    }
  }
}
