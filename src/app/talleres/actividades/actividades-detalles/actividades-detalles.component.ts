import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../../services/video.service';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { ActividadService } from '../../../services/actividad.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-actividades-detalles',
  templateUrl: './actividades-detalles.component.html',
  styleUrls: ['./actividades-detalles.component.css'],
})
export class ActividadesDetallesComponent implements OnInit, AfterViewInit, OnDestroy {
  actividad: any;
  video: any;
  cuestionario: any;
  reactivos: any[] = [];
  videoId: string = ''; // Almacenar solo el ID del video
  videoWidth: number | undefined;
  videoHeight: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private actividadService: ActividadService,
    private videoService: VideoService,
    private cuestionarioService: CuestionarioService,
    private _changeDetectorRef: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idActividad = this.route.snapshot.paramMap.get('id');  // Obtener el ID de la URL
    if (idActividad) {
      this.obtenerDetallesActividad(idActividad);
    }
  }

  ngAfterViewInit(): void {
    // Ajustar el tamaño del video después de que la vista se haya inicializado
    this.onResize();
    window.addEventListener('resize', this.onResize); // Escuchar el evento de redimensionamiento
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize); // Eliminar el listener al destruir el componente
  }

  obtenerDetallesActividad(idActividad: any): void {
    this.actividadService.obtenerActividadPorId(idActividad).subscribe((actividad) => {
      this.actividad = actividad;

      if (actividad.video) {
        this.obtenerVideo(actividad.video.idVideo);
      }

      if (actividad.cuestionario) {
        this.obtenerCuestionario(actividad.cuestionario.idCuestionario);
      }
    });
  }

  obtenerVideo(idVideo: number): void {
    this.videoService.obtenerVideoPorId(idVideo).subscribe((video) => {
      this.video = video;
      // Extraer el ID del video de la URL
      const url = video.urlVideo;
      this.videoId = this.extraerVideoId(url);
      console.log(this.videoId); // Verificar si se obtiene correctamente el ID
    });
  }

  obtenerCuestionario(idCuestionario: number): void {
    this.cuestionarioService.obtenerCuestionarioPorId(idCuestionario).subscribe((cuestionario) => {
      this.cuestionario = cuestionario;

      this.cuestionarioService.obtenerReactivosPorCuestionario(idCuestionario).subscribe((reactivos) => {
        this.reactivos = reactivos;
      });
    });
  }

  // Función para extraer el ID del video desde la URL de YouTube
  extraerVideoId(url: string): string {
    const regex = /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+.*)/;
    const match = url.match(regex);
    return match ? match[1] : ''; // Devuelve el ID del video y los parámetros restantes
  }

  // Función para ajustar el tamaño del video
  onResize = (): void => {
    const container = document.getElementById('youtube-player-container');
    if (container) {
      this.videoWidth = container.clientWidth;
      this.videoHeight = this.videoWidth * 0.5625; // Mantener la relación 16:9
      this._changeDetectorRef.detectChanges(); // Forzar la detección de cambios
    }
  };
}
