import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  // TODO:  Swal por defecto estilos simples 
  // onDeleteHero(){
    //   if (!this.currentHero.id) throw Error('Hero id is required');
  
    //     Swal.fire({
    //       title: '¿Está seguro?',
    //       text: `Este proceso no es reversible, está a punto de eliminar a ${this.currentHero.superhero}`,
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       confirmButtonText: 'Eliminar'
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         this.heroService.deleteHeroById(this.currentHero.id)
    //           .subscribe(() => {
    //             this.router.navigate(['/heroes']);
    //             this.toastr.error('Heroe eliminado correctamente', 'Exito')
    //           });
    //       }
    //     });
  
    // }
  
}
