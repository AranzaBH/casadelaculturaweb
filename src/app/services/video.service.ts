import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Video {
  idVideo?: number;
  titulo: string;
  urlVideo: string;
}

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private readonly apiUrl = 'http://localhost:8080/api/video'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  obtenerTodosLosVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }

  obtenerVideoPorId(idVideo: number): Observable<Video> {
    return this.http.get<Video>(`${this.apiUrl}/${idVideo}`);
  }

  crearVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(this.apiUrl, video);
  }

  actualizarVideo(idVideo: number, video: Video): Observable<Video> {
    return this.http.put<Video>(`${this.apiUrl}/${idVideo}`, video);
  }

  eliminarVideo(idVideo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idVideo}`);
  }
}
