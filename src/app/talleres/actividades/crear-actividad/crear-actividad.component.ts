import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActividadService } from '../../../services/actividad.service';
import { TallerService } from '../../../services/taller.service';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { VideoService } from '../../../services/video.service';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css'],
})
export class CrearActividadComponent implements OnInit {
  actividadForm: FormGroup;
  talleres: any[] = [];
  cuestionarios: any[] = [];
  videos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private actividadService: ActividadService,
    private tallerService: TallerService,
    private cuestionarioService: CuestionarioService,
    private videoService: VideoService
  ) {
    this.actividadForm = this.fb.group({
      nombreActividad: ['', [Validators.required, Validators.maxLength(200)]],
      idTaller: [null, Validators.required], // Ajuste para que sea obligatorio
      idCuestionario: [null], // Opcional según el modelo
      idVideo: [null, Validators.required], // Obligatorio según el modelo
      modulo: [null, Validators.required],
      avance: [0], // Valor inicial por defecto
      estatus: [false], // Valor inicial por defecto
    });
  }

  ngOnInit(): void {
    this.cargarTalleres();
    this.cargarCuestionarios();
    this.cargarVideos();
  }

  cargarTalleres(): void {
    this.tallerService.obtenerTalleres().subscribe((data) => {
      this.talleres = data;
    });
  }

  cargarCuestionarios(): void {
    this.cuestionarioService.obtenerTodosCuestionarios().subscribe((data) => {
      this.cuestionarios = data;
    });
  }

  cargarVideos(): void {
    this.videoService.obtenerTodosLosVideos().subscribe((data) => {
      this.videos = data;
    });
  }

  crearActividad(): void {
    if (this.actividadForm.valid) {
      // Ajustar los datos del formulario al formato esperado
      const actividad = {
        nombreActividad: this.actividadForm.value.nombreActividad,
        video: { idVideo: this.actividadForm.value.idVideo },
        cuestionario: this.actividadForm.value.idCuestionario
          ? { idCuestionario: this.actividadForm.value.idCuestionario }
          : null,
        taller: { idTaller: this.actividadForm.value.idTaller },
        modulo: this.actividadForm.value.modulo,
        avance: this.actividadForm.value.avance,
        estatus: this.actividadForm.value.estatus,
      };

      this.actividadService.crearActividad(actividad).subscribe({
        next: (response) => {
          console.log('Actividad creada con éxito:', response);
          this.actividadForm.reset();
        },
        error: (err) => console.error('Error al crear la actividad:', err),
      });
    }
  }
}
