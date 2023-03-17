import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { EvaluateService } from 'src/app/core/services/api/evaluate.service';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss'],
})
export class CreateProviderComponent {
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public evaluateList:any;
  constructor(private location: Location, private evaluateService:EvaluateService) {}

  handleBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.evaluateService.getEvaluate().subscribe((data) => {
      this.evaluateList = data
      console.log(data);
      
    })
  }
}
