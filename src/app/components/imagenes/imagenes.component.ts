import { Component, OnInit } from '@angular/core';
import { ImagenesService } from '../../services/imagenes.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css'],
})
export class ImagenesComponent implements OnInit {
  imagenes: any[] = []; // Lista de imágenes
  selectedFile: File | null = null; // Archivo seleccionado
  errorMessage: string | null = null; // Mensaje de error
  successMessage: string | null = null; // Mensaje de éxito

  constructor(private imagenesService: ImagenesService) {}

  ngOnInit(): void {
    this.cargarImagenes();
  }

  // Cargar todas las imágenes
  cargarImagenes(): void {
    this.imagenesService.listarImagenes().subscribe({
      next: (imagenes) => {
        this.imagenes = imagenes;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar las imágenes.';
      },
    });
  }

  // Manejar selección de archivo
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Subir una nueva imagen
  subirImagen(): void {
    if (this.selectedFile) {
      this.imagenesService.subirImagen(this.selectedFile).subscribe({
        next: (imagen) => {
          this.successMessage = 'Imagen subida con éxito.';
          this.cargarImagenes(); // Recargar las imágenes
          this.selectedFile = null;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al subir la imagen.';
        },
      });
    } else {
      this.errorMessage = 'Por favor selecciona una imagen.';
    }
  }

  // Eliminar una imagen
  eliminarImagen(idImagen: number): void {
    this.imagenesService.eliminarImagen(idImagen).subscribe({
      next: () => {
        this.successMessage = 'Imagen eliminada con éxito.';
        this.cargarImagenes(); // Recargar las imágenes
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al eliminar la imagen.';
      },
    });
  }
}
