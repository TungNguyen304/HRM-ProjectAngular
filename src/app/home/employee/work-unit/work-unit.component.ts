import { Component } from '@angular/core';
import { handleFormatDataUnit } from 'src/app/core/services/helper/unit.service';
import { UnitService } from 'src/app/core/services/http/unit.service';
import { IUnit, IUnitList } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-work-unit',
  templateUrl: './work-unit.component.html',
  styleUrls: ['./work-unit.component.scss'],
})
export class WorkUnitComponent {
  public memberList = [];
  public unitTemp: string;
  public display: boolean = false;
  public units:IUnitList[] = [
  ];
  constructor(private unitService: UnitService) {}

  ngOnInit() {
    this.unitService.getUnit().subscribe((data: any) => {
      this.units = handleFormatDataUnit(data.response.data);
    });
  }

  

  handleShowMember(unitCode: string) {
    this.unitService.getMemberByUnitId(unitCode).subscribe((data:any) => {
      this.memberList = data.response.users;
    });
    this.unitTemp = unitCode;
    this.display = !this.display;
  }
}
