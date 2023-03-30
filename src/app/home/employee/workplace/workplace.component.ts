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
  public limit = 10;
  constructor(private positionService: PositionService) {}
  public displayCreate:boolean = false;
  public displayMember:boolean = false;
  public positionTemp:string;
  

  handleShowOverlayCreateWorkplace() {
    this.displayCreate = !this.displayCreate;
  }

  handleShowOverlayMember(position:string) {
    this.positionTemp = position;
    this.displayMember = !this.displayMember;
  }

  onPageChange1(event:any) {
    console.log(event);
  }

  ngOnInit(): void {
    this.positionService.getPosition(1, this.limit).subscribe((data:any) => {
      console.log(data.response.data);
      this.positionList = data;
    })
  }
}
