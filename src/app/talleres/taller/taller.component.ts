import { Component, OnInit } from '@angular/core';
import { TipoTallerService } from './../../services/tipo-taller.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import Swal from 'sweetalert2';
import { TallerService } from './../../services/taller.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css']
})
export class TallerComponent implements OnInit {

  tiposTaller: any = null;  // Arreglo para almacenar los tipos de talleres obtenidos de la API
  selectedTipoTallerId: number | null = null;  // Esta propiedad almacenará el tipo de taller seleccionado
  formGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private tipoTallerService: TipoTallerService,
    private snackBar: MatSnackBar,
    private tallerService: TallerService,
  ) {}

  ngOnInit(): void {
    // Al iniciar el componente, obtener los tipos de talleres desde la API
    this.obtenerTiposTalleres();
    this.formGroup = this.fb.group({
      tituloTaller: ['', Validators.required],
      descripcion: [''],
      tipoTaller: [null, Validators.required], // Para el tipo de taller
      clave: ['', Validators.required],
      fechaInico: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      estaActivo: [false],
      imagenPath: [''],
    });
  }

  obtenerTiposTalleres(): void {
    this.tipoTallerService.obtenerTipoTalleres().subscribe(
      (data) => {
        console.log('Datos de tipo de taller recibidos:', data);  // Verifica en la consola
        this.tiposTaller = data;  // Asignamos los datos obtenidos al arreglo 'tiposTaller'
      },
      (error) => {
        console.error('Error al obtener los tipos de taller', error);
      }
    );
  }
  

  onTipoTallerSeleccionado(): void {
    console.log('Tipo de Taller seleccionado:', this.selectedTipoTallerId);
  }

  agregarTaller(): void {
    if (this.formGroup.invalid) {
      Swal.fire('Error', 'Por favor completa los campos obligatorios.', 'error');
      return;
    }

    const newTaller = this.formGroup.value;
    newTaller.tipoTaller = { idTipoTaller: newTaller.tipoTaller }; // Ajustar la estructura para el backend

    this.tallerService.crearTaller(newTaller).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Taller creado correctamente.', 'success');
        this.formGroup.reset(); // Limpiar el formulario después de guardar
      },
      (error) => {
        Swal.fire('Error', 'Hubo un problema al crear el taller.', 'error');
      }
    );
  }
  }
