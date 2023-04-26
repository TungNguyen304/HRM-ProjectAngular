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
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvtComponent } from './layouts/common/avt.component';
import { ButtonModule } from 'primeng/button';
import { ForbiddenComponent } from './layouts/forbidden/forbidden.component';

@NgModule({
  declarations: [PageNotFoundComponent, HeaderComponent, SideBarComponent, TypeErrorPipe, DragDropAvtDirective, LoadingComponent, LoadSmallComponent, AvtComponent, ForbiddenComponent],
  imports: [
    CommonModule,
    RouterModule,
    InputSwitchModule,
    FormsModule,
    TranslateModule,
    BreadcrumbModule,
    DropdownModule,
    ProgressSpinnerModule,
    ButtonModule,
    DialogModule
  ],
  exports: [PageNotFoundComponent, SideBarComponent, HeaderComponent, TypeErrorPipe, DragDropAvtDirective, LoadingComponent, LoadSmallComponent]
})
export class SharedModule { }
