import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { emojiValidator } from 'src/app/core/services/helper/validator.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
  providers: [MessageService]
})
export class CreateEmployeeComponent {
  public assetList = [];
  
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private commonService: CommonService,
    private messageService: MessageService
  ) {}
  public employeeForm: FormGroup;

  handleBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.commonService.markAsDirty(this.employeeForm);
  }

  showAlert(noti: any): void {
    this.messageService.add({
      severity: noti.severity,
      summary: noti.summary,
      detail: noti.detail,
    });
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      basicInfo: this.fb.group({
        code: [
          '',
          [Validators.required, Validators.maxLength(50), emojiValidator],
        ],
        name: [
          '',
          [Validators.required, Validators.maxLength(255), emojiValidator],
        ],
        sex: ['', [Validators.required]],
        birthDay: ['', [Validators.required]],
        currentResidence: ['', [Validators.maxLength(255), emojiValidator]],
        address: ['', [Validators.maxLength(255), emojiValidator]],
        joinDate: [''],
        hireDate: '',
        avt: [''],
      }),
      contactInfo: this.fb.group({
        email: [
          '',
          [Validators.required, Validators.maxLength(50), emojiValidator],
        ],
        phone: ['', [Validators.required, Validators.maxLength(11)]],
        skypeId: [
          '',
          [Validators.required, Validators.maxLength(255), emojiValidator],
        ],
      }),
      workingProcess: this.fb.group({
        unit: [''],
        position: [''],
        workingTime: [''],
        workingForm: [''],
      }),
      otherInfo: this.fb.group({
        description: ['', [Validators.maxLength(500)]],
        unit: ['', Validators.required],
        position: ['', Validators.required],
        cv: [''],
        status: ['', [Validators.required]],
      }),
    });
  }
}
