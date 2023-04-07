import { Component, Input, OnInit } from '@angular/core';
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
  public memberList: any[];
  @Input() props: IPropsMember;
  onPageChange(event: any) {
    this.handleGetMember(event.page + 1);
  }

  ngOnInit() {
    this.handleGetMember(1);
  }

  handleGetMember(page: number) {
    switch (this.props.type) {
      case 'unit': {
        this.unitService
          .getMemberByUnitId(this.props.id, page, this.limit)
          .subscribe((data: any) => {
            this.memberList = data.response.data;
            this.total = data.response.total;
          });
        break;
      }
      case 'position': {
        this.positionService
          .getMemberByPositionId(this.props.id, page, this.limit)
          .subscribe((data: any) => {
            this.memberList = data.response.data;
            this.total = data.response.total;
          });
        break;
      }
      default:
        break;
    }
  }
}
