import { Component, Input, OnInit } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { PositionService } from 'src/app/core/services/http/position.service';
import { UnitService } from 'src/app/core/services/http/unit.service';

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
export class MemberTableComponent implements OnInit {
  constructor(
    private unitService: UnitService,
    private positionService: PositionService
  ) {}
  public limit: number = 5;
  public total: number = 0;
  public page: number = 1;
  public loadDisplay: boolean = false;
  public memberList: any[];
  @Input() props: IPropsMember;
  onPageChange(event: any) {
    this.unitService.getMemberByUnitId(
      this.props.id,
      event.page + 1,
      this.limit
    );
  }

  ngOnInit() {
    this.handleGetMember(1);
  }

  handleGetObservableByType(page: number): Observable<Object> {
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
    console.log(this.loadDisplay);

    this.handleGetObservableByType(page)
      .pipe
      // finalize(() => {
      //
      // })
      ()
      .subscribe(
        (data: any) => {
          if (data.statusCode === 200) {
            this.memberList = data.response.data;
            this.total = data.response.total;
            console.log(data);
            this.loadDisplay = false;
          }
        },
        () => {
          this.loadDisplay = false;
          console.log(this.loadDisplay);
        }
      );
  }
}
