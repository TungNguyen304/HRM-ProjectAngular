import { Component } from '@angular/core';
import { MemberService } from 'src/app/core/services/api/member.service';
import { UnitService } from 'src/app/core/services/api/unit.service';

@Component({
  selector: 'app-work-unit',
  templateUrl: './work-unit.component.html',
  styleUrls: ['./work-unit.component.scss'],
})
export class WorkUnitComponent {
  public products: any;
  public unitTemp:string;
  public display:boolean = false;
  constructor(private unitService: UnitService) {}

  
  ngOnInit() {
    this.unitService
      .getUnit()
      .subscribe((data) => (this.products = data));
  }

  handleShowMember(unitCode:string) {
    this.unitTemp = unitCode;
    this.display = !this.display;
  }
}
