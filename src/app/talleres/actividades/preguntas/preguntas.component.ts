import { Component, OnInit } from '@angular/core';
import { PreguntasService, Preguntas } from '../../../services/preguntas.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  preguntas: Preguntas[] = [];
  nuevaPregunta: Preguntas = {
    idPreguntas: 0,
    cuestionario: { idCuestionario: 0 },
    reactivo: { idReactivo: 0 }
  };
  errorMessage: string | null = null;

  constructor(private preguntasService: PreguntasService) {}

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  // Cargar todas las preguntas
  cargarPreguntas(): void {
    this.preguntasService.obtenerTodasLasPreguntas().subscribe(
      (data: Preguntas[]) => {
        this.preguntas = data;
      },
      (error: any) => {
        console.error('Error al obtener las preguntas:', error);
        this.errorMessage = 'No se pudo cargar la lista de preguntas.';
      }
    );
  }

  // Crear una nueva pregunta
  agregarPregunta(): void {
    this.preguntasService.crearPregunta(this.nuevaPregunta).subscribe(
      (pregunta: Preguntas) => {
        this.preguntas.push(pregunta);
        this.nuevaPregunta = { idPreguntas: 0, cuestionario: { idCuestionario: 0 }, reactivo: { idReactivo: 0 } }; // Resetear formulario
      },
      (error: any) => {
        console.error('Error al crear la pregunta:', error);
      }
    );
  }

  // Eliminar una pregunta
  eliminarPregunta(idPregunta: number): void {
    this.preguntasService.eliminarPregunta(idPregunta).subscribe(
      () => {
        this.preguntas = this.preguntas.filter((p) => p.idPreguntas !== idPregunta);
      },
      (error: any) => {
        console.error('Error al eliminar la pregunta:', error);
      }
    );
  }
}
