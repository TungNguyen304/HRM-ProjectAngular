import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [PageNotFoundComponent, HeaderComponent, SideBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    InputSwitchModule,
    FormsModule,
    TranslateModule
  ],
  exports: [PageNotFoundComponent, SideBarComponent, HeaderComponent]
})
export class SharedModule { }
