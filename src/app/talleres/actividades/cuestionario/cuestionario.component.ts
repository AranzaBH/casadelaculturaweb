import { Component, OnInit } from '@angular/core';
import { CuestionarioService, Cuestionario } from '../../../services/cuestionario.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {
  cuestionarios: Cuestionario[] = [];
  nuevoCuestionario: Cuestionario = { idCuestionario: 0, calificacion: '' };
  errorMessage: string | null = null;

  constructor(private cuestionarioService: CuestionarioService) {}

  ngOnInit(): void {
    this.cargarCuestionarios();
  }

  // Cargar todos los cuestionarios
  cargarCuestionarios(): void {
    this.cuestionarioService.obtenerTodosLosCuestionarios().subscribe(
      (data: Cuestionario[]) => {
        this.cuestionarios = data;
      },
      (error: any) => {
        console.error('Error al cargar los cuestionarios:', error);
        this.errorMessage = 'No se pudo cargar la lista de cuestionarios.';
      }
    );
  }

  // Crear un nuevo cuestionario
  agregarCuestionario(): void {
    this.cuestionarioService.crearCuestionario(this.nuevoCuestionario).subscribe(
      (cuestionario: Cuestionario) => {
        this.cuestionarios.push(cuestionario);
        this.nuevoCuestionario = { idCuestionario: 0, calificacion: '' }; // Resetear formulario
      },
      (error: any) => {
        console.error('Error al crear el cuestionario:', error);
      }
    );
  }

  // Eliminar un cuestionario
  eliminarCuestionario(idCuestionario: number): void {
    this.cuestionarioService.eliminarCuestionario(idCuestionario).subscribe(
      () => {
        this.cuestionarios = this.cuestionarios.filter(
          (c) => c.idCuestionario !== idCuestionario
        );
      },
      (error: any) => {
        console.error('Error al eliminar el cuestionario:', error);
      }
    );
  }
}
