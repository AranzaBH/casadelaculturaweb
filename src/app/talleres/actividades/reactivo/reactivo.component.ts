import { Component, OnInit } from '@angular/core';
import { Reactivo, ReactivoService } from 'src/app/services/reactivo.service';

@Component({
  selector: 'app-reactivo',
  templateUrl: './reactivo.component.html',
  styleUrls: ['./reactivo.component.css'],
})
export class ReactivoComponent implements OnInit {
  reactivos: Reactivo[] = []; // Reactivos existentes en la base de datos
  preactivos: Reactivo[] = []; // Reactivos temporales
  newReactivo: Reactivo = {
    pregunta: '',
    respuestaCorrecta: '',
    respuesta1: '',
    respuesta2: '',
    respuesta3: '',
    respuesta4: null,
    respuesta5: null,
    cuestionario: { idCuestionario: 0 },
  };

  constructor(private reactivoService: ReactivoService) {}

  ngOnInit(): void {
    this.getReactivos();
  }

  // Obtener los reactivos de la base de datos
  getReactivos(): void {
    this.reactivoService.getReactivos().subscribe((data) => {
      this.reactivos = data;
    });
  }

  // Añadir un reactivo a la lista temporal
  addPreReactivo(): void {
    if (this.newReactivo.cuestionario.idCuestionario > 0) {
      this.preactivos.push({ ...this.newReactivo }); // Agrega una copia del reactivo actual
      this.resetForm();
    } else {
      alert('Por favor, ingrese un ID de cuestionario válido.');
    }
  }

  // Enviar los preactivos a la base de datos
  savePreReactivos(): void {
    if (this.preactivos.length > 0) {
      this.preactivos.forEach((preactivo) => {
        this.reactivoService.createReactivo(preactivo).subscribe((data) => {
          this.reactivos.push(data); // Agrega el reactivo guardado a la lista de reactivos reales
        });
      });
      this.preactivos = []; // Limpia la lista de preactivos después de guardar
      alert('Todos los preactivos se han guardado en la base de datos.');
    } else {
      alert('No hay preactivos para guardar.');
    }
  }

  // Eliminar un reactivo temporal de la lista de preactivos
  deletePreReactivo(index: number): void {
    this.preactivos.splice(index, 1); // Elimina el preactivo por índice
  }

  // Limpiar el formulario
  resetForm(): void {
    this.newReactivo = {
      pregunta: '',
      respuestaCorrecta: '',
      respuesta1: '',
      respuesta2: '',
      respuesta3: '',
      respuesta4: null,
      respuesta5: null,
      cuestionario: { idCuestionario: 0 },
    };
  }
}
