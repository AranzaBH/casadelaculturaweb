import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { TipoTaller } from "./TipoTaller";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TipoTallerService{

  actualizaRegistros = new Subject<boolean>();
  registroEdita      = new Subject<TipoTaller>;
  raiz:string= environment.configuracion.url+'/api/tipotaller'

  constructor(private http: HttpClient) {

  }

  actualiza(recibe: boolean):void{
    this.actualizaRegistros.next(recibe);
  }

  edita(tipoTaller : TipoTaller): void{
    this.registroEdita.next(tipoTaller);
  }

  getAll(params?: any) {
    const body = params || {};
    return this.http.post(this.raiz+'/list',body);
  }

  get(id: number): Observable<TipoTaller> {
    return this.http.get<TipoTaller>(`${this.raiz}/${id}`);
  }

  save(obj: any) {
    return this.http.post(this.raiz, obj);
  }

  update(obj: any) {
    return this.http.put(this.raiz + '/' + obj.idTipoTaller, obj);
  }

  delete(idTipoTaller: number) {
    console.log("id que se envia",idTipoTaller)
    return this.http.delete(this.raiz + '/' + idTipoTaller);
  }









}
