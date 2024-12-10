import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assets-manager',
  templateUrl: './assets-manager.component.html',
  styleUrls: ['./assets-manager.component.css']
})
export class AssetsManagerComponent {
  uploadUrl = 'http://localhost:8080/api/assets/upload'; // Endpoint para subir imágenes
  deleteUrl = 'http://localhost:8080/api/assets/delete-object'; // Endpoint para eliminar imágenes
  imageUrl: string | null = null; // URL de la imagen subida
  fileToUpload: File | null = null; // Archivo seleccionado
  errorMessage: string | null = null; // Manejo de errores
  loading: boolean = false; // Estado de carga

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0] || null;
  }

  uploadFile(): void {
    if (!this.fileToUpload) {
      this.errorMessage = 'Por favor selecciona un archivo para subir.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fileToUpload);

    this.loading = true;
    this.http.post<{ key: string; url: string }>(this.uploadUrl, formData).subscribe({
      next: (response) => {
        this.imageUrl = response.url;
        this.errorMessage = null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al subir la imagen:', err);
        this.errorMessage = 'Error al subir la imagen. Intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  deleteFile(): void {
    if (!this.imageUrl) {
      this.errorMessage = 'No hay ninguna imagen cargada para eliminar.';
      return;
    }

    const key = this.imageUrl.split('/').pop(); // Extraer la clave del path

    if (key) {
      this.http.delete(`${this.deleteUrl}?key=${key}`).subscribe({
        next: () => {
          this.imageUrl = null;
          this.errorMessage = null;
        },
        error: (err) => {
          console.error('Error al eliminar la imagen:', err);
          this.errorMessage = 'Error al eliminar la imagen. Intenta de nuevo.';
        }
      });
    }
  }
}
