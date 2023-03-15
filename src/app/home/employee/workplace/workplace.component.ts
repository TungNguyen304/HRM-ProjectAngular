import { Component } from '@angular/core';
import { PositionService } from 'src/app/core/services/api/position.service';

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

  handleShowOverlayCreateWorkplace() {
    this.displayCreate = !this.displayCreate;
  }

  handleShowOverlayMember(position:string) {
    this.positionTemp = position;
    this.displayMember = !this.displayMember;
  }

  ngOnInit(): void {
    this.positionService.getPosition().subscribe((data:any) => {
      this.positionList = data;
    })
  }
}
