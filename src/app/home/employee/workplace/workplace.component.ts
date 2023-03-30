import { Component } from '@angular/core';
import { PositionService } from 'src/app/core/services/http/position.service';

export interface IPosition {
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
export class WorkplaceComponent {
  public positionList: IPosition[];
  constructor(private positionService: PositionService) {}
  public displayCreate:boolean = false;
  public displayMember:boolean = false;
  public positionTemp:string;
  public limit:number = 2;
  public total:number;

  handleShowOverlayCreateWorkplace() {
    this.displayCreate = !this.displayCreate;
  }

  handleShowOverlayMember(position:string) {
    this.positionTemp = position;
    this.displayMember = !this.displayMember;
  }

  onPageChange1(event:any) {
    this.positionService.getPosition(event.page+1,this.limit).subscribe((data:any) => {
      this.total = data.response.total;
      this.positionList = data.response.data;
    })
  }

  ngOnInit(): void {
    this.positionService.getPosition(1,this.limit).subscribe((data:any) => {
      this.total = data.response.total;
      this.positionList = data.response.data;
    })
  }
}
