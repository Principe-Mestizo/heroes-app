import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroService } from '../../services/hereo.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  
  public searchInput= new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor( private heroesService: HeroService )
 {}

  searchHero() {
    
    const value: string = this.searchInput.value || ''
    this.heroesService.getSuggesions( value )
      .subscribe( heroes => {
        this.heroes = heroes     
      })  
  }

  onSelectHero(hero: Hero): void {
    
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }


}