import { Component } from '@angular/core';
import { MemberService } from 'src/app/core/services/api/member.service';
import { UnitService } from 'src/app/core/services/api/unit.service';

@Component({
  selector: 'app-work-unit',
  templateUrl: './work-unit.component.html',
  styleUrls: ['./work-unit.component.scss'],
})
export class WorkUnitComponent {
  products: any;

  constructor(private unitService: UnitService) {}

  
  ngOnInit() {
    this.unitService
      .getUnit()
      .subscribe((data) => (this.products = data));
  }
}
