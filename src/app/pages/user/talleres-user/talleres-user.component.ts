import { Component, OnInit } from '@angular/core';
import { InscripcionService } from '../../../services/inscripcion.service';

@Component({
  selector: 'app-talleres-user',
  templateUrl: './talleres-user.component.html',
  styleUrls: ['./talleres-user.component.css'],
})
export class TalleresUserComponent implements OnInit {
  talleres: any[] = [];

  constructor(private inscripcionesService: InscripcionService) {}

  ngOnInit(): void {
    this.cargarTalleres();
  }

  cargarTalleres(): void {
    this.inscripcionesService.obtenerInscripciones().subscribe(
      (data) => {
        this.talleres = data;
      },
      (error) => {
        console.error('Error al cargar talleres:', error);
      }
    );
  }
}
