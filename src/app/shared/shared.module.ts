import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TypeErrorPipe } from './pipes/type-error.pipe';
import { DragDropAvtDirective } from './directives/drag-drop-avt.directive';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { LoadingComponent } from './layouts/loading/loading.component';
import { LoadSmallComponent } from './layouts/load-small/load-small.component';


@NgModule({
  declarations: [PageNotFoundComponent, HeaderComponent, SideBarComponent, TypeErrorPipe, DragDropAvtDirective, LoadingComponent, LoadSmallComponent],
  imports: [
    CommonModule,
    RouterModule,
    InputSwitchModule,
    FormsModule,
    TranslateModule,
    BreadcrumbModule
  ],
  exports: [PageNotFoundComponent, SideBarComponent, HeaderComponent, TypeErrorPipe, DragDropAvtDirective, LoadingComponent, LoadSmallComponent]
})
export class SharedModule { }
