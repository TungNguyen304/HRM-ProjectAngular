import { Component } from '@angular/core';
import { handleFormatDataUnit } from 'src/app/core/services/helper/unit.service';
import { UnitService } from 'src/app/core/services/http/unit.service';
import { IUnit, IUnitList } from 'src/app/shared/interfaces';
import { IPropsMember } from '../components/member-table/member-table.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-work-unit',
  templateUrl: './work-unit.component.html',
  styleUrls: ['./work-unit.component.scss'],
})
export class WorkUnitComponent {
  public props: IPropsMember;
  public unitTemp: string;
  public display: boolean = false;
  public loadDisplay: boolean = false;
  public units: IUnitList[] = [];
  constructor(private unitService: UnitService) {}

  ngOnInit() {
    this.loadDisplay = true;
    this.unitService
      .getUnit()
      .pipe(
        finalize(() => {
          this.loadDisplay = false;
        })
      )
      .subscribe((data: any) => {
        if (data.response.statusCode === 200) {
          this.units = handleFormatDataUnit(data.response.data);
        }
      });
  }

  handleShowMember(unitCode: string, unitName: string) {
    console.log(unitCode, unitName);
    this.props = {
      type: 'unit',
      id: unitCode,
    };
    this.unitTemp = unitName;
    this.display = !this.display;
  }
}
