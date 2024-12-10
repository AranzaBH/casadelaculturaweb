import { Component, OnInit } from '@angular/core';
import { InscripcionService } from '../../../services/inscripcion.service';
import { TallerService } from '../../../services/taller.service';

@Component({
  selector: 'app-talleres-user',
  templateUrl: './talleres-user.component.html',
  styleUrls: ['./talleres-user.component.css'],
})
export class TalleresUserComponent implements OnInit {
  talleres: any[] = []; // Almacena los talleres detallados
  errorMessage: string | null = null; // Manejo de errores

  constructor(
    private inscripcionesService: InscripcionService,
    private tallerService: TallerService
  ) {}

  ngOnInit(): void {
    this.cargarTalleres();
  }

  cargarTalleres(): void {
    const idUsuario = 2; // Aquí debes obtener el ID del usuario (por ejemplo desde un servicio de autenticación)

    // 1. Obtener las inscripciones del usuario
    this.inscripcionesService.obtenerInscripcionesPorUsuario(2).subscribe({
      next: (inscripciones) => {
        this.talleres = inscripciones.map((inscripcion: any) => inscripcion.taller);
      },
      error: (err) => {
        console.error('Error al cargar los talleres inscritos:', err);
      }
    });
  }

  private obtenerDetallesTalleres(inscripciones: any[]): void {
    // 3. Obtener los talleres usando los ids de los talleres en las inscripciones
    const solicitudes = inscripciones.map((inscripcion) =>
      this.tallerService.obtenerTallerPorId(inscripcion.idTaller).toPromise()
    );

    Promise.all(solicitudes)
      .then((talleres) => {
        this.talleres = talleres;
      })
      .catch((error) => {
        console.error('Error al obtener los detalles de los talleres:', error);
        this.errorMessage = 'Hubo un problema al obtener los detalles de los talleres.';
      });
  }
}
