import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/heroes.interface';
import { enviroments } from 'src/environments/environmets';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private baseUrl: string = enviroments.baseUrl

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }


  getHeroById( id: string):Observable<Hero|undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError( error => of(undefined))
      )
  }

  getSuggesions( query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${ query }&_limit6`)
  }

  addHero( hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero)
  }

  updateHero( hero: Hero): Observable<Hero> {
    if (!hero.id) {
      throw Error('Erro id is requerid');
    }
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${hero.id}`, hero)
  }

  deleteHeroById( id: string): Observable<boolean> {
    
    return this.http.delete(`${ this.baseUrl }/heroes/${id}`)
      .pipe(
        map( rep => true),
        catchError( error => of(false))
      );
  }
}
