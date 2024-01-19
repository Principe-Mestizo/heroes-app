import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  subMenuVisible = false;
  sidebarOpen = true; 

  subMenuUser = false;
  toggleSubMenu() {
    this.subMenuVisible = !this.subMenuVisible;
  }

  toogleMenuUser(){
    this.subMenuUser = !this.subMenuUser;
  }

}
