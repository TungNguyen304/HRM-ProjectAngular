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
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ForbiddenComponent } from './layouts/forbidden/forbidden.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [PageNotFoundComponent, HeaderComponent, SideBarComponent, TypeErrorPipe, DragDropAvtDirective, LoadingComponent, LoadSmallComponent, ForbiddenComponent],
  imports: [
    CommonModule,
    RouterModule,
    InputSwitchModule,
    FormsModule,
    TranslateModule,
    BreadcrumbModule,
    DropdownModule,
    ProgressSpinnerModule,
    ButtonModule
  ],
  exports: [PageNotFoundComponent, SideBarComponent, HeaderComponent, TypeErrorPipe, DragDropAvtDirective, LoadingComponent, LoadSmallComponent]
})
export class SharedModule { }
