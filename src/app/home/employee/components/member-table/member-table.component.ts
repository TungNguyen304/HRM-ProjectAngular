import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PositionService } from 'src/app/core/services/http/position.service';
import { UnitService } from 'src/app/core/services/http/unit.service';
import { IEmployeeResponse } from 'src/app/shared/interfaces';

type TType = 'unit' | 'position';
export interface IPropsMember {
  type: TType;
  id: string;
}

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss'],
})
export class MemberTableComponent implements OnInit, OnDestroy {
  constructor(
    private unitService: UnitService,
    private positionService: PositionService,
    private router: Router
  ) {}
  public employeeActive: IEmployeeResponse;
  public limit: number = 5;
  public total: number = 0;
  public subscription: Subscription;
  public page: number = 1;
  public loadDisplay: boolean = false;
  public memberList: IEmployeeResponse[];
  @Input() props: IPropsMember;
  onPageChange(event: any) {
    if (event.page + 1 !== this.page) {
      this.page = event.page + 1;
      this.loadDisplay = true;
      this.handleGetObservableByType(this.page);
    }
  }

  ngOnInit() {
    this.handleGetMember(this.page);
  }

  handleNavigateUpdateEmployee(id: string) {
    this.router.navigate(['employee/management/update-employee', id]);
  }
  handleNavigateDetailEmployee(id: string): void {
    this.router.navigate(['employee/management/detail-employee', id]);
  }

  handleGetObservableByType(page: number): Observable<object> {
    switch (this.props.type) {
      case 'unit': {
        return this.unitService.getMemberByUnitId(
          this.props.id,
          page,
          this.limit
        );
      }
      case 'position': {
        return this.positionService.getMemberByPositionId(
          this.props.id,
          page,
          this.limit
        );
      }
    }
  }

  handleGetMember(page: number) {
    this.loadDisplay = true;
    this.subscription = this.handleGetObservableByType(page).subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          this.memberList = data.response.data;
          this.total = data.response.total;
          this.loadDisplay = false;
        }
      },
      () => {
        this.loadDisplay = false;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
