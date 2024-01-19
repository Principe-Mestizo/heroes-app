import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-card-heroe',
  templateUrl: './card-heroe.component.html',
  styleUrls: ['./card-heroe.component.css']
})
export class CardHeroeComponent implements OnInit {
  @Input()
  public hero!: Hero;

  ngOnInit(): void {
      if (!this.hero ) {
        throw Error('Hero property doenst')
      }
  }
}
