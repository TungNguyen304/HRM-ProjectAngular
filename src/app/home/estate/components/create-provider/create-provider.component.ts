import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluateService } from 'src/app/core/services/http/evaluate.service';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss'],
})
export class CreateProviderComponent {
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public evaluateList:any;
  public providerForm:FormGroup;
  constructor(private location: Location, private evaluateService:EvaluateService, private fb:FormBuilder) {}

  handleBack(): void {
    this.location.back();
  }

  onSubmit():void {
    
  }

  ngOnInit() {
    this.evaluateService.getEvaluate().subscribe((data) => {
      this.evaluateList = data
    })

    this.providerForm = this.fb.group({
      name: ['', [Validators.required]],
      item: ['', [Validators.required]],
      address: ['',],
      contact: ['', [Validators.required]],
      priority: ['',],
      note: [''],
      conclude: ['']
    })
  }
}
