import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hereo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit{
  
  public hero?:Hero;
  constructor( 
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  // TOOD: Aantes que exista nulo 

  ngOnInit(): void {
      this.activatedRoute.params
        .pipe(
          delay(1000),
          switchMap( ({id}) => this.heroService.getHeroById(id) ),
        ).subscribe(hero => {
          if (!hero) {
            return this.route.navigate(['/heroes/list'])
          }

          this.hero = hero;
          console.log(hero);
          
          return;
        })
  }


  public goBack():void {
    this.route.navigateByUrl('heroes/list')
  }
}
