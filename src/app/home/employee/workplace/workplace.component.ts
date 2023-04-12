import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PositionService } from 'src/app/core/services/http/position.service';
import { IPosition } from 'src/app/shared/interfaces';
import { IPropsMember } from '../components/member-table/member-table.component';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { toast } from 'src/app/shared/toastMessage';

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
export class WorkplaceComponent implements OnInit {
  public positionList: IPosition[];
  constructor(
    private positionService: PositionService,
    private toastService:ToastService
  ) {}
  @ViewChild('paginator') paginator: ElementRef;
  public displayCreate: boolean = false;
  public displayMember: boolean = false;
  public positionTemp: string;
  public limit: number = 5;
  public total: number;
  public pageCurrent: number = 1;
  public loadDisplay: boolean = false;
  public infoUpdate: any;
  public typeAction: 'Add' | 'Update';
  public props: IPropsMember;
  public searchInput: FormControl = new FormControl('');

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
      this.toastService.toastSuccess(toast.workplaceSuccess.summary, (toast.workplaceSuccess.detail as Function)(this.typeAction));
      this.handleGetPosition();
    } else {
      this.toastService.toastError(toast.workplaceFail.summary, (toast.workplaceFail.detail as Function)(this.typeAction));
    }
  }

  onPageChange(event: any): void {
    if (this.pageCurrent !== event.page + 1) {
      this.loadDisplay = true;
      this.pageCurrent = event.page + 1;
      this.positionService.getPosition(
        event.page + 1,
        this.limit,
        this.searchInput.value
      );
    }
  }

  handleShowOverlayUpdate(position: IPosition): void {
    this.typeAction = 'Update';
    this.displayCreate = true;
    this.infoUpdate = position;
  }

  handleGetPosition(): void {
    this.loadDisplay = true;
    this.positionService
      .getPosition(1, this.limit, this.searchInput.value)
      .subscribe((data: any) => {
        this.total = data.response.total;
        this.positionList = data.response.data;
        this.loadDisplay = false;
      });
  }

  ngOnInit(): void {
    this.handleGetPosition();
    this.searchInput.valueChanges.subscribe(() => {
      this.loadDisplay = true;
      this.positionService.getPosition(1, this.limit, this.searchInput.value);
    });
  }
}
