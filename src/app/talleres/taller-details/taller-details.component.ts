import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TallerService } from '../../services/taller.service';
import { InscripcionService } from '../../services/inscripcion.service'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-taller-details',
  templateUrl: './taller-details.component.html',
  styleUrls: ['./taller-details.component.css']
})
export class TallerDetailsComponent implements OnInit {
  taller: any; // Detalles del taller
  idTaller: number | undefined;
  usuario: any = null;

  constructor(
    private route: ActivatedRoute,
    private tallerService: TallerService,
    private inscripcionService: InscripcionService, 
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Obtener ID del taller desde la ruta
    this.idTaller = +this.route.snapshot.paramMap.get('id')!;
    this.usuario = this.loginService.getUser();

    if (isNaN(this.idTaller)) {
      console.error('ID de taller inválido');
      return;
    }

    // Obtener detalles del taller
    this.tallerService.obtenerTallerPorId(this.idTaller).subscribe(
      (data: any) => {
        this.taller = data;
      },
      (error) => {
        console.error('Error al obtener los detalles del taller', error);
      }
    );
  }

  inscribirse(): void {
    // Verificar si el usuario está autenticado
    if (!this.usuario) {
      alert('Debes iniciar sesión para inscribirte en un taller.');
      this.router.navigate(['/login']); // Redirigir a la página de login si no está autenticado
      return;
    }

    // Verificar si el usuario tiene un ID
    if (!this.usuario.id) {
      alert('Error: No se pudo encontrar el ID del usuario.');
      return;
    }
    const fechaInscripcion = new Date().toISOString()
    // Crear el objeto de inscripción con los datos necesarios
    const inscripcion = {
      usuario: { id: this.usuario.id }, // Obtener ID del usuario autenticado
      fechaInscripcion: fechaInscripcion, // Fecha de inscripción (con paréntesis)
      taller: { idTaller: this.taller.idTaller }, // ID del taller
      avanceGeneral: 0, // Valor inicial del avance
    };

    // Llamar al servicio para crear la inscripción
    this.inscripcionService.crearInscripcion(inscripcion).subscribe(
      (response) => {
        console.log('Inscripción exitosa', response);
        alert('Te has inscrito al taller exitosamente');
        this.router.navigate(['/talleres']); // Redirigir a la lista de talleres
      },
      (error) => {
        console.log('Datos de inscripción:', inscripcion);
        console.error('Error al inscribirse al taller', error);
        alert('Ocurrió un error al inscribirte al taller.');
        
      }
    );
  }

  regresar(): void {
    this.router.navigate(['/Inicio']); // Cambiar la ruta según tu aplicación
  }
}
