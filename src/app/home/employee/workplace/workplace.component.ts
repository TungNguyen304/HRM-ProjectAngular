import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PositionService } from 'src/app/core/services/http/position.service';
import { IPosition } from 'src/app/shared/interfaces';
import { IPropsMember } from '../components/member-table/member-table.component';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { Observable, finalize, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { ExportFileService } from 'src/app/core/services/helper/export-file.service';
import { ToastMsgService } from 'src/app/core/services/state/toastMsg.service';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/core/services/helper/page.service';
import { DestroyDirective } from 'src/app/shared/directives/destroy.directive';

export interface IPositionForm {
  name: string;
  code: string;
  unit: string;
  type: string;
}

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.scss'],
})
export class WorkplaceComponent extends DestroyDirective implements OnInit {
  public positionList: IPosition[];
  constructor(
    private positionService: PositionService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private exportFileService: ExportFileService,
    private toasMsgService: ToastMsgService,
    private activatedRoute: ActivatedRoute,
    private pageService: PageService
  ) {
    super();
  }
  @ViewChild('paginator') paginator: ElementRef;
  public displayCreate: boolean = false;
  public displayMember: boolean = false;
  public toast: any;
  public positionTemp: string;
  public limit: number = 5;
  public total: number = 0;
  public page: number = 1;
  public loadDisplay: boolean = false;
  public infoUpdate: IPosition;
  public typeAction: 'Add' | 'Update';
  public props: IPropsMember;
  public searchInput: FormControl = new FormControl('');

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.page) {
        this.page = params.page;
      }
      if (params.search) {
        this.searchInput.setValue(params.search);
      }
    });

    this.toasMsgService.toast$.subscribe((toast) => {
      this.toast = toast;
    });

    this.handleGetPosition()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          if (data.statusCode === 200) {
            this.total = data.response.total;
            this.positionList = data.response.data;
            this.loadDisplay = false;
            this.page = this.pageService.setPageThenSearchOrPaginatorChange(
              this.page,
              this.limit,
              this.total,
              this.searchInput.value,
              'employee/workplace'
            );
          }
        },
        () => {
          this.loadDisplay = false;
        }
      );

    this.searchInput.valueChanges.subscribe(() => {
      this.loadDisplay = true;
      this.saveUrl();
      this.handleGetPosition();
    });
  }

  saveUrl() {
    this.pageService.saveUrl(
      'employee/workplace',
      this.page,
      this.searchInput.value
    );
  }

  handleShowOverlayCreateWorkplace() {
    this.typeAction = 'Add';
    this.displayCreate = !this.displayCreate;
  }

  handleShowOverlayMember(id: string, name: string): void {
    this.props = {
      type: 'position',
      id: id,
    };
    this.displayMember = !this.displayMember;
    this.positionTemp = name;
  }

  setLoadingDisplay(type: boolean): void {
    this.loadDisplay = type;
  }

  showMessage(type: boolean): void {
    if (type === true) {
      this.displayCreate = false;
      this.toastService.toastSuccess(
        this.toast.workplaceSuccess,
        this.typeAction
      );
      this.handleGetPosition();
    } else {
      this.toastService.toastError(this.toast.workplaceFail, this.typeAction);
    }
  }

  exportFile() {
    this.loadingService.setloading(true);
    this.positionService
      .getAllPosition()
      .pipe(
        finalize(() => {
          this.loadingService.setloading(false);
        })
      )
      .subscribe((data: any) => {
        if (data.statusCode === 200) {
          this.exportFileService.exportAsExcelFile(
            data.response.data,
            'Position List'
          );
        }
      });
  }

  onPageChange(event: any): void {
    if (this.page !== event.page + 1) {
      this.loadDisplay = true;
      this.page = event.page + 1;
      this.saveUrl();
      this.handleGetPosition();
    }
  }

  handleShowOverlayUpdate(position: IPosition): void {
    this.typeAction = 'Update';
    this.displayCreate = true;
    this.infoUpdate = position;
  }

  handleGetPosition(): Observable<object> {
    this.loadDisplay = true;
    return this.positionService.getPosition(
      this.page,
      this.limit,
      this.searchInput.value
    );
  }
}
