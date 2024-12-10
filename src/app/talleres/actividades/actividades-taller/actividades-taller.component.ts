import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importar Router
import { ActividadService } from '../../../services/actividad.service';  // Importar el servicio de actividades
import { TallerService } from '../../../services/taller.service';

@Component({
  selector: 'app-actividades-taller',
  templateUrl: './actividades-taller.component.html',
  styleUrls: ['./actividades-taller.component.css'],
})
export class ActividadesTallerComponent implements OnInit {
  talleres: any[] = [];
  actividades: any[] = [];
  tallerSeleccionado: any;

  constructor(
    private actividadService: ActividadService,
    private tallerService: TallerService,
    private router: Router  // Inyectamos Router para navegar
  ) {}

  ngOnInit(): void {
    this.cargarTalleres();  // Cargar los talleres al iniciar
  }

  cargarTalleres(): void {
    this.tallerService.obtenerTalleres().subscribe((data) => {
      this.talleres = data;
    });
  }

  cargarActividades(): void {
    if (this.tallerSeleccionado) {
      this.actividadService
        .obtenerActividadesPorTaller(this.tallerSeleccionado)
        .subscribe((data) => {
          this.actividades = data;
        });
    }
  }

  // Función para ver los detalles de la actividad seleccionada
  verDetalles(idActividad: number): void {
    this.router.navigate(['admin/actividades_detalles', idActividad]);  // Navegar a la ruta con el id de la actividad
  }
}
