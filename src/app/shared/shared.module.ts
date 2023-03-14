import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PageNotFoundComponent, HeaderComponent, SideBarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PageNotFoundComponent, SideBarComponent, HeaderComponent]
})
export class SharedModule { }
