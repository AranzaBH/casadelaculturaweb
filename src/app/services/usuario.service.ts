import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private http = inject(HttpClient)

    list(){
        return this.http.get('http://localhost:8080/api/usuario');
    }

    get(id: number){
        return this.http.get('http://localhost:8080/api/usuario/${idUsuario}');
    }

    create(usuario:any){
        return this.http.post('http://localhost:8080/api/usuario', usuario);
    }

    update(id: number, usuario:any){
        return this.http.put('http://localhost:8080/api/usuario/${idUsuario}', usuario);
    }

    delete(id: number){
        return this.http.delete('http://localhost:8080/api/usuario/${idUsuario}');
    }
}