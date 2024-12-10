import { Component } from '@angular/core';
import { CuestionarioService, Cuestionario, Reactivo } from '../../../services/cuestionario.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css'],
})
export class CuestionarioComponent {
  cuestionario: Cuestionario = {
    nombreCuestionario: '',
    instrucciones: '',
    calificacion: 0,
  };

  nuevoReactivo: Partial<Reactivo> = {
    pregunta: '',
    respuestaCorrecta: '',
    respuesta1: '',
    respuesta2: '',
    respuesta3: '',
    respuesta4: '',
    respuesta5: '',
  };

  reactivosPreagregados: Partial<Reactivo>[] = [];

  constructor(private cuestionarioService: CuestionarioService) {}

  // Preagregar un reactivo temporalmente
  preagregarReactivo(): void {
    if (!this.nuevoReactivo.pregunta || !this.nuevoReactivo.respuestaCorrecta) {
      console.error('Debes completar la pregunta y la respuesta correcta.');
      return;
    }

    this.reactivosPreagregados.push({ ...this.nuevoReactivo });
    this.nuevoReactivo = {
      pregunta: '',
      respuestaCorrecta: '',
      respuesta1: '',
      respuesta2: '',
      respuesta3: '',
      respuesta4: '',
      respuesta5: '',
    };
  }

  // Eliminar un reactivo de la lista temporal
  eliminarReactivo(index: number): void {
    this.reactivosPreagregados.splice(index, 1);
  }

  // Guardar el cuestionario y sus reactivos
  guardarCuestionarioYReactivos(): void {
    if (!this.cuestionario.nombreCuestionario || this.reactivosPreagregados.length === 0) {
      console.error('El cuestionario debe tener un nombre y al menos un reactivo.');
      return;
    }

    this.cuestionarioService.crearCuestionario(this.cuestionario).subscribe({
      next: (cuestionarioCreado) => {
        if (cuestionarioCreado.idCuestionario) {
          this.guardarReactivos(cuestionarioCreado.idCuestionario);
        } else {
          console.error('No se recibió un ID válido para el cuestionario.');
        }
      },
      error: (err) => {
        console.error('Error al crear el cuestionario:', err);
      },
    });
  }

  // Guardar todos los reactivos asociados al cuestionario
  private guardarReactivos(idCuestionario: number): void {
    const reactivosConId = this.reactivosPreagregados.map((reactivo) => ({
      ...reactivo,
      cuestionario: { idCuestionario },
    }));

    const peticiones = reactivosConId.map((reactivo) =>
      this.cuestionarioService.crearReactivo(reactivo as Reactivo)
    );

    forkJoin(peticiones).subscribe({
      next: (resultados) => {
        console.log('Todos los reactivos se guardaron correctamente:', resultados);
        this.reiniciarFormulario();
      },
      error: (err) => {
        console.error('Error al guardar uno o más reactivos:', err);
      },
    });
  }

  // Reiniciar el formulario y los reactivos
  private reiniciarFormulario(): void {
    this.cuestionario = { nombreCuestionario: '', instrucciones: '', calificacion: 0 };
    this.reactivosPreagregados = [];
    this.nuevoReactivo = {
      pregunta: '',
      respuestaCorrecta: '',
      respuesta1: '',
      respuesta2: '',
      respuesta3: '',
      respuesta4: '',
      respuesta5: '',
    };
    console.log('Formulario reiniciado.');
  }
}
