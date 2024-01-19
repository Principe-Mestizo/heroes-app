import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroService } from '../../services/hereo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, pipe, switchMap,  } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup(
    {
      id: new FormControl<string>('',),
      superhero: new FormControl<string>('', { nonNullable: true }),
      publisher: new FormControl<Publisher>(Publisher.DCComics),
      alter_ego: new FormControl(),
      first_appearance: new FormControl(),
      characters: new FormControl(),
      alt_img: new FormControl()
    }
  )
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marlel - Comics' }
  ]

  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    // private confirmDialog: ConfirmDialogComponent, 

  ) { }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero

    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroService.getHeroById(id)),
      ).subscribe( hero => {
        if (!hero) {
          return this.router.navigateByUrl('/');
        }

        this.heroForm.reset( hero );
        return;
      })

  }


  onSubmit(): void {

    if (this.heroForm.invalid) {
      return;
    }

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero)
        .subscribe(hero => {
          // TODO: mostrar mensaje
          this.toastr.info('Hero actualizado correctamente', 'Éxito');
        })

      return;
    }

    this.heroService.addHero(this.currentHero)
      .subscribe(hero => {
        // TODO: Mostrar mensaje y navegar al heroes/list/ heroe.id
        this.router.navigate(['/heroes/list', hero.id])
        this.toastr.success('Hero guardado correctamente', 'Éxito');
      })

  }


  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');
  
    Swal.fire({
      title: '¿Está seguro?',
      text: `Este proceso no es reversible, está a punto de eliminar a ${this.currentHero.superhero}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'bg-blue-500',
      cancelButtonColor: 'bg-red-500',
      confirmButtonText: 'Eliminar',
      customClass: {
        title: 'text-lg font-bold text-gray-800',
        cancelButton: 'bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-500',
        confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-500'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroService.deleteHeroById(this.currentHero.id)
          .subscribe(() => {
            this.router.navigate(['/heroes']);
            this.toastr.error('Heroe eliminado correctamente', 'Exito')
          });
      }
    });
  }
  
}
