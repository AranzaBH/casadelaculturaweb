import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoTaller } from './TipoTaller';
import { Subject } from 'rxjs';
import { TipoTallerService } from './tipo-taller.service';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-tipo-taller',
  templateUrl: './tipo-taller.component.html',
  styleUrls:['./tipo-taller.component.css']
})

export class TipoTallerComponent implements OnInit {
  data: TipoTaller[] = [];
  selectedTaller: any;
  deleteDialog: boolean = false;
  tipoTallerSelect!: TipoTaller;
  params: any = { total: 0, max: 0, offset: 0, filtro: '' };
  tipoTallerDialog = false;
  private searchSubject: Subject<string> = new Subject<string>();
  debounceTime = 800;
  @ViewChild('tablaB') tablaB: any;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  constructor(private tipoTallerService: TipoTallerService) { }


  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(() => {
      this.obtenerTabla();
    })
    this.obtenerDatosTabla()

  }

  confirmDelete(tipoTaller: any) {
    this.selectedTaller = tipoTaller;
    this.deleteDialog = true;
  }

  onSearch() {
    this.searchSubject.next(this.params.filtro);
  }

  abrirForm() {
    this.tipoTallerSelect = new TipoTaller();
    this.tipoTallerDialog = true;
  }

  cerrarForm() {
    this.tipoTallerDialog = false;
    this.obtenerDatosTabla();
  }



  obtenerDatosTabla(): void {
    this.tipoTallerService.getAll(this.params).subscribe(
      (data: any) => {
        this.data = data.data;
        this.params.total = data.total;
      }
    )
  }

  obtenerTabla(): void {
    if (this.tablaB) {
      this.tablaB.first = 0;
      this.tablaB.rows = 10;
      this.tablaB.firstChange.emit(this.tablaB.first);
      this.mPaginacion(this.tablaB.createLazyLoadMetadata());

    }
  }

  mPaginacion(e: any): void {
    if (e.rows) {
      this.params.max = e.rows;
    }

    if (e.first) {
      this.params.offset = e.first;
    } else {
      this.params.offset = 0;
    }
    if (e.multiSortMeta) {
      this.params.sort = e.multiSortMeta;
    }
    this.obtenerDatosTabla();
  }

  editar(tipoTaller: TipoTaller): void {
    this.abrirForm();
    this.tipoTallerSelect = tipoTaller;
  }

  delete() {
    if (this.selectedTaller) {
      this.tipoTallerService.delete(this.selectedTaller.idTipoTaller).subscribe({
        next: (response) => {
          this.message = 'Taller eliminado exitosamente';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 1500);
          this.obtenerDatosTabla();
          this.deleteDialog = false;
        },
        error: (err) => {
          this.message =  'Hubo un problema al eliminar el taller.';
          this.messageType = 'error';
          this.deleteDialog = false;
        },
      });
    }
  }




}
