import { Component, OnInit } from '@angular/core';
import { TallerService } from 'src/app/services/taller.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  talleres: any[] = []; // Lista de talleres

  constructor(private tallerService: TallerService) {}

  ngOnInit(): void {
    this.cargarTalleres();
  }

  // Cargar todos los talleres
  cargarTalleres(): void {
    this.tallerService.obtenerTalleres().subscribe(
      (data: any) => {
        this.talleres = data;
      },
      (error) => {
        console.error('Error al cargar talleres:', error);
      }
    );
  }
  
}
