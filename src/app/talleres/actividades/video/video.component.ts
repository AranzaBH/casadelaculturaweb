import { Component, OnInit } from '@angular/core';
import { Video, VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  nuevoVideo: Video = { titulo: '', urlVideo: '' };
  videosGuardados: Video[] = [];
  mensaje: string | null = null;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.cargarVideosGuardados();
  }

  // Cargar la lista de videos existentes
  cargarVideosGuardados(): void {
    this.videoService.obtenerTodosLosVideos().subscribe({
      next: (data) => {
        this.videosGuardados = data;
      },
      error: (err) => console.error('Error al cargar los videos:', err),
    });
  }

  // Guardar un nuevo video
  guardarVideo(): void {
    if (this.nuevoVideo.titulo.trim() && this.nuevoVideo.urlVideo.trim()) {
      this.videoService.crearVideo(this.nuevoVideo).subscribe({
        next: (videoCreado) => {
          this.videosGuardados.push(videoCreado); // Agregar el nuevo video a la lista
          this.mensaje = `¡Video creado con éxito! ID: ${videoCreado.idVideo}`;
          this.nuevoVideo = { titulo: '', urlVideo: '' }; // Reinicia el formulario
        },
        error: (err) => {
          console.error('Error al guardar el video:', err);
          this.mensaje = 'Error al guardar el video. Por favor, inténtalo de nuevo.';
        },
      });
    } else {
      this.mensaje = 'Por favor, completa todos los campos.';
    }
  }
}
