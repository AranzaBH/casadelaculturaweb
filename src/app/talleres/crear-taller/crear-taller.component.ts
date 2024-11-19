import { Component, OnInit } from '@angular/core';
import { TipoTallerService } from './../../services/tipo-taller.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-taller',
  templateUrl: './crear-taller.component.html',
  styleUrls: ['./crear-taller.component.css'],
})
export class CrearTallerComponent implements OnInit {
  
  // Objeto para representar el nuevo tipo de taller
  newTipoTaller = { nombreTipoTaller: '', descripcion: '' };

  constructor(
    private tipoTallerService: TipoTallerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // Método para crear un nuevo tipo de taller
  agregarTipoTaller(): void {
    this.tipoTallerService.añadirTipoTaller(this.newTipoTaller).subscribe(
      (data) => {
        // Mostrar mensaje de éxito
        this.snackBar.open('Tipo de taller creado exitosamente!', 'Cerrar', {
          duration: 3000,
          panelClass: ['snack-success'],
        });

        // Limpiar el formulario
        this.newTipoTaller = { nombreTipoTaller: '', descripcion: '' };

        // Opción para mostrar alerta con SweetAlert2
        Swal.fire({
          title: 'Éxito',
          text: 'El tipo de taller ha sido creado.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (error) => {
        // Mostrar mensaje de error
        this.snackBar.open('Hubo un error al crear el tipo de taller.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snack-error'],
        });

        // Mostrar alerta de error con SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el tipo de taller. Intente de nuevo.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
