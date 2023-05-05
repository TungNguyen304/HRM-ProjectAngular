import { Component, OnInit } from '@angular/core';
import { handleFormatDataUnit } from 'src/app/core/services/helper/unit.service';
import { UnitService } from 'src/app/core/services/http/unit.service';
import { IUnitList } from 'src/app/shared/interfaces';
import { IPropsMember } from '../components/member-table/member-table.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-work-unit',
  templateUrl: './work-unit.component.html',
  styleUrls: ['./work-unit.component.scss'],
  styles: [
    `
      :host ::ng-deep .priority-2,
      :host ::ng-deep .priority-3,
      :host ::ng-deep .visibility-sm {
        display: none;
      }

      @media screen and (max-width: 39.938em) {
        :host ::ng-deep .visibility-sm {
          display: inline;
        }
      }

      @media screen and (min-width: 40em) {
        :host ::ng-deep .priority-2 {
          display: table-cell;
        }
      }

      @media screen and (min-width: 64em) {
        :host ::ng-deep .priority-3 {
          display: table-cell;
        }
      }
    `,
  ],
})
export class WorkUnitComponent implements OnInit {
  public props: IPropsMember;
  public unitTemp: string;
  public display: boolean = false;
  public loadDisplay: boolean = false;
  public units: IUnitList[] = [];
  public cols: any[];
  constructor(private unitService: UnitService) {}

  ngOnInit() {
    this.cols = [
      { field: 'firstname', header: 'First Name' },
      { field: 'lastname', header: 'Last Name' },
      { field: 'age', header: 'Age' },
    ];
    this.loadDisplay = true;
    this.unitService
      .getUnit()
      .pipe(
        finalize(() => {
          this.loadDisplay = false;
        })
      )
      .subscribe((data: any) => {
        if (data.statusCode === 200) {
          this.units = handleFormatDataUnit(data.response.data);
        }
      });
  }

  handleShowMember(unitCode: string, unitName: string) {
    this.props = {
      type: 'unit',
      id: unitCode,
    };
    this.unitTemp = unitName;
    this.display = !this.display;
  }
}
